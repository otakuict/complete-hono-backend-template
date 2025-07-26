import type { MiddlewareHandler } from 'hono'

const SENSITIVE_HEADERS = ['authorization', 'cookie', 'set-cookie']

export const customLogger: MiddlewareHandler = async (c, next) => {
  if (process.env.NODE_ENV === 'production') {
    return next()
  }

  const { method, url, raw } = c.req
  const headers = raw.headers
  const contentType = headers.get('content-type') || ''

  const headersObj: Record<string, string> = {}
  headers.forEach((value, key) => {
    if (SENSITIVE_HEADERS.includes(key.toLowerCase())) {
      headersObj[key] = '[REDACTED]'
    } else {
      headersObj[key] = value
    }
  })

  let requestBody = ''
  if (!['GET', 'HEAD'].includes(method)) {
    try {
      if (contentType.includes('application/json')) {
        requestBody = JSON.stringify(await c.req.json())
      } else {
        requestBody = await c.req.text()
      }
    } catch {
      requestBody = '[Unable to parse request body]'
    }
  }

  console.log(`⬇️ Inbound Request: ${method} ${url}`)
  console.log('Headers:', headersObj)

  if (method === 'GET') {
    console.log('Query:', c.req.query())
  } else {
    console.log('Body:', requestBody)
  }

  c.set('requestBody', requestBody)

  await next()        // <-- fix here

  const res = c.res
  const cloned = res.clone()
  const responseBody = await cloned.text()

  console.log(`⬆️ Outbound Response: ${res.status}`)
  console.log('Response Body:', responseBody)

  return res                    // <-- return the Response object!
}
