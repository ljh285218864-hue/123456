'use client';

import { useEffect, useState } from 'react';

type ProductRow = {
  id: string;
  title: string;
  description?: string | null;
  sku?: string | null;
  priceCents: number;
  inventory: number;
  isActive: boolean;
  createdAt: string;
};

export default function AdminProductsTable() {
  const [products, setProducts] = useState<ProductRow[]>([]);

  useEffect(() => {
    fetch('/api/admin/products').then(async response => {
      if (!response.ok) return;
      const data = await response.json();
      setProducts(data.products || []);
    });
  }, []);

  if (!products.length) return <p className="muted">暂无商品数据。</p>;

  return (
    <table className="table">
      <thead><tr><th>商品</th><th>SKU</th><th>价格</th><th>库存</th><th>状态</th><th>创建时间</th></tr></thead>
      <tbody>{products.map(product => <tr key={product.id}><td>{product.title}</td><td>{product.sku || '-'}</td><td>${(product.priceCents / 100).toFixed(2)}</td><td>{product.inventory}</td><td>{product.isActive ? <span className="pill">上架</span> : <span className="pill muted">下架</span>}</td><td>{new Date(product.createdAt).toLocaleDateString()}</td></tr>)}</tbody>
    </table>
  );
}
