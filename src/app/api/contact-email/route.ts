import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// تعريف نوع البيانات المرسلة
type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

// إنشاء مُرسل البريد الإلكتروني
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Boolean(process.env.SMTP_SECURE === 'true'),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

export async function POST(request: Request) {
  try {
    // استخراج البيانات من الطلب
    const body: ContactFormData = await request.json();
    
    // التحقق من وجود البيانات المطلوبة
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { message: 'جميع الحقول مطلوبة' },
        { status: 400 }
      );
    }
    
    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { message: 'يرجى إدخال بريد إلكتروني صالح' },
        { status: 400 }
      );
    }

    // إنشاء مُرسل البريد
    const transporter = createTransporter();
    
    // إعداد خيارات البريد الإلكتروني
    const mailOptions = {
      from: process.env.SMTP_FROM || 'no-reply@example.com',
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `رسالة جديدة من ${body.name}`,
      replyTo: body.email,
      text: `
الاسم: ${body.name}
البريد الإلكتروني: ${body.email}

الرسالة:
${body.message}
      `,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>رسالة جديدة من نموذج الاتصال</h2>
          <p><strong>الاسم:</strong> ${body.name}</p>
          <p><strong>البريد الإلكتروني:</strong> ${body.email}</p>
          <p><strong>الرسالة:</strong></p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${body.message.replace(/\n/g, '<br>')}
          </div>
        </div>
      `,
    };
    
    // إرسال البريد الإلكتروني
    await transporter.sendMail(mailOptions);
    
    // إرجاع استجابة نجاح
    return NextResponse.json(
      { message: 'تم إرسال الرسالة بنجاح' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error sending email:', error);
    
    // إرجاع استجابة خطأ
    return NextResponse.json(
      { message: 'حدث خطأ أثناء إرسال الرسالة' },
      { status: 500 }
    );
  }
}