import AdminOrdersTable from '@/components/AdminOrdersTable';

export default function OrdersPage() {
  return (
    <>
      <h1>订单管理</h1>
      <p className="muted">管理 PayPal 订单、发货状态、确认收货、退款和佣金结算进度。</p>
      <div className="grid grid-4" style={{ marginBottom: 20 }}>
        <div className="card stat"><span className="muted">已付款未发货</span><strong>实时</strong></div>
        <div className="card stat"><span className="muted">已发货</span><strong>实时</strong></div>
        <div className="card stat"><span className="muted">售后期</span><strong>实时</strong></div>
        <div className="card stat"><span className="muted">退款中</span><strong>实时</strong></div>
      </div>
      <AdminOrdersTable />
    </>
  );
}
