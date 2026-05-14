import Link from 'next/link';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <>
      <nav className="nav"><div className="brand">ShareMall</div><div className="navlinks"><Link href="/">Home</Link><Link href="/register">Register</Link></div></nav>
      <main className="container">
        <div className="card" style={{ maxWidth: 560, margin: '36px auto' }}>
          <h1>Sign in</h1>
          <p className="muted">Access your storefront, wallet, invitations, and order status.</p>
          <LoginForm />
          <p className="muted">Forgot your password? Please contact support via WhatsApp to reset your password.</p>
        </div>
      </main>
    </>
  );
}
