import Link from 'next/link';
import { ALLOWED_EMAIL_DOMAINS } from '@/lib/constants';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  return (
    <>
      <nav className="nav"><div className="brand">ShareMall</div><div className="navlinks"><Link href="/">Home</Link><Link href="/admin">Admin</Link></div></nav>
      <main className="container">
        <div className="card" style={{ maxWidth: 760, margin: '36px auto' }}>
          <span className="pill">Invitation required</span>
          <h1>Create your ShareMall account</h1>
          <p className="muted">Use your invitation code or referral link to register. Temporary email addresses are not accepted.</p>
          <RegisterForm />
          <div className="card" style={{ marginTop: 18, background: '#f8fafc' }}>
            <strong>Supported email providers</strong>
            <p className="muted">{ALLOWED_EMAIL_DOMAINS.join(', ')}</p>
          </div>
        </div>
      </main>
    </>
  );
}
