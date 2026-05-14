export default function RefundsPage() {
  return (
    <>
      <h1>退款管理</h1>
      <p className="muted">任意激活订单退款会取消会员资格、推荐资格和相关佣金。正式会员退款进入冻结或人工审核。</p>
      <table className="table"><thead><tr><th>订单号</th><th>买家</th><th>退款金额</th><th>影响会员</th><th>影响佣金</th><th>状态</th></tr></thead><tbody><tr><td>O-1099</td><td>Jane Smith</td><td>$59</td><td>是</td><td>取消 $20</td><td><span className="pill warn">处理中</span></td></tr></tbody></table>
    </>
  );
}
