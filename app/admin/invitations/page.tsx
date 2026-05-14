export default function InvitationsPage() {
  return (
    <>
      <h1>邀请管理</h1>
      <p className="muted">用户端只显示直属邀请；后台可查看邀请状态、无效原因和风控记录。</p>
      <table className="table"><thead><tr><th>邀请人</th><th>被邀请人</th><th>购买10单</th><th>状态</th><th>原因</th></tr></thead><tbody><tr><td>U1002</td><td>U1098</td><td>是</td><td><span className="pill">有效</span></td><td>-</td></tr><tr><td>U1001</td><td>U1099</td><td>是</td><td><span className="pill warn">无效</span></td><td>同IP</td></tr></tbody></table>
    </>
  );
}
