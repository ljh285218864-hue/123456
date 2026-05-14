import Link from 'next/link';
import ConfirmReceiptButton from '@/components/ConfirmReceiptButton';

const orders = [
  { id: 'O-1001', date: '2026-05-14', total: '$590', status: 'Shipped', action: true },
  { id: 'O-1002', date: '2026-05-15', total: '$59', status: 'Confirmed', action: false }
];

export default function OrdersCustomerPage() {
  return (
    <>
      <nav className="nav"><div className="brand">ShareMall</div><div className="navlinks"><Link href="/account">My Account</Link><Link href="/">Home</Link></div></nav>
      <main className="container">
        <div className="card">
          <h1>My Orders</h1>
          <p className="muted">Confirm receipt after delivery. Commission settlement starts after confirmation and the settlement period.</p>
          <table className="table">
            <thead><tr><th>Order</th><th>Date</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>{orders.map(order => <tr key={order.id}><td>{order.id}</td><td>{order.date}</td><td>{order.total}</td><td>{order.status}</td><td>{order.action ? <ConfirmReceiptButton orderId={order.id} /> : <span className="pill">Confirmed</span>}</td></tr>)}</tbody>
          </table>
        </div>
      </main>
    </>
  );
}
