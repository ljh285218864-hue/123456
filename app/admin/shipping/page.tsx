export default function ShippingPage() {
  return (
    <>
      <h1>发货导出</h1>
      <p className="muted">支持按状态、商品、日期、用户导出收货地址，并支持批量回填物流单号。</p>
      <div className="grid grid-3" style={{ marginBottom: 20 }}>
        <button className="btn">导出今日未发货订单</button>
        <button className="btn secondary">按商品导出</button>
        <button className="btn ghost">批量回填物流单号</button>
      </div>
      <table className="table"><thead><tr><th>订单号</th><th>商品</th><th>收货人</th><th>地址</th><th>状态</th></tr></thead><tbody><tr><td>O-1001</td><td>Home Organizer</td><td>Jane Smith</td><td>CA, United States</td><td>已付款未发货</td></tr></tbody></table>
    </>
  );
}
