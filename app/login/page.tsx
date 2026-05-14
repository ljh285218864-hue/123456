import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <nav className="nav"><div className="brand">ShareMall</div><div className="navlinks"><Link href="/">Home</Link><Link href="/register">Register</Link></div></nav>
      <main className="container">
        <div className="card" style={{ maxWidth: 560, margin: '36px auto' }}>
          <h1>Sign in</h1>
          <p className="muted">Access your storefront, wallet, invitations, and order status.</p>
          <form className="form">
            <label>Email<input className="input" placeholder="name@gmail.com" /></label>
            <label>Password<input className="input" type="password" placeholder="Your password" /></label>
            <button className="btn" type="button">Sign in</button>
          </form>
          <p className="muted">Forgot your password? Please contact support via WhatsApp to reset your password.</p>
        </div>
      </main>
    </>
  );
}
