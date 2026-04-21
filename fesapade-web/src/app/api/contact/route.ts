import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const TO_EMAIL = process.env.CONTACT_EMAIL ?? 'info@fesapade.org.sv';

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

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: 'FESAPADE Web <onboarding@resend.dev>',
    to: TO_EMAIL,
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
