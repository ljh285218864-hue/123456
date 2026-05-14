import { sampleProducts } from '@/lib/mock-data';

export default function ProductsPage() {
  return (
    <>
      <h1>商品管理</h1>
      <p className="muted">支持手动上传商品、CSV/Excel 批量导入、库存管理和上架控制。默认商品价格 $59。</p>
      <div className="card" style={{ marginBottom: 20 }}>
        <h3>新增商品</h3>
        <div className="form">
          <input className="input" placeholder="英文商品标题" />
          <textarea className="textarea" placeholder="英文商品描述" />
          <input className="input" placeholder="SKU" />
          <input className="input" placeholder="库存数量" />
          <button className="btn" type="button">保存商品</button>
        </div>
      </div>
      <table className="table"><thead><tr><th>商品</th><th>SKU</th><th>价格</th><th>库存</th><th>状态</th></tr></thead><tbody>{sampleProducts.map(item => <tr key={item.sku}><td>{item.title}</td><td>{item.sku}</td><td>{item.price}</td><td>{item.inventory}</td><td><span className="pill">上架</span></td></tr>)}</tbody></table>
    </>
  );
}
