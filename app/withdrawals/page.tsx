import Link from 'next/link';
import WithdrawalForm from '@/components/WithdrawalForm';

export default function WithdrawalsCustomerPage() {
  return (
    <>
      <nav className="nav"><div className="brand">ShareMall</div><div className="navlinks"><Link href="/account">My Account</Link><Link href="/">Home</Link></div></nav>
      <main className="container">
        <div className="card" style={{ maxWidth: 760, margin: '36px auto' }}>
          <span className="pill">Minimum $100</span>
          <h1>Request Withdrawal</h1>
          <p className="muted">Withdrawal requests are reviewed within 1–2 days. Submitted requests cannot be cancelled by users.</p>
          <WithdrawalForm userId="demo-user-id" />
        </div>
      </main>
    </>
  );
}
