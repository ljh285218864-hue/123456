export default function RecommendationAdminPage() {
  return (
    <>
      <h1>推荐池管理</h1>
      <p className="muted">推荐页共10个橱窗：前2个优先邀请链，后8个按等级池动态推荐。官方账号用于人数不足时补位。</p>
      <div className="grid grid-4" style={{ marginBottom: 20 }}>
        <div className="card stat"><span className="muted">高等级池</span><strong>3位</strong></div>
        <div className="card stat"><span className="muted">中等级池</span><strong>2位</strong></div>
        <div className="card stat"><span className="muted">基础池</span><strong>2位</strong></div>
        <div className="card stat"><span className="muted">低曝光补偿</span><strong>1位</strong></div>
      </div>
      <table className="table"><thead><tr><th>橱窗</th><th>等级</th><th>权重</th><th>近24h曝光</th><th>最终权重</th><th>状态</th></tr></thead><tbody><tr><td>Emma Daily Finds</td><td>白银</td><td>2x</td><td>12</td><td>0.91</td><td><span className="pill">可推荐</span></td></tr><tr><td>Noah Smart Living</td><td>黄金</td><td>4x</td><td>20</td><td>1.33</td><td><span className="pill">可推荐</span></td></tr></tbody></table>
    </>
  );
}
