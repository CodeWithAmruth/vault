import { useState } from 'react'
import { decryptEnv } from '../crypto/decryptEnv'
import type { EnvVaultFileV1 } from '../crypto/types'

export default function DecryptPage() {
  const [file, setFile] = useState<File | null>(null)
  const [password, setPassword] = useState('')
  const [decrypted, setDecrypted] = useState('')
  const [error, setError] = useState('')

  async function handleDecrypt() {
    if (!file || !password) {
      setError('Upload file and enter password')
      return
    }

    try {
      setError('')
      const text = await file.text()
      const parsed = JSON.parse(text) as EnvVaultFileV1
      const result = await decryptEnv(parsed, password)
      setDecrypted(result)
    } catch {
      setError('Wrong password or invalid file')
    }
  }

  function downloadEnv() {
    const blob = new Blob([decrypted], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = '.env'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Decrypt .envvault
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload .envvault file
            </label>
            <input
              type="file"
              accept=".envvault,application/json"
              onChange={e => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter decryption password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <button
            onClick={handleDecrypt}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Decrypt
          </button>
        </div>

        {decrypted && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Decrypted content
              </label>
              <textarea
                rows={8}
                value={decrypted}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <button
              onClick={downloadEnv}
              className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Download .env
            </button>
          </div>
        )}
      </div>
    </div>
  )
}