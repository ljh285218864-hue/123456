import Link from 'next/link';
import CurrentUserCard from '@/components/CurrentUserCard';
import CommissionTable from '@/components/CommissionTable';
import InvitationsTable from '@/components/InvitationsTable';

export default function AccountPage() {
  return (
    <>
      <nav className="nav"><div className="brand">ShareMall</div><div className="navlinks"><Link href="/">Home</Link><Link href="/recommendations">Recommended Stores</Link><Link href="/orders">Orders</Link><Link href="/withdrawals">Withdrawals</Link></div></nav>
      <main className="container">
        <CurrentUserCard />
        <div className="grid grid-3" style={{ marginBottom: 20 }}>
          <div className="card stat"><span className="pill">Bronze · Trial Active</span><strong>10 days</strong><span className="muted">Complete 3 valid invitations to activate Bronze.</span></div>
          <div className="card stat"><span className="pill muted">Valid Invitations</span><strong>3 required</strong><span className="muted">Only valid members passing risk checks count.</span></div>
          <div className="card stat"><span className="pill">Withdrawal</span><strong>$100 min</strong><span className="muted">Withdraw settled balance at $100 or more.</span></div>
        </div>
        <div className="card" style={{ marginBottom: 20 }}>
          <h2>My Storefront</h2>
          <p className="muted">Upload avatar, set nickname, add products, and share your storefront. Avatar upload is allowed; administrators can reset inappropriate images.</p>
          <button className="btn" type="button">Manage Storefront</button>
        </div>
        <div className="card" style={{ marginBottom: 20 }}>
          <h2>Commission Balance</h2>
          <CommissionTable />
          <p className="muted">All commission records are displayed the same on the customer side. Internal source details are visible only in the Chinese admin dashboard.</p>
        </div>
        <div className="card">
          <h2>My Direct Invitations</h2>
          <InvitationsTable />
        </div>
      </main>
    </>
  );
}
