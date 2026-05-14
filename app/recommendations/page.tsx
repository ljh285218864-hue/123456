import Link from 'next/link';
import RealRecommendations from '@/components/RealRecommendations';

export default function RecommendationsPage() {
  return (
    <>
      <nav className="nav"><div className="brand">ShareMall</div><div className="navlinks"><Link href="/">Home</Link><Link href="/account">My Account</Link></div></nav>
      <main className="container">
        <RealRecommendations />
      </main>
    </>
  );
}
