import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

async function getToEmail(): Promise<string> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/site-config`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const json = await res.json();
      const email: string | undefined = json?.data?.email;
      if (email) return email;
    }
  } catch {
    // fall through to env fallback
  }
  return process.env.CONTACT_EMAIL ?? 'info@fesapade.org.sv';
}

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    console.error('[contact] RESEND_API_KEY is not set');
    return NextResponse.json(
      { error: 'El servicio de correo no está configurado.' },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => null);

  if (!body?.nombre || !body?.email || !body?.mensaje) {
    return NextResponse.json({ error: 'Campos requeridos faltantes.' }, { status: 400 });
  }

  const { nombre, email, telefono, interes, mensaje } = body as Record<string, string>;

  const toEmail = await getToEmail();
  const fromAddress = process.env.RESEND_FROM ?? 'onboarding@resend.dev';

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: `FESAPADE Web <${fromAddress}>`,
    to: toEmail,
    replyTo: email,
    subject: `Nuevo mensaje de ${nombre}${interes ? ` — interés: ${interes}` : ''}`,
    text: [
      `Nombre: ${nombre}`,
      `Email: ${email}`,
      telefono ? `Teléfono: ${telefono}` : '',
      interes ? `Interés: ${interes}` : '',
      '',
      mensaje,
    ]
      .filter(Boolean)
      .join('\n'),
  });

  if (error) {
    console.error('[contact] Resend error:', error);
    return NextResponse.json({ error: 'No se pudo enviar el mensaje.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
