import {
  FILE_FORMAT,
  FILE_VERSION,
  CIPHER,
  KEY_LENGTH,
  ITERATIONS,
  SALT_LENGTH,
  IV_LENGTH,
} from './constants'
import { deriveKey } from './deriveKey'
import type { EnvVaultFileV1 } from './types'

function toBase64(data: Uint8Array) {
  return btoa(String.fromCharCode(...data))
}

export async function encryptEnv(
  envText: string,
  password: string,
  filename = '.env'
): Promise<EnvVaultFileV1> {
  const enc = new TextEncoder()

  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH))
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH))

  // ✅ FIX HERE
  const key = await deriveKey(password, salt.buffer)

  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(envText)
  )

  return {
    format: FILE_FORMAT,
    version: FILE_VERSION,

    crypto: {
      kdf: 'PBKDF2',
      hash: 'SHA-256',
      iterations: ITERATIONS,
      salt: toBase64(salt),
    },

    cipher: {
      algorithm: CIPHER,
      keyLength: KEY_LENGTH,
      iv: toBase64(iv),
    },

    payload: {
      ciphertext: toBase64(new Uint8Array(encrypted)),
    },

    meta: {
      createdAt: new Date().toISOString(),
      filename,
      lineCount: envText.split('\n').length,
    },
  }
}
