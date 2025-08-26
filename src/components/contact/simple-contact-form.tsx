'use client';

import { useState, FormEvent } from 'react';

export function SimpleContactForm() {
  // حالة النموذج
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // حالة الأخطاء
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // حالة الإرسال
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // التحقق من صحة النموذج
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'الاسم مطلوب ويجب أن يكون أكثر من حرفين';
    }
    
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'يرجى إدخال عنوان بريد إلكتروني صالح';
    }
    
    if (!formData.message || formData.message.length < 10) {
      newErrors.message = 'يرجى كتابة رسالة لا تقل عن 10 أحرف';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // معالجة تغيير الحقول
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // معالجة إرسال النموذج
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // التحقق من صحة النموذج
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setFormError('');
    
    try {
      // إرسال البيانات إلى API Route
      const response = await fetch('/api/contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // نجاح الإرسال
        setFormSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        // فشل الإرسال
        setFormError(result.message || 'حدث خطأ أثناء إرسال الرسالة');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormError('حدث خطأ أثناء إرسال الرسالة');
    } finally {
      setIsSubmitting(false);
    }
  };

  // عرض رسالة النجاح
  if (formSuccess) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md" dir="rtl" lang="ar">
        <div className="text-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 text-green-500 mx-auto mb-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            تم إرسال الرسالة بنجاح!
          </h2>
          <p className="text-gray-600 mb-8">
            شكراً للتواصل معنا. سنرد عليك في أقرب وقت ممكن.
          </p>
          <button 
            onClick={() => setFormSuccess(false)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            إرسال رسالة أخرى
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md" dir="rtl" lang="ar">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        تواصل معنا
      </h2>

      {formError && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* الاسم */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الاسم الكامل *
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="أدخل اسمك الكامل"
            className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* البريد الإلكتروني */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            البريد الإلكتروني *
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* الرسالة */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الرسالة *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="اكتب رسالتك هنا..."
            rows={6}
            className={`w-full px-3 py-2 border rounded-md ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        {/* زر الإرسال */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>جاري الإرسال...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <span>إرسال الرسالة</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
            </div>
          )}
        </button>

        {/* ملاحظة الخصوصية */}
        <p className="text-xs text-gray-500 text-center">
          بإرسال هذا النموذج، فإنك توافق على سياسة الخصوصية الخاصة بنا.
          لن نشارك معلوماتك أبدًا مع أطراف ثالثة.
        </p>
      </form>
    </div>
  );
}