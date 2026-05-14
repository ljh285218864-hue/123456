import { cookies } from 'next/headers';
import { verifySession } from './auth';

export async function getCurrentSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('sharemall_session')?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function requireCurrentUserId() {
  const session = await getCurrentSession();
  if (!session) throw new Error('Authentication required.');
  return session.id;
}
