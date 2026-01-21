import { useState } from 'react'
import { encryptEnv } from '../crypto/encryptEnv'

export default function EncryptPage() {
  const [envText, setEnvText] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleEncrypt() {
    if (!envText || !password) {
      setError('Enter env text and password')
      return
    }

    try {
      setError('')
      const encrypted = await encryptEnv(envText, password)
      download(encrypted, 'secrets.envvault')
    } catch {
      setError('Encryption failed')
    }
  }

  function download(data: object, filename: string) {
    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      { type: 'application/json' }
    )
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Encrypt .env
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Environment variables
            </label>
            <textarea
              rows={8}
              placeholder="Paste .env content here&#10;&#10;Example:&#10;DATABASE_URL=postgres://...&#10;API_KEY=abc123&#10;SECRET_TOKEN=xyz789"
              value={envText}
              onChange={e => setEnvText(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter encryption password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <button
            onClick={handleEncrypt}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Encrypt & Download
          </button>
        </div>
      </div>
    </div>
  )
}