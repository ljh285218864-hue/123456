const storefronts = [
  ['Mia Home Picks', '青铜', '12', '320', '8', '推荐中'],
  ['Emma Daily Finds', '白银', '16', '840', '21', '推荐中'],
  ['Noah Smart Living', '黄金', '18', '1,220', '33', '推荐中']
];

export default function StorefrontsPage() {
  return (
    <>
      <h1>橱窗管理</h1>
      <p className="muted">查看普通用户和官方账号橱窗。会员过期或无商品时暂停推荐。</p>
      <table className="table"><thead><tr><th>橱窗</th><th>等级</th><th>商品数</th><th>曝光</th><th>订单</th><th>状态</th></tr></thead><tbody>{storefronts.map(row => <tr key={row[0]}>{row.map((col, idx) => <td key={col}>{idx === 5 ? <span className="pill">{col}</span> : col}</td>)}</tr>)}</tbody></table>
    </>
  );
}
