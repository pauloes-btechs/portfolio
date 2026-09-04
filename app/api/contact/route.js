import { Resend } from "resend";

export async function POST(req) {
  let payload;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (payload.name || "").toString().trim().slice(0, 120);
  const email = (payload.email || "").toString().trim().slice(0, 200);
  const company = (payload.company || "").toString().trim().slice(0, 200);
  const message = (payload.message || "").toString().trim().slice(0, 5000);

  if (!name || !email || !message) {
    return Response.json({ error: "Name, email, and message are required." }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ error: "That email doesn't look valid." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || "pauloes@btechs.io";
  const from = process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    return Response.json(
      { error: "Contact form isn't configured yet — email me directly instead." },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Portfolio contact — ${name}${company ? ` (${company})` : ""}`,
      text: `From: ${name} <${email}>\nCompany/role: ${company || "—"}\n\n${message}`,
    });
    if (error) throw new Error(error.message || "Send failed.");
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { error: "Couldn't send right now — email me directly instead." },
      { status: 502 }
    );
  }
}
