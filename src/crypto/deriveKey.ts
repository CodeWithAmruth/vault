import { HASH, ITERATIONS, KEY_LENGTH } from './constants'

export async function deriveKey(
  password: string,
  salt: ArrayBuffer
): Promise<CryptoKey> {
  const enc = new TextEncoder()

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  )

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: ITERATIONS,
      hash: HASH,
    },
    keyMaterial,
    { name: 'AES-GCM', length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  )
}
