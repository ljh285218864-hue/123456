import Link from 'next/link';
import { ACTIVATION, MONEY } from '@/lib/constants';
import { formatMoney } from '@/lib/rules';

const demoStores = [
  'Mia Home Picks','Emma Daily Finds','Olivia Essentials','Noah Smart Living','Sophia Home Store',
  'Ava Kitchen Finds','Liam Daily Goods','Ella Home Choice','Daniel Essentials','Grace Living Co.'
];

export default function RecommendationsPage() {
  return (
    <>
      <nav className="nav"><div className="brand">ShareMall</div><div className="navlinks"><Link href="/">Home</Link><Link href="/account">My Account</Link></div></nav>
      <main className="container">
        <div className="card" style={{ marginBottom: 20 }}>
          <span className="pill">Bronze Trial Activation</span>
          <h1>Recommended Stores for You</h1>
          <p className="muted">Choose one {formatMoney(MONEY.productPriceCents)} product from each recommended storefront. Complete all {ACTIVATION.requiredStores} stores in one checkout to activate your 10-day Bronze trial.</p>
          <div className="progress"><div style={{ width: '30%' }} /></div>
          <p className="muted">Demo progress: Completed 3 / 10 stores. In production, once any store is purchased, this recommendation set is locked until activation is complete.</p>
        </div>
        <div className="grid grid-4">
          {demoStores.map((store, index) => (
            <div className="card store-card" key={store}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div className="avatar">{store.slice(0,1)}</div>
                <div><strong>{store}</strong><p className="muted" style={{ margin: 0 }}>{index < 2 ? 'Invitation chain priority' : 'Dynamic recommendation'}</p></div>
              </div>
              <span className={index < 3 ? 'pill' : 'pill muted'}>{index < 3 ? 'Completed' : 'Pending'}</span>
              <p className="muted">Curated daily essentials and home lifestyle products.</p>
              <button className="btn ghost" type="button">Choose $59 Product</button>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 22 }} className="card">
          <h3>Checkout summary</h3>
          <p className="muted">Required total: 10 products × $59 = $590. PayPal is the first payment entry and supports PayPal account or card payment.</p>
          <button className="btn" type="button">Pay with PayPal / Card</button>
        </div>
      </main>
    </>
  );
}
