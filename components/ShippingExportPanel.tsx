'use client';

import { useState } from 'react';

export default function ShippingExportPanel() {
  const [status, setStatus] = useState('PAID');
  const [productId, setProductId] = useState('');

  function exportCsv() {
    const params = new URLSearchParams({ status });
    if (productId.trim()) params.set('productId', productId.trim());
    window.location.href = `/api/admin/shipping/export?${params.toString()}`;
  }

  return (
    <div className="card" style={{ marginBottom: 20 }}>
      <h3>导出收货地址</h3>
      <div className="form">
        <select className="select" value={status} onChange={event => setStatus(event.target.value)}>
          <option value="PAID">已付款未发货</option>
          <option value="SHIPPED">已发货</option>
          <option value="CONFIRMED">已确认收货</option>
          <option value="REFUND_REQUESTED">退款中</option>
        </select>
        <input className="input" value={productId} onChange={event => setProductId(event.target.value)} placeholder="商品ID，可选；不填则导出全部" />
        <button className="btn" type="button" onClick={exportCsv}>导出 CSV</button>
      </div>
    </div>
  );
}
