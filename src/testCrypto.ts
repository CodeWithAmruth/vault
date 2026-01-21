import { encryptEnv } from './crypto/encryptEnv'
import { decryptEnv } from './crypto/decryptEnv'

export async function testCrypto() {
  const envText = `
DB_HOST=localhost
DB_USER=admin
DB_PASS=supersecret
JWT_SECRET=abc123
`.trim()

  const password = 'test-password-123'

  const encrypted = await encryptEnv(envText, password)
  console.log('Encrypted:', encrypted)

  const decrypted = await decryptEnv(encrypted, password)
  console.log('Decrypted:', decrypted)

  if (decrypted === envText) {
    console.log('✅ TEST PASSED')
  } else {
    console.error('❌ TEST FAILED')
  }
}
