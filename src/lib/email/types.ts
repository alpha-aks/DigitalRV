export type EmailType = 'quote' | 'contact' | 'support' | 'audit' | 'newsletter';

export interface EmailPayload {
  type: EmailType;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  service?: string;
  website?: string;
  ticketId?: string;
}

export interface EmailResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}
