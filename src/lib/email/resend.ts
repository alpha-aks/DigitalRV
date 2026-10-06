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
  const envKey =
    (typeof process !== 'undefined' ? process.env?.RESEND_API_KEY : undefined) ||
    (typeof import.meta !== 'undefined' ? import.meta.env?.RESEND_API_KEY : undefined);
  return envKey?.trim();
}

function getFromEmail(): string {
  const envFrom =
    (typeof process !== 'undefined' ? process.env?.RESEND_FROM_EMAIL : undefined) ||
    (typeof import.meta !== 'undefined' ? import.meta.env?.RESEND_FROM_EMAIL : undefined);
  return (envFrom && envFrom.trim()) ? envFrom.trim() : 'Nexus <onboarding@resend.dev>';
}

function getAdminEmail(): string {
  const envTo =
    (typeof process !== 'undefined' ? process.env?.RESEND_TO_EMAIL : undefined) ||
    (typeof import.meta !== 'undefined' ? import.meta.env?.RESEND_TO_EMAIL : undefined);
  return (envTo && envTo.trim()) ? envTo.trim() : 'contact@nexussms.in';
}

export async function sendEmailWorkflow(payload: EmailPayload): Promise<EmailResult> {
  const apiKey = getApiKey();
  let fromEmail = getFromEmail();
  const adminEmail = getAdminEmail();

  // If no API key configured yet, return explicit error
  if (!apiKey || apiKey === 're_your_api_key_here') {
    const errorMsg =
      'RESEND_API_KEY is missing or unconfigured. Please add your live Resend API key (starts with "re_") to your .env file or Vercel Environment Variables.';
    console.error(`[Resend Error] ${errorMsg}`);
    return {
      success: false,
      message: errorMsg,
      error: 'MISSING_RESEND_API_KEY',
    };
  }

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

  try {
    const resend = new Resend(apiKey);

    // Helper to send email with auto-fallback to onboarding@resend.dev if custom domain is unverified
    async function sendWithFallback(params: {
      from: string;
      to: string;
      subject: string;
      html: string;
      replyTo?: string;
    }) {
      let result = await resend.emails.send({
        from: params.from,
        to: params.to,
        subject: params.subject,
        html: params.html,
        replyTo: params.replyTo,
      });

      // If domain verification error, fallback immediately to onboarding@resend.dev
      if (
        result.error &&
        (result.error.message?.toLowerCase().includes('domain') ||
          result.error.message?.toLowerCase().includes('verify') ||
          result.error.message?.toLowerCase().includes('forbidden')) &&
        params.from !== 'Nexus <onboarding@resend.dev>'
      ) {
        console.warn(
          `[Resend Notice] Sender '${params.from}' not yet verified. Falling back to 'Nexus <onboarding@resend.dev>'...`
        );
        result = await resend.emails.send({
          from: 'Nexus <onboarding@resend.dev>',
          to: params.to,
          subject: params.subject,
          html: params.html,
          replyTo: params.replyTo,
        });
      }

      return result;
    }

    // 1. Dispatch Admin Alert
    const adminRes = await sendWithFallback({
      from: fromEmail,
      to: adminEmail,
      subject: adminSubject,
      html: adminHtml,
      replyTo: payload.email,
    });

    // 2. Dispatch User Acknowledgement (if valid email provided)
    let userRes: any = null;
    if (payload.email && payload.email.includes('@')) {
      userRes = await sendWithFallback({
        from: fromEmail,
        to: payload.email,
        subject: userSubject,
        html: userHtml,
        replyTo: adminEmail,
      });
    }

    // Check if BOTH failed
    if (adminRes.error && (!userRes || userRes.error)) {
      const errDetail = adminRes.error.message || userRes?.error?.message || 'Failed to dispatch email';
      console.error('[Resend Dispatch Failed]', { adminError: adminRes.error, userError: userRes?.error });
      return {
        success: false,
        message: errDetail,
        error: String(errDetail),
      };
    }

    // At least one succeeded
    const isFullSuccess = !adminRes.error && (!userRes || !userRes.error);
    const notice = adminRes.error?.message || userRes?.error?.message;

    return {
      success: true,
      message: isFullSuccess
        ? 'Email dispatched successfully!'
        : `Notification sent! (Note: ${notice})`,
      data: {
        adminId: adminRes.data?.id,
        userId: userRes?.data?.id,
        adminError: adminRes.error?.message,
        userError: userRes?.error?.message,
      },
    };
  } catch (err: any) {
    console.error('[Resend Fatal Exception]', err);
    return {
      success: false,
      message: err?.message || 'Error occurred while communicating with Resend',
      error: String(err),
    };
  }
}
