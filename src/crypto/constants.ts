export const FILE_FORMAT = 'env-vault' as const
export const FILE_VERSION = 1

export const KDF = 'PBKDF2' as const
export const HASH = 'SHA-256' as const
export const ITERATIONS = 250_000

export const CIPHER = 'AES-GCM' as const
export const KEY_LENGTH = 256
export const IV_LENGTH = 12 // bytes (recommended for AES-GCM)
export const SALT_LENGTH = 16 // bytes
