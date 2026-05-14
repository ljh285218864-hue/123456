import Link from 'next/link';

const nav = [
  ['总览', '/admin'],
  ['用户管理', '/admin/users'],
  ['官方账号', '/admin/official-accounts'],
  ['会员等级', '/admin/levels'],
  ['商品管理', '/admin/products'],
  ['橱窗管理', '/admin/storefronts'],
  ['推荐池', '/admin/recommendations'],
  ['订单管理', '/admin/orders'],
  ['发货导出', '/admin/shipping'],
  ['佣金管理', '/admin/commissions'],
  ['随机佣金任务', '/admin/commission-tasks'],
  ['提现审核', '/admin/withdrawals'],
  ['退款管理', '/admin/refunds'],
  ['邀请管理', '/admin/invitations'],
  ['风控中心', '/admin/risk'],
  ['系统设置', '/admin/settings']
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>共享商城后台</h2>
        {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
