export const WEBHOOKS = {
  sondeo: 'https://n8n.fluyafragancias.com/webhook/windstudies-sondeo',
}

export class WebhookError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'WebhookError'
  }
}

export async function callWebhook(url: string, body: unknown): Promise<void> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok || (data as { success?: boolean }).success === false) {
    throw new WebhookError((data as { message?: string }).message ?? `Error ${res.status}`)
  }
}
