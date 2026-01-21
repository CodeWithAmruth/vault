import { deriveKey } from './deriveKey'
import type { EnvVaultFileV1 } from './types'

function fromBase64(base64: string) {
  return Uint8Array.from(atob(base64), c => c.charCodeAt(0))
}

export async function decryptEnv(
  file: EnvVaultFileV1,
  password: string
): Promise<string> {
  if (file.format !== 'env-vault' || file.version !== 1) {
    throw new Error('Unsupported file format')
  }

  const salt = fromBase64(file.crypto.salt)
  const iv = fromBase64(file.cipher.iv)
  const ciphertext = fromBase64(file.payload.ciphertext)

  // ✅ FIX HERE
  const key = await deriveKey(password, salt.buffer)

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext
  )

  return new TextDecoder().decode(decrypted)
}
