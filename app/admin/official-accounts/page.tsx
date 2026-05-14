export default function OfficialAccountsPage() {
  const accounts = ['Mia Home Picks','Emma Daily Finds','Olivia Essentials','Noah Smart Living','Sophia Home Store'];
  return (
    <>
      <h1>官方账号管理</h1>
      <p className="muted">官方账号前台显示与普通用户一致，后台必须清楚标记。支持一键生成任意数量官方账号。</p>
      <div className="card" style={{ marginBottom: 20 }}>
        <h3>一键生成官方账号</h3>
        <div className="form">
          <input className="input" placeholder="生成数量，例如 10 / 50 / 100" />
          <button className="btn" type="button">生成官方账号</button>
        </div>
      </div>
      <table className="table"><thead><tr><th>昵称</th><th>官方账号</th><th>橱窗商品数</th><th>曝光</th><th>成交</th><th>状态</th></tr></thead><tbody>{accounts.map((name, i) => <tr key={name}><td>{name}</td><td>是</td><td>{8 + i}</td><td>{120 + i * 17}</td><td>{3 + i}</td><td><span className="pill">启用</span></td></tr>)}</tbody></table>
    </>
  );
}
