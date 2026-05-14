'use client';

import { useEffect, useState } from 'react';
import OrderShipForm from './OrderShipForm';

type OrderRow = {
  id: string;
  buyer: { email: string; nickname: string };
  status: string;
  total: string;
  shippingName: string;
  shippingCity: string;
  shippingState?: string;
  shippingCountry: string;
  commissionTotal: string;
};

export default function AdminOrdersTable() {
  const [orders, setOrders] = useState<OrderRow[]>([]);

  useEffect(() => {
    fetch('/api/admin/orders').then(async response => {
      if (!response.ok) return;
      const data = await response.json();
      setOrders(data.orders || []);
    });
  }, []);

  if (!orders.length) return <p className="muted">暂无订单数据。</p>;

  return (
    <table className="table">
      <thead><tr><th>订单号</th><th>买家</th><th>金额</th><th>状态</th><th>收货人</th><th>地区</th><th>佣金</th><th>发货操作</th></tr></thead>
      <tbody>{orders.map(order => <tr key={order.id}><td>{order.id}</td><td>{order.buyer.nickname}<br /><span className="muted">{order.buyer.email}</span></td><td>{order.total}</td><td>{order.status}</td><td>{order.shippingName}</td><td>{order.shippingCity}, {order.shippingState} {order.shippingCountry}</td><td>{order.commissionTotal}</td><td><OrderShipForm orderId={order.id} /></td></tr>)}</tbody>
    </table>
  );
}
