import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

function randomTimes(start: Date, end: Date, count: number) {
  const startMs = start.getTime();
  const endMs = end.getTime();
  return Array.from({ length: count }, () => new Date(startMs + Math.random() * (endMs - startMs))).sort((a, b) => a.getTime() - b.getTime());
}

export async function POST(request: Request) {
  const body = await request.json();
  const userId = String(body.userId || '');
  const totalRuns = Math.max(1, Number(body.totalRuns || 1));
  const windowHours = Math.max(1, Number(body.windowHours || 24));
  const internalNote = String(body.internalNote || '');
  const createdById = String(body.createdById || 'system');

  if (!userId) return NextResponse.json({ error: 'userId is required.' }, { status: 400 });
  const now = new Date();
  const windowEndsAt = new Date(now.getTime() + windowHours * 60 * 60 * 1000);

  const task = await prisma.commissionTask.create({
    data: {
      userId,
      totalRuns,
      windowStartsAt: now,
      windowEndsAt,
      createdById,
      internalNote,
      status: 'PENDING'
    }
  });

  const schedule = randomTimes(now, windowEndsAt, totalRuns).map(time => time.toISOString());
  return NextResponse.json({ task, schedulePreview: schedule });
}
