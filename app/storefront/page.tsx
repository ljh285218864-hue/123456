import Link from 'next/link';
import StorefrontEditForm from '@/components/StorefrontEditForm';

export default function StorefrontPage() {
  return (
    <>
      <nav className="nav"><div className="brand">ShareMall</div><div className="navlinks"><Link href="/account">My Account</Link><Link href="/orders">Orders</Link><Link href="/">Home</Link></div></nav>
      <main className="container">
        <div className="card" style={{ maxWidth: 760, margin: '36px auto' }}>
          <h1>Manage Storefront</h1>
          <p className="muted">Update your public storefront profile. Storefront recommendation eligibility depends on your active membership status.</p>
          <StorefrontEditForm />
        </div>
      </main>
    </>
  );
}
