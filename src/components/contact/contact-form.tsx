'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const contactSchema = z.object({
  name: z.string().min(2, 'الاسم مطلوب'),
  email: z.string().email('يرجى إدخال عنوان بريد إلكتروني صالح'),
  company: z.string().optional(),
  service: z.string().min(1, 'يرجى اختيار خدمة'),
  budget: z.string().min(1, 'يرجى اختيار نطاق الميزانية'),
  message: z.string().min(10, 'يرجى تقديم المزيد من التفاصيل حول مشروعك'),
  honeypot: z.string().max(0, 'تم اكتشاف روبوت'), // Hidden field for spam protection
});

type ContactFormData = z.infer<typeof contactSchema>;

const services = [
  'تصوير أزياء',
  'تصوير منتجات',
  'تصوير تجاري',
  'تصوير فعاليات',
  'تصوير بورتريه',
  'إنتاج فيديو',
  'أخرى',
];

const budgetRanges = [
  'أقل من 5,000 درهم',
  '5,000 - 10,000 درهم',
  '10,000 - 20,000 درهم',
  '20,000 - 50,000 درهم',
  'أكثر من 50,000 درهم',
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
    honeypot: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    try {
      contactSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      service: '',
      budget: '',
      message: '',
      honeypot: '',
    });
    setErrors({});
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send data to the API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.ok) {
        console.log('Form data:', formData);
        setFormSuccess(true);
        resetForm();
      } else {
        console.error('Form submission failed:', result.message);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (formSuccess) {
    return (
      <section id="contact-form" className="bg-bg-primary/95 p-8 lg:p-12" dir="rtl" lang="ar">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              تم إرسال الرسالة بنجاح!
            </h2>
            <p className="text-text-primary/80 mb-8">
              شكراً للتواصل معنا. سنرد عليك في أقرب وقت ممكن.
            </p>
            <Button onClick={() => setFormSuccess(false)}>
              إرسال رسالة أخرى
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact-form" className="bg-bg-primary/95 p-8 lg:p-12" dir="rtl" lang="ar">
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-heading font-cairo font-bold text-text-primary mb-8">
          احصل على عرض سعر
        </h2>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Honeypot field (hidden) */}
          <input
            name="honeypot"
            type="text"
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
            placeholder="اترك هذا الحقل فارغًا"
            value={formData.honeypot}
            onChange={handleChange}
          />

          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                الاسم الكامل *
              </label>
              <Input
                name="name"
                placeholder="أدخل اسمك الكامل"
                className={cn(errors.name && 'border-red-500')}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                البريد الإلكتروني *
              </label>
              <Input
                name="email"
                type="email"
                placeholder="your@email.com"
                className={cn(errors.email && 'border-red-500')}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              الشركة (اختياري)
            </label>
            <Input
              name="company"
              placeholder="اسم شركتك"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          {/* Service & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                الخدمة المطلوبة *
              </label>
              <select
                name="service"
                className={cn(
                  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                  'glass backdrop-blur-sm border-white/20 text-text-primary',
                  errors.service && 'border-red-500'
                )}
                value={formData.service}
                onChange={handleChange}
              >
                <option value="">اختر خدمة</option>
                {services.map((service) => (
                  <option key={service} value={service} className="bg-bg-primary">
                    {service}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="text-red-500 text-sm mt-1">{errors.service}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                نطاق الميزانية *
              </label>
              <select
                name="budget"
                className={cn(
                  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                  'glass backdrop-blur-sm border-white/20 text-text-primary',
                  errors.budget && 'border-red-500'
                )}
                value={formData.budget}
                onChange={handleChange}
              >
                <option value="">اختر نطاق الميزانية</option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range} className="bg-bg-primary">
                    {range}
                  </option>
                ))}
              </select>
              {errors.budget && (
                <p className="text-red-500 text-sm mt-1">{errors.budget}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              تفاصيل المشروع *
            </label>
            <Textarea
              name="message"
              placeholder="أخبرنا عن مشروعك، والجدول الزمني، وأي متطلبات محددة..."
              rows={6}
              className={cn(errors.message && 'border-red-500')}
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="w-full group"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-bg-primary border-t-transparent rounded-full animate-spin" />
                <span>جاري الإرسال...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>إرسال الرسالة</span>
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            )}
          </Button>

          {/* Privacy Note */}
          <p className="text-xs text-text-primary/60 text-center">
            بإرسال هذا النموذج، فإنك توافق على سياسة الخصوصية الخاصة بنا.
            لن نشارك معلوماتك أبدًا مع أطراف ثالثة.
          </p>
        </form>
      </motion.div>
    </section>
  );
}
