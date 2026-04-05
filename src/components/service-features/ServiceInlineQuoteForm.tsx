import InlineQuotePanel from '@/components/shared/InlineQuotePanel';

interface ServiceInlineQuoteFormProps {
  serviceName: string;
}

export default function ServiceInlineQuoteForm({ serviceName }: ServiceInlineQuoteFormProps) {
  return (
    <InlineQuotePanel
      id="service-quote-form"
      eyebrow="Free Estimate"
      heading={`Price your ${serviceName.toLowerCase()} project without chasing anyone down`}
      body="Fill out the form and Red Stag will respond with a real scope conversation, not a vague autoresponder."
      bullets={[
        'Fast follow-up with scheduling and next steps.',
        'The service type is already selected so the form starts in the right place.',
      ]}
      initialService={serviceName}
      submitLabel="Get My Free Estimate"
    />
  );
}
