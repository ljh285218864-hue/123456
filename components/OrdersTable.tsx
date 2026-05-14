'use client';

import { useEffect, useState } from 'react';
import ConfirmReceiptButton from './ConfirmReceiptButton';

type Order = {
  id: string;
  total: string;
  status: string;
  createdAt: string;
  autoConfirmAt?: string | null;
  items: { id: string; productTitle: string; quantity: number; price: string }[];
};

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/api/account/orders').then(async response => {
      if (!response.ok) return;
      const data = await response.json();
      setOrders(data.orders || []);
    });
  }, []);

  if (!orders.length) return <p className="muted">No orders yet.</p>;

  return (
    <table className="table">
      <thead><tr><th>Order</th><th>Date</th><th>Total</th><th>Status</th><th>Items</th><th>Action</th></tr></thead>
      <tbody>{orders.map(order => <tr key={order.id}><td>{order.id}</td><td>{new Date(order.createdAt).toLocaleDateString()}</td><td>{order.total}</td><td>{order.status}</td><td>{order.items.map(item => item.productTitle).join(', ')}</td><td>{order.status === 'SHIPPED' ? <ConfirmReceiptButton orderId={order.id} /> : <span className="pill muted">No action</span>}</td></tr>)}</tbody>
    </table>
  );
}
