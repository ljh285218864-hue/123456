import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateRegistrationEmail } from './rules';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'development-secret-change-me';

export type SessionUser = {
  id: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN' | 'SUPER_ADMIN';
};

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export function signSession(user: SessionUser) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
}

export function verifySession(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionUser;
  } catch {
    return null;
  }
}

export function validateInviteCode(code: string) {
  const cleaned = code.trim();
  if (!cleaned) return { ok: false, reason: 'Invitation code is required.' };
  if (cleaned.length < 4) return { ok: false, reason: 'Invitation code is invalid.' };
  return { ok: true, reason: null };
}

export function validateRegistrationInput(input: {
  email: string;
  password: string;
  nickname: string;
  invitationCode: string;
}) {
  const emailCheck = validateRegistrationEmail(input.email);
  if (!emailCheck.ok) return emailCheck;
  if (!input.nickname.trim()) return { ok: false, reason: 'Nickname is required.' };
  if (input.password.length < 8) return { ok: false, reason: 'Password must be at least 8 characters.' };
  return validateInviteCode(input.invitationCode);
}
