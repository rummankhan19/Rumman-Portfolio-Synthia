import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  return NextResponse.json({ status: 'RUMMAN.OS online', version: '2.045.11' })
}

export async function POST(request, { params }) {
  try {
    const body = await request.json()
    return NextResponse.json({ received: true, echo: body })
  } catch (e) {
    return NextResponse.json({ error: 'invalid payload' }, { status: 400 })
  }
}
