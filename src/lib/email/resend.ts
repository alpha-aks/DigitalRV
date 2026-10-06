import { Resend } from 'resend';
import type { EmailPayload, EmailResult } from './types';
import {
  getQuoteAcknowledgementEmail,
  getContactAcknowledgementEmail,
  getSupportAcknowledgementEmail,
  getAuditAcknowledgementEmail,
  getAdminNotificationEmail,
} from './templates';

// Retrieve environment variables with fallback
function getApiKey(): string | undefined {
  return (
    import.meta.env.RESEND_API_KEY ||
    (typeof process !== 'undefined' ? process.env?.RESEND_API_KEY : undefined)
  );
}

function getFromEmail(): string {
  return (
    import.meta.env.RESEND_FROM_EMAIL ||
    (typeof process !== 'undefined' ? process.env?.RESEND_FROM_EMAIL : undefined) ||
    'Nexus <no-reply@nexussms.in>'
  );
}

function getAdminEmail(): string {
  return (
    import.meta.env.RESEND_TO_EMAIL ||
    (typeof process !== 'undefined' ? process.env?.RESEND_TO_EMAIL : undefined) ||
    'contact@nexussms.in'
  );
}

export async function sendEmailWorkflow(payload: EmailPayload): Promise<EmailResult> {
  const apiKey = getApiKey();
  const fromEmail = getFromEmail();
  const adminEmail = getAdminEmail();

  // Determine user acknowledgement subject and html
  let userSubject = 'Nexus — We Received Your Request';
  let userHtml = '';

  switch (payload.type) {
    case 'quote':
      userSubject = '⚡ "Socha SMS nahi aaya? Hum hai na!" — Nexus Quote Request';
      userHtml = getQuoteAcknowledgementEmail(payload);
      break;
    case 'contact':
      userSubject = '💬 "Seen pe nahi chhodenge!" — Nexus Received Your Message';
      userHtml = getContactAcknowledgementEmail(payload);
      break;
    case 'support':
      const ticketId = payload.ticketId || `NX-${Math.floor(100000 + Math.random() * 900000)}`;
      payload.ticketId = ticketId;
      userSubject = `🛡️ [Ticket #${ticketId}] Nexus Support: We're on it!`;
      userHtml = getSupportAcknowledgementEmail(payload);
      break;
    case 'audit':
      userSubject = '🎯 Nexus Free SMS & Retention Audit Initiated';
      userHtml = getAuditAcknowledgementEmail(payload);
      break;
    case 'newsletter':
      userSubject = '🚀 Welcome to Nexus SMS Insider Broadcast!';
      userHtml = getContactAcknowledgementEmail({
        ...payload,
        name: payload.name || 'Subscriber',
        message: 'Thank you for subscribing to Nexus SMS trends and conversion insights.',
      });
      break;
    default:
      userSubject = 'Nexus Notification';
      userHtml = getContactAcknowledgementEmail(payload);
  }

  const adminSubject = `[Nexus Alert] New ${payload.type.toUpperCase()} from ${payload.name || payload.email}`;
  const adminHtml = getAdminNotificationEmail(payload);

  // If no API key configured yet, simulate gracefully for development
  if (!apiKey || apiKey === 're_your_api_key_here') {
    console.warn(
      `[Resend Simulation Mode] No RESEND_API_KEY detected in .env. Simulating email dispatch:`,
      {
        userEmail: payload.email,
        adminEmail,
        type: payload.type,
      }
    );
    return {
      success: true,
      message: 'Request processed! (Resend simulation mode active - add RESEND_API_KEY to send live emails).',
    };
  }

  try {
    const resend = new Resend(apiKey);

    // 1. Send Acknowledgement to User (if user provided valid email)
    const userPromise = payload.email
      ? resend.emails.send({
          from: fromEmail,
          to: payload.email,
          subject: userSubject,
          html: userHtml,
        })
      : Promise.resolve(null);

    // 2. Send Alert Notification to Admin
    const adminPromise = resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      replyTo: payload.email,
      subject: adminSubject,
      html: adminHtml,
    });

    const [userRes, adminRes] = await Promise.allSettled([userPromise, adminPromise]);

    const adminFailed = adminRes.status === 'rejected';
    const userFailed = userRes.status === 'rejected';

    if (adminFailed && userFailed) {
      console.error('[Resend Error]', { adminRes, userRes });
      return {
        success: false,
        message: 'Failed to dispatch emails via Resend.',
        error: String((adminRes as PromiseRejectedResult).reason),
      };
    }

    return {
      success: true,
      message: 'Email notifications sent successfully via Resend!',
      data: {
        userStatus: userRes.status,
        adminStatus: adminRes.status,
      },
    };
  } catch (err: any) {
    console.error('[Resend Exception]', err);
    return {
      success: false,
      message: err?.message || 'Error occurred while contacting Resend API',
      error: String(err),
    };
  }
}
