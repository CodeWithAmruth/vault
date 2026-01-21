export interface EnvVaultFileV1 {
  format: 'env-vault'
  version: 1

  crypto: {
    kdf: 'PBKDF2'
    hash: 'SHA-256'
    iterations: number
    salt: string
  }

  cipher: {
    algorithm: 'AES-GCM'
    keyLength: 256
    iv: string
  }

  payload: {
    ciphertext: string
  }

  meta?: {
    createdAt?: string
    filename?: string
    lineCount?: number
  }
}
