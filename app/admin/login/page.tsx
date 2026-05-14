export default function AdminLoginPage() {
  return (
    <main className="container">
      <div className="card" style={{ maxWidth: 560, margin: '56px auto' }}>
        <h1>管理员登录</h1>
        <p className="muted">仅限白名单管理员访问共享商城后台。</p>
        <form className="form">
          <label>管理员邮箱<input className="input" placeholder="admin@example.com" /></label>
          <label>密码<input className="input" type="password" placeholder="管理员密码" /></label>
          <button className="btn" type="button">登录后台</button>
        </form>
      </div>
    </main>
  );
}
