import Link from 'next/link';
import CurrentUserCard from '@/components/CurrentUserCard';

const commissions = [
  { id: 'C-1001', amount: '+$20', status: 'Awaiting Confirmation', countdown: '7 days to auto-confirm' },
  { id: 'C-1002', amount: '+$20', status: 'Settlement Pending', countdown: '15 days left' },
  { id: 'C-1003', amount: '+$20', status: 'Settled', countdown: 'Available' }
];

export default function AccountPage() {
  return (
    <>
      <nav className="nav"><div className="brand">ShareMall</div><div className="navlinks"><Link href="/">Home</Link><Link href="/recommendations">Recommended Stores</Link><Link href="/orders">Orders</Link><Link href="/withdrawals">Withdrawals</Link></div></nav>
      <main className="container">
        <CurrentUserCard />
        <div className="grid grid-3" style={{ marginBottom: 20 }}>
          <div className="card stat"><span className="pill">Bronze · Trial Active</span><strong>10 days</strong><span className="muted">Complete 3 valid invitations to activate Bronze.</span></div>
          <div className="card stat"><span className="pill muted">Valid Invitations</span><strong>1 / 3</strong><span className="muted">Only valid members passing risk checks count.</span></div>
          <div className="card stat"><span className="pill">Settled Balance</span><strong>$60</strong><span className="muted">Withdraw at $100 or more.</span></div>
        </div>
        <div className="card" style={{ marginBottom: 20 }}>
          <h2>My Storefront</h2>
          <p className="muted">Upload avatar, set nickname, add products, and share your storefront. Avatar upload is allowed; administrators can reset inappropriate images.</p>
          <button className="btn" type="button">Manage Storefront</button>
        </div>
        <div className="card">
          <h2>Commission Balance</h2>
          <table className="table">
            <thead><tr><th>ID</th><th>Amount</th><th>Status</th><th>Countdown</th></tr></thead>
            <tbody>{commissions.map(item => <tr key={item.id}><td>{item.id}</td><td>{item.amount}</td><td>{item.status}</td><td>{item.countdown}</td></tr>)}</tbody>
          </table>
          <p className="muted">All commission records are displayed the same on the customer side. Internal source details are visible only in the Chinese admin dashboard.</p>
        </div>
      </main>
    </>
  );
}
