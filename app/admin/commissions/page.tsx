import CommissionGrantForm from '@/components/CommissionGrantForm';
import JobRunButton from '@/components/JobRunButton';

const rows = [
  ['U1001', '$20', '未结算', '订单佣金', '2026-06-18'],
  ['U1002', '$20', '待确认', '后台手动发放', '2026-06-20'],
  ['U1003', '$20', '结算中', '随机任务发放', '2026-06-22'],
  ['U1004', '$20', '已结算', '订单佣金', '-']
];

export default function CommissionsPage() {
  return (
    <>
      <h1>佣金管理</h1>
      <p className="muted">用户端统一显示 Commission +$20；后台内部区分真实来源。后台发放默认 7+15 天结算。</p>
      <div className="grid grid-4" style={{ marginBottom: 20 }}>
        <div className="card stat"><span className="muted">未结算佣金</span><strong>$12,840</strong></div>
        <div className="card stat"><span className="muted">已结算佣金</span><strong>$8,220</strong></div>
        <div className="card stat"><span className="muted">不足$100金额</span><strong>$3,460</strong></div>
        <div className="card stat"><span className="muted">已奖励佣金</span><strong>$1,960</strong></div>
      </div>
      <div className="grid grid-3" style={{ marginBottom: 20 }}>
        <div className="card"><h3>手动发放 $20</h3><CommissionGrantForm /></div>
        <div className="card"><h3>自动确认任务</h3><p className="muted">执行到期订单的7天自动确认。</p><JobRunButton label="运行自动确认" endpoint="/api/jobs/auto-confirm" /></div>
        <div className="card"><h3>自动结算任务</h3><p className="muted">执行到期佣金的自动结算。</p><JobRunButton label="运行自动结算" endpoint="/api/jobs/settle-commissions" /></div>
      </div>
      <table className="table"><thead><tr><th>用户</th><th>金额</th><th>状态</th><th>后台来源</th><th>预计结算</th></tr></thead><tbody>{rows.map((r, i) => <tr key={i}>{r.map(c => <td key={c}>{c}</td>)}</tr>)}</tbody></table>
    </>
  );
}
