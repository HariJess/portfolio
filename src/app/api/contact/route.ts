import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  // Validation des paramètres
  if (!name || !email || !message) {
    return NextResponse.json(
      {
        success: false,
        error: "Les champs nom, email et message sont obligatoires",
      },
      { status: 400 }
    );
  }

  if (typeof name !== "string" || name.trim() === "") {
    return NextResponse.json(
      { success: false, error: "Le nom doit être une chaîne non vide" },
      { status: 400 }
    );
  }

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { success: false, error: "L'email n'est pas valide" },
      { status: 400 }
    );
  }

  if (typeof message !== "string" || message.trim() === "") {
    return NextResponse.json(
      { success: false, error: "Le message doit être une chaîne non vide" },
      { status: 400 }
    );
  }
  // config transporter SMTP (contoh Gmail)
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: String(process.env.EMAIL_USERNAME),
  //     pass: String(process.env.EMAIL_PASSWORD),
  //   },
  // });

  try {
    //     const html = `
    //   <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9f9f9;padding:40px 0;">
    //     <tr>
    //       <td align="center">
    //         <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#fff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.05);padding:40px;">
    //           <tr>
    //             <td align="center" style="padding-bottom:24px;">
    //               <h2 style="margin:0;color:#333;font-family:sans-serif;">Pesan Baru dari Portfolio</h2>
    //             </td>
    //           </tr>
    //           <tr>
    //             <td style="color:#555;font-family:sans-serif;font-size:16px;line-height:1.6;">
    //               <p><b>Nama:</b> ${name}</p>
    //               <p><b>Email:</b> <a href="mailto:${email}" style="color:#007bff;text-decoration:none;">${email}</a></p>
    //               <p><b>Pesan:</b></p>
    //               <div style="background:#f1f1f1;border-radius:4px;padding:16px;margin:12px 0;color:#222;">
    //                 ${message}
    //               </div>
    //             </td>
    //           </tr>
    //           <tr>
    //             <td align="center" style="padding-top:32px;color:#aaa;font-size:12px;">
    //               &copy; ${new Date().getFullYear()} Portfolio. All rights reserved.
    //             </td>
    //           </tr>
    //         </table>
    //       </td>
    //     </tr>
    //   </table>
    // `;

    //     await transporter.sendMail({
    //       from: `"${name}" <${email}>`,
    //       to: String(process.env.EMAIL_USERNAME),
    //       subject: `Pesan dari ${name}`,
    //       text: `Nama: ${name}\nEmail: ${email}\nPesan:\n${message}`,
    //       html,
    //     });

    const data = { name, email, message };
    await fetch(process.env.N8N_WEBHOOK_URL as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
