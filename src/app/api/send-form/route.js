import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  if (request.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { fullName, contact, message } = body;
  if (!fullName || !contact || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    await resend.emails.send({
      from: "LOGODAR <onboarding@resend.dev>",
      to: process.env.EMAIL_TO,
      subject: `Нова контактна форма з сайту LOGODAR `,
      text: `Name: ${fullName}\nContact: ${contact}\n\n${message}`,
      html: `<h1>Нова контактна форма</h1>
      <p><strong>Ім'я:</strong> ${fullName}</p>
          <p><strong>Контакти:</strong> ${contact}</p>
          <p><strong>Повідомлення:</strong> ${message}</p>`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
