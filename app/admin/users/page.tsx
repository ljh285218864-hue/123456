import { sampleUsers } from '@/lib/mock-data';

export default function UsersPage() {
  return (
    <>
      <h1>用户管理</h1>
      <p className="muted">查看用户、邀请人、会员等级、试用状态、风控状态和钱包余额。</p>
      <div className="grid grid-3" style={{ marginBottom: 20 }}>
        <div className="card stat"><span className="muted">用户总数</span><strong>1,280</strong></div>
        <div className="card stat"><span className="muted">试用会员</span><strong>236</strong></div>
        <div className="card stat"><span className="muted">正式会员</span><strong>418</strong></div>
      </div>
      <table className="table">
        <thead><tr><th>用户ID</th><th>邮箱</th><th>昵称</th><th>等级</th><th>状态</th><th>有效邀请</th><th>操作</th></tr></thead>
        <tbody>{sampleUsers.map(user => <tr key={user.id}><td>{user.id}</td><td>{user.email}</td><td>{user.nickname}</td><td>{user.level}</td><td><span className="pill">{user.status}</span></td><td>{user.invites}</td><td><button className="btn ghost">查看</button></td></tr>)}</tbody>
      </table>
    </>
  );
}
