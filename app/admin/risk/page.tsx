export default function RiskPage() {
  return (
    <>
      <h1>风控中心</h1>
      <p className="muted">记录注册、邀请、地址、支付、提现等风险信号。后台显示具体原因，管理员可审核处理。</p>
      <div className="grid grid-3" style={{ marginBottom: 20 }}>
        <div className="card stat"><span className="muted">直接无效</span><strong>12</strong></div>
        <div className="card stat"><span className="muted">人工审核</span><strong>7</strong></div>
        <div className="card stat"><span className="muted">已通过</span><strong>98</strong></div>
      </div>
      <table className="table"><thead><tr><th>用户</th><th>风险类型</th><th>处理</th><th>原因</th><th>时间</th></tr></thead><tbody><tr><td>U1099</td><td>重复网络环境</td><td>直接无效</td><td>邀请关系存在重复注册风险</td><td>今日</td></tr><tr><td>U1102</td><td>设备风险</td><td>人工审核</td><td>系统检测到设备信息相似</td><td>今日</td></tr></tbody></table>
    </>
  );
}
