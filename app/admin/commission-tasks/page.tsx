import CommissionTaskForm from '@/components/CommissionTaskForm';

export default function CommissionTasksPage() {
  return (
    <>
      <h1>随机佣金任务</h1>
      <p className="muted">可在指定时间窗口内随机发放多笔 $20。用户端显示与普通佣金完全一致，后台保留真实来源。</p>
      <div className="card" style={{ marginBottom: 20 }}>
        <h3>创建随机发放任务</h3>
        <CommissionTaskForm />
      </div>
      <table className="table"><thead><tr><th>任务ID</th><th>用户</th><th>总次数</th><th>已发</th><th>窗口</th><th>状态</th></tr></thead><tbody><tr><td>T-1001</td><td>U1008</td><td>4</td><td>2</td><td>24小时</td><td>执行中</td></tr></tbody></table>
    </>
  );
}
