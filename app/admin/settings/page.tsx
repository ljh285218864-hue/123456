import { ALLOWED_EMAIL_DOMAINS, MONEY, ACTIVATION, SETTLEMENT } from '@/lib/constants';

export default function SettingsPage() {
  return (
    <>
      <h1>系统设置</h1>
      <p className="muted">集中配置商品价格、佣金、提现门槛、试用期、邮箱白名单和结算周期。</p>
      <div className="grid grid-3" style={{ marginBottom: 20 }}>
        <div className="card"><h3>金额设置</h3><p>商品价格：${MONEY.productPriceCents / 100}</p><p>佣金：${MONEY.commissionCents / 100}</p><p>提现门槛：${MONEY.withdrawalMinimumCents / 100}</p></div>
        <div className="card"><h3>会员设置</h3><p>激活橱窗数：{ACTIVATION.requiredStores}</p><p>试用期：{ACTIVATION.trialDays} 天</p><p>正式青铜有效邀请：{ACTIVATION.requiredValidInvitesForFormalBronze}</p></div>
        <div className="card"><h3>结算设置</h3><p>后台发放确认：{SETTLEMENT.adminGrantAutoConfirmDays} 天</p><p>确认后结算：{SETTLEMENT.afterConfirmationDays} 天</p></div>
      </div>
      <div className="card">
        <h3>邮箱白名单</h3>
        <p className="muted">第一版仅允许这些正式邮箱域名注册，不接收费验证服务。</p>
        <p>{ALLOWED_EMAIL_DOMAINS.join(', ')}</p>
      </div>
    </>
  );
}
