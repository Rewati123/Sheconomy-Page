import crypto from 'crypto';

export function generateTemporaryPassword(): string {
  return crypto.randomBytes(8).toString('hex');
}

