import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

function csvEscape(value: unknown) {
  const text = String(value ?? '');
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || 'PAID';
  const productId = searchParams.get('productId') || undefined;

  const orders = await prisma.order.findMany({
    where: {
      status: status as any,
      items: productId ? { some: { productId } } : undefined
    },
    include: { items: { include: { product: true } }, buyer: true },
    orderBy: { createdAt: 'desc' }
  });

  const header = ['订单号','下单时间','买家邮箱','商品名称','SKU','数量','收货人','电话','国家','州省','城市','街道地址','邮编','订单状态'];
  const rows = orders.flatMap(order => order.items.map(item => [
    order.id,
    order.createdAt.toISOString(),
    order.buyer.email,
    item.product.title,
    item.product.sku || '',
    item.quantity,
    order.shippingName,
    order.shippingPhone || '',
    order.shippingCountry,
    order.shippingState || '',
    order.shippingCity,
    order.shippingAddress,
    order.shippingZip,
    order.status
  ]));

  const csv = [header, ...rows].map(row => row.map(csvEscape).join(',')).join('\n');
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="shipping-export.csv"'
    }
  });
}
