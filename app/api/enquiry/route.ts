import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, phone, country, interested_property } =
      await req.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    /* =========================
       📩 ADMIN EMAIL
    ========================== */

    await transporter.sendMail({
      from: `"GR Premium Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Property Enquiry – ${interested_property} | ${name} | ${phone}`,
      html: `
<table width="100%" bgcolor="#f4f4f4" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" style="padding:40px 0;">
      <table width="600" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="padding:25px;">
        <tr>
          <td>
            <h2 style="color:#C9A227;margin:0 0 15px 0;">
              New Property Enquiry
            </h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Country:</strong> ${country}</p>
            <p><strong>Interested Property:</strong> ${interested_property}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
      `,
    });

    /* =========================
       📩 USER AUTO REPLY
    ========================== */

    await transporter.sendMail({
      from: `"G R Premium Properties LLC" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank You for Your Enquiry – ${interested_property}`,
      html: `
<table width="100%" bgcolor="#f4f4f4" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" style="padding:40px 0;">
      
      <table width="600" cellpadding="0" cellspacing="0" bgcolor="#ffffff">
        
        <!-- HEADER -->
        <tr>
          <td align="center" bgcolor="#C9A227" style="padding:25px;">
            <h1 style="margin:0;font-family:Arial;color:#000;font-size:22px;">
              G R Premium Properties LLC
            </h1>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="padding:35px;font-family:Arial;color:#333;">
            <h2 style="margin-top:0;">Thank You, ${name}!</h2>

            <p>
              We have received your enquiry for 
              <strong>${interested_property}</strong>.
            </p>

            <p>
              Our property consultant will contact you shortly with
              complete pricing, availability, and payment plan details.
            </p>

            <p>
              We look forward to assisting you in securing your ideal investment.
            </p>
          </td>
        </tr>

        <!-- PREMIUM FOOTER -->
        <tr>
  <td bgcolor="#000000" align="center" style="padding:35px 25px;font-family:Arial;color:#ffffff;">
    
    <h3 style="color:#C9A227;margin:0 0 15px 0;">
      G R Premium Properties LLC
    </h3>

    <p style="margin:6px 0;color:#dddddd;font-size:14px;line-height:1.6;">
      📍 Aspin Commercial Tower – 401C<br/>
      104 Sheikh Zayed Rd<br/>
      Dubai – United Arab Emirates
    </p>

    <p style="margin:10px 0;font-size:15px;">
      📞 
      <a href="tel:+971585964689" 
         style="color:#C9A227;text-decoration:none;font-weight:bold;">
         +971 58 596 4689
      </a>
    </p>

    <p style="margin:10px 0;font-size:15px;">
      🌐 
      <a href="https://www.grpremium.com/" 
         style="color:#C9A227;text-decoration:none;font-weight:bold;">
         www.grpremium.com
      </a>
    </p>

    <!-- SOCIAL ROW -->
    <p style="margin:20px 0 10px 0;font-size:14px;">
      📸 
      <a href="https://www.instagram.com/grpp_dxb/" 
         style="color:#ffffff;text-decoration:none;margin:0 8px;">
         Instagram
      </a>

      &nbsp;&nbsp;

      👍 
      <a href="https://www.facebook.com/GRpremiumPropertiesLLC/" 
         style="color:#ffffff;text-decoration:none;margin:0 8px;">
         Facebook
      </a>

      &nbsp;&nbsp;

      📍 
      <a href="https://share.google/XpeZGjkEe0ZlTFw0G" 
         style="color:#ffffff;text-decoration:none;margin:0 8px;">
         View on Map
      </a>
    </p>

    <p style="margin-top:20px;font-size:12px;color:#888888;">
      © ${new Date().getFullYear()} G R Premium Properties LLC. 
      All rights reserved.
    </p>

  </td>
</tr>

      </table>

    </td>
  </tr>
</table>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Enquiry API Error:", error);
    return NextResponse.json({ success: false });
  }
}