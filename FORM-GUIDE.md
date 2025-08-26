# دليل استخدام نماذج الاتصال في Next.js

## التثبيت الصحيح لـ React Hook Form

لتجنب أخطاء "Module not found" عند استخدام React Hook Form، يجب تثبيت المكتبات في المجلد الرئيسي للمشروع وليس في مجلد `/app`:

```bash
# تأكد من أنك في المجلد الرئيسي للمشروع
cd c:\Users\YOUSEF\Documents\augment-projects\elrahama

# تثبيت المكتبات اللازمة
npm install react-hook-form @hookform/resolvers zod
```

## تجنب أخطاء الهيدريشن (Hydration)

1. **استخدام 'use client'**: تأكد دائمًا من إضافة `'use client'` في بداية أي مكون يستخدم React Hook Form.

2. **تعريف متغيرات الحالة بشكل صحيح**: تأكد من تعريف جميع متغيرات الحالة المستخدمة في المكون:

```tsx
const [formSuccess, setFormSuccess] = useState(false);
```

3. **التحقق من الاستيرادات**: تأكد من استيراد جميع المكتبات والمكونات بشكل صحيح.

## نموذج بديل بدون React Hook Form

إذا استمرت مشكلة "Module not found" مع React Hook Form، يمكنك استخدام نموذج بسيط بدون هذه المكتبة. قمنا بإنشاء نموذج بديل في `src/components/contact/minimal-contact-form.tsx` يستخدم useState فقط:

```tsx
'use client';

import { useState, FormEvent } from 'react';

export function MinimalContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'الاسم مطلوب';
    }
    
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'يرجى إدخال عنوان بريد إلكتروني صالح';
    }
    
    if (!formData.message || formData.message.length < 10) {
      newErrors.message = 'يرجى تقديم المزيد من التفاصيل حول مشروعك';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      console.log('Form data:', formData);
      // إرسال البيانات إلى API
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // باقي الكود للنموذج...
}
```

## نقطة نهاية API

تم إنشاء نقطة نهاية API بسيطة في `src/app/api/contact/route.ts` تستقبل طلبات POST وترد بـ `{ ok: true }`:

```tsx
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received form data:', body);
    
    // هنا يمكنك إضافة منطق لمعالجة البيانات
    // مثل إرسال بريد إلكتروني أو حفظ البيانات في قاعدة بيانات
    
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { ok: false, message: 'حدث خطأ أثناء معالجة النموذج' },
      { status: 500 }
    );
  }
}
```

## تجنب أخطاء Monorepo

إذا كنت تستخدم بنية monorepo، تأكد من:

1. تثبيت المكتبات في المكان الصحيح (المجلد الرئيسي أو المجلد الفرعي المناسب)
2. تحديث ملف `tsconfig.json` لتضمين المسارات الصحيحة
3. التأكد من أن إعدادات Next.js تدعم الوحدات المشتركة

## اختبار النموذج

يمكنك اختبار النموذج المبسط بزيارة:

```
http://localhost:3000/contact/minimal
```

## استكشاف الأخطاء وإصلاحها

1. **خطأ Module not found**: 
   - تأكد من تثبيت المكتبات في المجلد الصحيح
   - جرب مسح ذاكرة التخزين المؤقت: `npm run dev -- --clear-cache`
   - حذف مجلدات `node_modules` و `.next` وإعادة تثبيت المكتبات

2. **أخطاء الهيدريشن**: تحقق من تطابق HTML المُقدم من الخادم مع HTML المُنشأ في العميل.

3. **متغيرات غير معرفة**: تأكد من تعريف جميع المتغيرات المستخدمة في المكون.

4. **مشاكل في الاستيرادات**: تحقق من مسارات الاستيراد وتأكد من أنها صحيحة.

5. **إعادة تشغيل الخادم**: في بعض الأحيان، يكفي إعادة تشغيل خادم التطوير لحل المشكلات.

6. **استخدام النموذج البديل**: إذا استمرت المشكلة مع React Hook Form، استخدم النموذج البديل المقدم في هذا الدليل.