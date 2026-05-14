export default function CommissionTasksPage() {
  return (
    <>
      <h1>随机佣金任务</h1>
      <p className="muted">可立即发放一笔 $20，或在指定时间窗口内随机发放多笔 $20。用户端显示与普通佣金完全一致。</p>
      <div className="card" style={{ marginBottom: 20 }}>
        <h3>创建发放任务</h3>
        <div className="form">
          <input className="input" placeholder="用户ID或邮箱" />
          <select className="select"><option>立即发放一次</option><option>随机时间发放多次</option></select>
          <input className="input" placeholder="发放次数，随机模式填写" />
          <input className="input" placeholder="时间范围，例如 24小时 / 48小时 / 10天" />
          <textarea className="textarea" placeholder="后台备注，用户不可见" />
          <button className="btn" type="button">确认创建任务</button>
        </div>
      </div>
      <table className="table"><thead><tr><th>任务ID</th><th>用户</th><th>总次数</th><th>已发</th><th>窗口</th><th>状态</th></tr></thead><tbody><tr><td>T-1001</td><td>U1008</td><td>4</td><td>2</td><td>24小时</td><td>执行中</td></tr></tbody></table>
    </>
  );
}
