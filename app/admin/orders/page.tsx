import { sampleOrders } from '@/lib/mock-data';
import OrderShipForm from '@/components/OrderShipForm';

export default function OrdersPage() {
  return (
    <>
      <h1>订单管理</h1>
      <p className="muted">管理 PayPal 订单、发货状态、确认收货、退款和佣金结算进度。</p>
      <div className="grid grid-4" style={{ marginBottom: 20 }}>
        <div className="card stat"><span className="muted">已付款未发货</span><strong>42</strong></div>
        <div className="card stat"><span className="muted">已发货</span><strong>96</strong></div>
        <div className="card stat"><span className="muted">售后期</span><strong>74</strong></div>
        <div className="card stat"><span className="muted">退款中</span><strong>5</strong></div>
      </div>
      <table className="table"><thead><tr><th>订单号</th><th>买家</th><th>金额</th><th>状态</th><th>佣金</th><th>发货操作</th></tr></thead><tbody>{sampleOrders.map(order => <tr key={order.id}><td>{order.id}</td><td>{order.buyer}</td><td>{order.amount}</td><td>{order.status}</td><td>{order.commission}</td><td><OrderShipForm orderId={order.id} /></td></tr>)}</tbody></table>
    </>
  );
}
