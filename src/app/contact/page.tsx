import { Metadata } from 'next';
import { ContactHero } from '@/components/contact/contact-hero';
import { ContactForm } from '@/components/contact/contact-form';
import { ContactInfo } from '@/components/contact/contact-info';
import { LocationMap } from '@/components/contact/location-map';

export const metadata: Metadata = {
  title: 'Contact Us | Get Your Photography Quote in 24h',
  description:
    'Contact El Rahama Photography for luxury photography services in Dubai. Get your personalized quote within 24 hours. Professional consultation available.',
  other: {
    keywords: 'contact photography Dubai, photography quote Dubai, hire photographer Dubai, luxury photography consultation, Dubai photography studio contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <ContactForm />
        <div className="space-y-0">
          <ContactInfo />
          <LocationMap />
        </div>
      </div>
    </>
  );
}
