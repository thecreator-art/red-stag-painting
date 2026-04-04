export interface Service {
  name: string;
  slug: string;
}

export interface City {
  name: string;
  slug: string;
}

export interface Project {
  afterImage: string;
  beforeImage: string;
  serviceType: string;
  city: string;
  description: string;
  review?: {
    text: string;
    author: string;
    city: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type ServiceCalculatorType = 'interior' | 'exterior' | 'cabinet' | 'popcorn' | 'stucco' | 'ceiling' | 'garage' | 'wooddeck';

export interface PricingOption {
  label: string;
  min: number;
  max: number;
  plus?: boolean;
}

export interface PricingCategory {
  options: PricingOption[];
}

export interface ComparisonRow {
  feature: string;
  otherPainters: string;
  redStag: string;
}

// Global window extension for color visualizer → contact form handoff
declare global {
  interface Window {
    __selectedColor?: string;
  }
}
