import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const body = await request.json();
  const title = String(body.title || '').trim();
  const description = String(body.description || '').trim();
  const sku = String(body.sku || '').trim() || undefined;
  const inventory = Number(body.inventory || 0);

  if (!title) return NextResponse.json({ error: '商品标题必填' }, { status: 400 });

  const product = await prisma.product.create({
    data: {
      title,
      description,
      sku,
      inventory,
      priceCents: 5900,
      isActive: true
    }
  });

  return NextResponse.json({ product });
}
