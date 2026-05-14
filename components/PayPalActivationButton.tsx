'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    paypal?: {
      Buttons: (options: Record<string, unknown>) => { render: (selector: HTMLElement) => void };
    };
  }
}

type Props = {
  userId: string;
  recommendationSetId: string;
  items: { storefrontId: string; productId: string }[];
  shipping: Record<string, string>;
  disabled?: boolean;
  onMessage?: (message: string) => void;
};

export default function PayPalActivationButton({ userId, recommendationSetId, items, shipping, disabled, onMessage }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    if (!clientId) {
      onMessage?.('PayPal client id is missing. Set NEXT_PUBLIC_PAYPAL_CLIENT_ID.');
      return;
    }
    if (window.paypal) {
      setScriptReady(true);
      return;
    }
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&intent=capture`;
    script.async = true;
    script.onload = () => setScriptReady(true);
    script.onerror = () => onMessage?.('Unable to load PayPal SDK.');
    document.body.appendChild(script);
  }, [onMessage]);

  useEffect(() => {
    if (!scriptReady || !window.paypal || !containerRef.current || disabled) return;
    containerRef.current.innerHTML = '';
    window.paypal.Buttons({
      createOrder: async () => {
        if (items.length !== 10) throw new Error('Please choose one product from each recommended store.');
        const response = await fetch('/api/checkout/activation/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, recommendationSetId, items, shipping })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Unable to create order.');
        sessionStorage.setItem('activationOrderId', data.orderId);
        return data.paypalOrder.id;
      },
      onApprove: async () => {
        const orderId = sessionStorage.getItem('activationOrderId');
        if (!orderId) throw new Error('Local activation order id missing.');
        const response = await fetch('/api/checkout/activation/capture', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Unable to capture order.');
        onMessage?.('Payment completed. Bronze trial activated.');
        window.location.href = '/account';
      },
      onError: (error: unknown) => {
        console.error(error);
        onMessage?.('PayPal payment failed or was cancelled.');
      }
    }).render(containerRef.current);
  }, [scriptReady, userId, recommendationSetId, items, shipping, disabled, onMessage]);

  return <div ref={containerRef}>{disabled ? <button className="btn" disabled>Select all 10 stores first</button> : null}</div>;
}
