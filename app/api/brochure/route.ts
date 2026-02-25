import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, phone, country, property } =
      await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    /* =========================
       📩 ADMIN EMAIL
       ========================= */

    await transporter.sendMail({
      from: `"GR Premium Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📘 Brochure Download – ${property} | ${name} | ${phone}`,
      html: `
        <div style="font-family:Arial;background:#f4f4f4;padding:30px;">
          <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;padding:25px;">
            <h2 style="color:#C9A227;margin-top:0;">
              📘 New Brochure Download Lead
            </h2>
            <p><strong>👤 Name:</strong> ${name}</p>
            <p><strong>📧 Email:</strong> ${email}</p>
            <p><strong>📱 Phone:</strong> ${phone}</p>
            <p><strong>🌍 Country:</strong> ${country}</p>
            <p><strong>🏢 Property:</strong> ${property}</p>
          </div>
        </div>
      `,
    });

    /* =========================
       📩 USER AUTO REPLY
       ========================= */

    await transporter.sendMail({
      from: `"G R Premium Properties LLC" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Your Brochure Request – ${property}`,
      html: `
<div style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" 
    style="max-width:600px;background:#ffffff;margin:40px auto;border-radius:12px;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,0.08);">
    
    <!-- HEADER -->
    <tr>
      <td style="background:#C9A227;padding:25px;text-align:center;">
        <h1 style="margin:0;color:#000;font-size:22px;">
          G R Premium Properties LLC
        </h1>
      </td>
    </tr>

    <!-- BODY -->
    <tr>
      <td style="padding:35px;">
        <h2 style="margin-top:0;color:#333;">
          Thank You for Your Interest!
        </h2>

        <p style="color:#555;font-size:15px;line-height:1.7;">
          Dear <strong>${name}</strong>,
        </p>

        <p style="color:#555;font-size:15px;line-height:1.7;">
          We have successfully received your brochure request for 
          <strong>${property}</strong>.
        </p>

        <p style="color:#555;font-size:15px;line-height:1.7;">
          Our property specialist will contact you shortly with complete 
          pricing, payment plans, and availability details.
        </p>

        <p style="color:#555;font-size:15px;line-height:1.7;">
          We look forward to assisting you in finding your perfect investment.
        </p>
      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td style="background:#111;padding:30px;text-align:center;color:#ffffff;">
        
        <h3 style="margin-top:0;color:#C9A227;">
          G R Premium Properties LLC
        </h3>

        <p style="margin:8px 0;font-size:14px;color:#cccccc;">
          📍 Aspin Commercial Tower – 401C<br/>
          104 Sheikh Zayed Rd<br/>
          Dubai – United Arab Emirates
        </p>

        <p style="margin:8px 0;font-size:14px;">
          📞 <a href="tel:+971585964689" style="color:#C9A227;text-decoration:none;">
          +971 58 596 4689
          </a>
        </p>

        <p style="margin:8px 0;font-size:14px;">
          🌐 <a href="https://www.grpremium.com/" 
          style="color:#C9A227;text-decoration:none;">
          www.grpremium.com
          </a>
        </p>

        <div style="margin-top:15px;">
          <a href="https://www.instagram.com/grpp_dxb/" 
             style="margin:0 10px;color:#ffffff;text-decoration:none;">
             📸 Instagram
          </a>

          <a href="https://www.facebook.com/GRpremiumPropertiesLLC/" 
             style="margin:0 10px;color:#ffffff;text-decoration:none;">
             👍 Facebook
          </a>

          <a href="https://share.google/XpeZGjkEe0ZlTFw0G" 
             style="margin:0 10px;color:#ffffff;text-decoration:none;">
             📍 View on Map
          </a>
        </div>

        <p style="margin-top:20px;font-size:12px;color:#888888;">
          © ${new Date().getFullYear()} G R Premium Properties LLC. 
          All rights reserved.
        </p>

      </td>
    </tr>

  </table>
</div>
`
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ success: false });
  }
}