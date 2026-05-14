import Link from 'next/link';
import { SITE } from '@/lib/constants';

export default function HomePage() {
  return (
    <>
      <nav className="nav">
        <div className="brand">{SITE.name}</div>
        <div className="navlinks">
          <Link href="/register">Register</Link>
          <Link href="/recommendations">Recommended Stores</Link>
          <Link href="/account">My Account</Link>
          <Link href="/admin">Admin</Link>
        </div>
      </nav>
      <main className="container">
        <section className="hero">
          <div>
            <span className="pill">{SITE.tagline}</span>
            <h1>Discover curated stores and everyday essentials.</h1>
            <p>
              Shop recommended products, activate your storefront, and grow through real store sales.
              ShareMall is built around storefront sales, transparent order status, and fixed commission records.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <Link className="btn" href="/register">Create Account</Link>
              <Link className="btn secondary" href="/recommendations">View Demo Recommendations</Link>
            </div>
          </div>
          <div className="card">
            <h3>How activation works</h3>
            <div className="grid" style={{ marginTop: 16 }}>
              <div><strong>1. Join with an invitation</strong><p className="muted">Registration requires a valid invitation code or referral link.</p></div>
              <div><strong>2. Choose 10 storefronts</strong><p className="muted">Pick one $59 product from each recommended storefront and pay once through PayPal.</p></div>
              <div><strong>3. Activate Bronze trial</strong><p className="muted">Complete 10 storefront purchases to activate a 10-day Bronze trial.</p></div>
            </div>
          </div>
        </section>
        <section className="grid grid-3">
          <div className="card"><h3>Fixed storefront commission</h3><p className="muted">When customers buy through an active storefront, the storefront owner receives a fixed $20 commission record.</p></div>
          <div className="card"><h3>Settlement protection</h3><p className="muted">Commissions remain unsettled until order confirmation and the settlement period are complete.</p></div>
          <div className="card"><h3>Member levels</h3><p className="muted">Bronze, Silver, Gold, Platinum, Diamond, and Black Gold levels affect recommendation exposure.</p></div>
        </section>
      </main>
    </>
  );
}
