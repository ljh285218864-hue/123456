import Link from 'next/link';
import OrdersTable from '@/components/OrdersTable';

export default function OrdersCustomerPage() {
  return (
    <>
      <nav className="nav"><div className="brand">ShareMall</div><div className="navlinks"><Link href="/account">My Account</Link><Link href="/withdrawals">Withdrawals</Link><Link href="/">Home</Link></div></nav>
      <main className="container">
        <div className="card">
          <h1>My Orders</h1>
          <p className="muted">Confirm receipt after delivery. Commission settlement starts after confirmation and the settlement period.</p>
          <OrdersTable />
        </div>
      </main>
    </>
  );
}
