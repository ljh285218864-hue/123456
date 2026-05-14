const stats = [
  ['今日注册', '128'],
  ['今日订单', '64'],
  ['今日销售额', '$37,760'],
  ['待结算佣金', '$12,840'],
  ['已结算佣金', '$8,220'],
  ['不足$100余额', '$3,460'],
  ['待提现审核', '18'],
  ['风控异常', '7']
];

export default function AdminDashboard() {
  return (
    <>
      <h1>数据总览</h1>
      <p className="muted">共享商城后台管理系统。前台英文，后台中文。</p>
      <div className="grid grid-4" style={{ marginTop: 20 }}>
        {stats.map(([label, value]) => <div className="card stat" key={label}><span className="muted">{label}</span><strong>{value}</strong></div>)}
      </div>
      <div className="grid grid-3" style={{ marginTop: 20 }}>
        <div className="card"><h3>佣金规则</h3><p className="muted">每笔佣金固定 $20。用户端统一显示 Commission +$20；后台区分订单佣金、手动发放、随机任务。</p></div>
        <div className="card"><h3>推荐规则</h3><p className="muted">推荐页展示10个橱窗，前2个优先邀请链，后8个按等级池和曝光权重动态抽取。</p></div>
        <div className="card"><h3>结算规则</h3><p className="muted">真实订单按确认收货+15天结算；后台发放按7+15天自动结算。</p></div>
      </div>
    </>
  );
}
