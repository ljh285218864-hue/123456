import LoginForm from '@/components/LoginForm';

export default function AdminLoginPage() {
  return (
    <main className="container">
      <div className="card" style={{ maxWidth: 560, margin: '56px auto' }}>
        <h1>管理员登录</h1>
        <p className="muted">仅限白名单管理员访问共享商城后台。</p>
        <LoginForm admin />
      </div>
    </main>
  );
}
