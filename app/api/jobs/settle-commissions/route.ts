import { NextResponse } from 'next/server';
import { settleDueCommissions } from '@/lib/settlement-jobs';

export async function POST(request: Request) {
  const secret = request.headers.get('x-job-secret');
  if (process.env.JOB_SECRET && secret !== process.env.JOB_SECRET) {
    return NextResponse.json({ error: 'Unauthorized job request.' }, { status: 401 });
  }
  const result = await settleDueCommissions();
  return NextResponse.json(result);
}
