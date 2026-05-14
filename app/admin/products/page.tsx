import ProductCreateForm from '@/components/ProductCreateForm';
import AdminProductsTable from '@/components/AdminProductsTable';

export default function ProductsPage() {
  return (
    <>
      <h1>商品管理</h1>
      <p className="muted">支持手动上传商品、CSV/Excel 批量导入、库存管理和上架控制。默认商品价格 $59。</p>
      <div className="card" style={{ marginBottom: 20 }}>
        <h3>新增商品</h3>
        <ProductCreateForm />
      </div>
      <AdminProductsTable />
    </>
  );
}
