import assert from 'node:assert/strict'
import { test } from 'node:test'
import { request } from './httpClient.ts'

function stubFetch(captured: { headers?: Headers }) {
  return async (_url: string | URL | Request, init?: RequestInit) => {
    captured.headers = new Headers(init?.headers)
    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  }
}

test('мерджить plain object headers і додає Content-Type', async () => {
  const captured: { headers?: Headers } = {}
  globalThis.fetch = stubFetch(captured)

  await request('/cars', { headers: { 'X-Custom': 'abc' } })

  assert.equal(captured.headers?.get('x-custom'), 'abc')
  assert.equal(captured.headers?.get('content-type'), 'application/json')
})

test('мерджить Headers-інстанс і додає Content-Type', async () => {
  const captured: { headers?: Headers } = {}
  globalThis.fetch = stubFetch(captured)

  await request('/cars', { headers: new Headers({ 'X-Custom': 'abc' }) })

  assert.equal(captured.headers?.get('x-custom'), 'abc')
  assert.equal(captured.headers?.get('content-type'), 'application/json')
})

test('мерджить масив пар headers і додає Content-Type', async () => {
  const captured: { headers?: Headers } = {}
  globalThis.fetch = stubFetch(captured)

  await request('/cars', { headers: [['X-Custom', 'abc']] })

  assert.equal(captured.headers?.get('x-custom'), 'abc')
  assert.equal(captured.headers?.get('content-type'), 'application/json')
})

test('не перезаписує вже заданий Content-Type', async () => {
  const captured: { headers?: Headers } = {}
  globalThis.fetch = stubFetch(captured)

  await request('/cars', { headers: { 'Content-Type': 'text/plain' } })

  assert.equal(captured.headers?.get('content-type'), 'text/plain')
})
