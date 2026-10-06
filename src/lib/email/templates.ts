import type { EmailPayload } from './types';
import { NEXUS_REAL_LOGO_HORIZONTAL } from './logo-base64';

const BRAND_ORANGE = '#FF6A00';
const BRAND_BLUE = '#3134BF';
const BRAND_GRADIENT = 'linear-gradient(135deg, #FF6A00 0%, #FA8F21 35%, #3134BF 100%)';

/**
 * Common wrapper for modern Gen-Z styled emails
 */
function emailWrapper({
  title,
  preheader,
  badgeText,
  badgeBg = '#FFF4EB',
  badgeColor = '#FF6A00',
  zomatoQuote,
  zomatoSubquote,
  contentHtml,
  ctaText,
  ctaLink = 'https://nexussms.in/#contact',
  whatsappLink = 'https://wa.me/918355956799?text=Hi%20Nexus%20team,%20I%20just%20submitted%20a%20request%20on%20nexussms.in!',
}: {
  title: string;
  preheader: string;
  badgeText: string;
  badgeBg?: string;
  badgeColor?: string;
  zomatoQuote: string;
  zomatoSubquote: string;
  contentHtml: string;
  ctaText?: string;
  ctaLink?: string;
  whatsappLink?: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #F3F4F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1F2937;">
  <!-- Preview text -->
  <div style="display: none; max-height: 0px; overflow: hidden; opacity: 0; font-size: 1px; line-height: 1px;">
    ${preheader}
  </div>

  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F3F4F6; padding: 24px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #E5E7EB;">
          
          <!-- Top Gradient Accent Bar (Hero Colors: Orange -> Blue) -->
          <tr>
            <td style="height: 6px; background: ${BRAND_GRADIENT};"></td>
          </tr>

          <!-- Header Section with Real Official Nexus Logo -->
          <tr>
            <td style="padding: 26px 36px 18px 36px; background-color: #FFFFFF;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="vertical-align: middle;">
                    <a href="https://nexussms.in" target="_blank" style="text-decoration: none; display: inline-block;">
                      <img
                        src="${NEXUS_REAL_LOGO_HORIZONTAL}"
                        alt="Nexus"
                        width="154"
                        height="32"
                        style="display: block; width: 154px; height: 32px; object-fit: contain; border: 0; outline: none; text-decoration: none;"
                      />
                    </a>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="display: inline-block; padding: 6px 12px; background-color: #F3F4F6; border-radius: 20px; font-size: 11px; font-weight: 700; color: #4B5563; text-transform: uppercase; letter-spacing: 0.5px;">
                      98% Open Rate ⚡
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero Punchline / Zomato-style Callout Card -->
          <tr>
            <td style="padding: 0 36px 12px 36px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #FFF7ED 0%, #EFF6FF 100%); border: 1.5px dashed #CBD5E1; border-radius: 18px; padding: 20px 22px;">
                <tr>
                  <td>
                    <!-- Gen-Z Badge -->
                    <div style="display: inline-block; background-color: ${badgeBg}; color: ${badgeColor}; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 4px 10px; border-radius: 8px; margin-bottom: 10px;">
                      ${badgeText}
                    </div>
                    <!-- Zomato Punchy Headline -->
                    <div style="font-size: 20px; font-weight: 800; color: #0F172A; line-height: 1.3; margin-bottom: 6px;">
                      "${zomatoQuote}"
                    </div>
                    <!-- Zomato Sub-quote -->
                    <div style="font-size: 14px; font-weight: 500; color: #475569; line-height: 1.5;">
                      ${zomatoSubquote}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Dynamic Body Content -->
          <tr>
            <td style="padding: 16px 36px 28px 36px; line-height: 1.6; font-size: 15px; color: #374151;">
              ${contentHtml}

              <!-- Action CTA Buttons -->
              ${ctaText ? `
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 28px;">
                <tr>
                  <td align="center">
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center" style="border-radius: 14px; background: #111827;">
                          <a href="${ctaLink}" target="_blank" style="font-size: 15px; font-weight: 700; color: #FFFFFF; text-decoration: none; padding: 14px 28px; display: inline-block; border-radius: 14px;">
                            ${ctaText} →
                          </a>
                        </td>
                        <td width="12"></td>
                        <td align="center" style="border-radius: 14px; background: #25D366;">
                          <a href="${whatsappLink}" target="_blank" style="font-size: 15px; font-weight: 700; color: #FFFFFF; text-decoration: none; padding: 14px 22px; display: inline-block; border-radius: 14px;">
                            WhatsApp Us 💬
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              ` : ''}
            </td>
          </tr>

          <!-- Trust Badges (Website Hero Features) -->
          <tr>
            <td style="padding: 20px 36px; background-color: #FAF5FF; border-top: 1px solid #F3F4F6;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" width="33%" style="padding: 6px;">
                    <div style="font-size: 18px; font-weight: 800; color: ${BRAND_BLUE};">98%</div>
                    <div style="font-size: 11px; color: #6B7280; font-weight: 600;">Avg. Open Rate</div>
                  </td>
                  <td align="center" width="33%" style="padding: 6px; border-left: 1px solid #E5E7EB; border-right: 1px solid #E5E7EB;">
                    <div style="font-size: 18px; font-weight: 800; color: ${BRAND_ORANGE};">&lt; 3 Sec</div>
                    <div style="font-size: 11px; color: #6B7280; font-weight: 600;">Flash Delivery</div>
                  </td>
                  <td align="center" width="33%" style="padding: 6px;">
                    <div style="font-size: 18px; font-weight: 800; color: #10B981;">100%</div>
                    <div style="font-size: 11px; color: #6B7280; font-weight: 600;">DLT Compliant</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Information -->
          <tr>
            <td style="padding: 30px 36px; background-color: #111827; color: #9CA3AF; font-size: 12px; line-height: 1.6; text-align: center;">
              <div style="font-size: 14px; font-weight: 700; color: #FFFFFF; margin-bottom: 6px;">
                Nexus — High-Impact SMS Marketing
              </div>
              <p style="margin: 0 0 10px 0; color: #D1D5DB;">
                Nexus is a trade name of <strong>Avqenta Technologies LLP</strong>.
              </p>
              <p style="margin: 0 0 10px 0;">
                📍 Yash Apartment 32C7+63X, Shop no 3, Sector 22, Navi Mumbai, Maharashtra<br>
                📞 <a href="tel:+918355956799" style="color: #60A5FA; text-decoration: none;">+91 83559 56799</a> &nbsp;|&nbsp; 
                ✉️ <a href="mailto:no-reply@nexussms.in" style="color: #60A5FA; text-decoration: none;">no-reply@nexussms.in</a>
              </p>
              <div style="font-size: 11px; color: #9CA3AF; margin-bottom: 8px;">
                This automated notification was sent from <strong>no-reply@nexussms.in</strong>. Need help? Contact us at <a href="mailto:contact@nexussms.in" style="color: #60A5FA; text-decoration: underline;">contact@nexussms.in</a>.
              </div>
              <div style="padding-top: 10px; border-top: 1px solid #374151; font-size: 11px; color: #6B7280;">
                © 2026 Nexus. All rights reserved. • <a href="https://nexussms.in" style="color: #9CA3AF; text-decoration: underline;">nexussms.in</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * 1. QUOTE ACKNOWLEDGEMENT TEMPLATE (Client)
 */
export function getQuoteAcknowledgementEmail(payload: EmailPayload) {
  const zomatoQuote = "Socha SMS nahi aaya? Hum hai na! 📱⚡";
  const zomatoSubquote = "Cart mein samaan chhoota ho ya customer rootha ho — 160 characters mein sab settle kar denge!";

  const contentHtml = `
    <p style="font-size: 16px; margin-top: 0;">Hey <strong>${escapeHtml(payload.name)}</strong>! 👋</p>
    <p>
      Thank you for requesting an SMS growth quote with <strong>Nexus</strong>. Your request just landed in our war-room, and our SMS strategists are already reviewing your requirements.
    </p>

    <!-- Details Card -->
    <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 14px; padding: 18px 20px; margin: 20px 0;">
      <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748B; margin-bottom: 12px;">
        📋 Quote Request Summary
      </div>
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="35%" style="padding: 5px 0; font-size: 13px; color: #64748B;">Client Name:</td>
          <td style="padding: 5px 0; font-size: 14px; font-weight: 600; color: #0F172A;">${escapeHtml(payload.name)}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0; font-size: 13px; color: #64748B;">Email Address:</td>
          <td style="padding: 5px 0; font-size: 14px; font-weight: 600; color: #0F172A;">${escapeHtml(payload.email)}</td>
        </tr>
        ${payload.phone ? `
        <tr>
          <td style="padding: 5px 0; font-size: 13px; color: #64748B;">Contact Number:</td>
          <td style="padding: 5px 0; font-size: 14px; font-weight: 600; color: #0F172A;">${escapeHtml(payload.phone)}</td>
        </tr>
        ` : ''}
        ${payload.service ? `
        <tr>
          <td style="padding: 5px 0; font-size: 13px; color: #64748B;">Interested Service:</td>
          <td style="padding: 5px 0; font-size: 14px; font-weight: 600; color: #0F172A;">${escapeHtml(payload.service)}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 5px 0; font-size: 13px; color: #64748B; vertical-align: top;">Requirement / Note:</td>
          <td style="padding: 5px 0; font-size: 14px; color: #334155;">"${escapeHtml(payload.message || 'Custom Quote Request')}"</td>
        </tr>
      </table>
    </div>

    <div style="background-color: #FEF3C7; border-left: 4px solid #F59E0B; padding: 12px 16px; border-radius: 8px; font-size: 13px; color: #92400E; margin-bottom: 20px;">
      ⏳ <strong>What happens next?</strong> We are calculating the most cost-effective per-SMS volume tiers, DLT approval support, and ROI projections. Expect a detailed custom proposal in your inbox within <strong>2 business hours</strong>.
    </div>

    <p style="margin-bottom: 0; font-size: 14px; color: #6B7280;">
      Got urgent bulk broadcast volumes or a flash sale dropping today? Ping us directly on WhatsApp for instant 15-minute onboarding!
    </p>
  `;

  return emailWrapper({
    title: 'Quote Request Received — Nexus SMS',
    preheader: 'Socha SMS nahi aaya? Hum hai na! We have received your quote request.',
    badgeText: '🔥 QUOTE ENGINE INITIATED',
    badgeBg: '#FFF7ED',
    badgeColor: '#EA580C',
    zomatoQuote,
    zomatoSubquote,
    contentHtml,
    ctaText: 'View Pricing & Case Studies',
    ctaLink: 'https://nexussms.in/#cases',
  });
}

/**
 * 2. CONTACT / "SAY HI" ACKNOWLEDGEMENT TEMPLATE (Client)
 */
export function getContactAcknowledgementEmail(payload: EmailPayload) {
  const zomatoQuote = "Seen pe nahi chhodenge, pakka promise! 💬✨";
  const zomatoSubquote = "98% open rate humara sirf marketing claim nahi hai — inbox reply speed bhi wahi hai!";

  const contentHtml = `
    <p style="font-size: 16px; margin-top: 0;">Namaste <strong>${escapeHtml(payload.name)}</strong>! 🙏</p>
    <p>
      Your message just popped up on our screens. Whether you're curious about automated customer journeys, flash SMS broadcasting, or just wanted to talk shop, we're pumped to connect!
    </p>

    <!-- Message Summary Card -->
    <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 14px; padding: 18px 20px; margin: 20px 0;">
      <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748B; margin-bottom: 8px;">
        📬 Your Message to Nexus
      </div>
      <div style="font-size: 14px; color: #1E293B; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 10px; padding: 12px 14px; font-style: italic;">
        "${escapeHtml(payload.message || 'Hello Nexus!')}"
      </div>
    </div>

    <p>
      Our team is reviewing your note and will get back to you shortly. In the meantime, feel free to check out how our clients hit <strong>98% open rates</strong> and generate explosive ROI from mobile screens.
    </p>
  `;

  return emailWrapper({
    title: 'We Got Your Message! — Nexus',
    preheader: 'Seen pe nahi chhodenge, pakka promise! Nexus has received your message.',
    badgeText: '👋 MESSAGE DELIVERED',
    badgeBg: '#EFF6FF',
    badgeColor: '#2563EB',
    zomatoQuote,
    zomatoSubquote,
    contentHtml,
    ctaText: 'Explore Use Cases',
    ctaLink: 'https://nexussms.in/#cases',
  });
}

/**
 * 3. SUPPORT / HELP DESK ACKNOWLEDGEMENT TEMPLATE (Client)
 */
export function getSupportAcknowledgementEmail(payload: EmailPayload) {
  const ticketId = payload.ticketId || `NX-${Math.floor(100000 + Math.random() * 900000)}`;
  const zomatoQuote = "Network down ho sakta hai, humara support kabhi nahi! 🛡️⚡";
  const zomatoSubquote = "Bug ho ya bounce rate ka dukh — ticket resolve hone tak hum screen se nahi hilenge!";

  const contentHtml = `
    <p style="font-size: 16px; margin-top: 0;">Hi <strong>${escapeHtml(payload.name)}</strong>,</p>
    <p>
      We've logged your support request under ticket <strong>#${ticketId}</strong>. Our technical engineering & DLT compliance desk has been alerted.
    </p>

    <!-- Ticket Summary Card -->
    <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 14px; padding: 18px 20px; margin: 20px 0;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748B;">Support Ticket Details</span>
        <span style="background-color: #FEF2F2; color: #DC2626; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px;">Status: In Progress ⏱️</span>
      </div>
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="30%" style="padding: 4px 0; font-size: 13px; color: #64748B;">Ticket ID:</td>
          <td style="padding: 4px 0; font-size: 14px; font-weight: 700; color: #0F172A;">#${ticketId}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; font-size: 13px; color: #64748B;">Sender Email:</td>
          <td style="padding: 4px 0; font-size: 14px; font-weight: 600; color: #0F172A;">${escapeHtml(payload.email)}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; font-size: 13px; color: #64748B; vertical-align: top;">Issue / Inquiry:</td>
          <td style="padding: 4px 0; font-size: 14px; color: #334155;">"${escapeHtml(payload.message || 'Support inquiry')}"</td>
        </tr>
      </table>
    </div>

    <div style="background-color: #F0FDF4; border-left: 4px solid #16A34A; padding: 12px 16px; border-radius: 8px; font-size: 13px; color: #166534; margin-bottom: 16px;">
      ⚡ <strong>SLA Guarantee:</strong> Critical delivery & API inquiries are addressed within 15 to 30 minutes during active operating hours.
    </div>
  `;

  return emailWrapper({
    title: `[Support Ticket #${ticketId}] We're On It — Nexus`,
    preheader: `Ticket #${ticketId}: Network down ho sakta hai, humara support kabhi nahi!`,
    badgeText: `🛠️ TICKET #${ticketId} ACTIVE`,
    badgeBg: '#FEF2F2',
    badgeColor: '#DC2626',
    zomatoQuote,
    zomatoSubquote,
    contentHtml,
    ctaText: 'Visit Nexus Portal',
    ctaLink: 'https://nexussms.in',
  });
}

/**
 * 4. FREE AUDIT ACKNOWLEDGEMENT TEMPLATE
 */
export function getAuditAcknowledgementEmail(payload: EmailPayload) {
  const zomatoQuote = "Free audit maanga aur instant response mila? Yeh Nexus ka magic hai! 🎯✨";
  const zomatoSubquote = "Mobile screens se revenue generate karne ka secret audit tayyar ho raha hai!";

  const contentHtml = `
    <p style="font-size: 16px; margin-top: 0;">Hey <strong>${escapeHtml(payload.name)}</strong>! 🚀</p>
    <p>
      We received your audit request for <strong>${escapeHtml(payload.website || 'your website/brand')}</strong>!
    </p>
    <p>
      Our growth engineers are analyzing customer touchpoints, abandoned cart drop-offs, and SMS broadcast potential to craft your personalized conversion blueprint.
    </p>
    <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 14px; padding: 16px 20px; margin: 18px 0;">
      <div style="font-size: 13px; color: #475569;">
        🔍 Target Brand / URL: <strong>${escapeHtml(payload.website || 'Provided Brand')}</strong><br>
        📧 Delivery Email: <strong>${escapeHtml(payload.email)}</strong>
      </div>
    </div>
    <p>We'll deliver your comprehensive teardown within 24 hours.</p>
  `;

  return emailWrapper({
    title: 'Audit Request Confirmed — Nexus SMS',
    preheader: 'Your brand audit is in progress! 98% open rate blueprint arriving soon.',
    badgeText: '📊 AUDIT ENGINE RUNNING',
    badgeBg: '#F3E8FF',
    badgeColor: '#7C3AED',
    zomatoQuote,
    zomatoSubquote,
    contentHtml,
    ctaText: 'Learn About Our Process',
    ctaLink: 'https://nexussms.in/#process',
  });
}

/**
 * 5. INTERNAL ADMIN NOTIFICATION TEMPLATE (Sent to Nexus Team)
 */
export function getAdminNotificationEmail(payload: EmailPayload) {
  const typeTitles: Record<string, string> = {
    quote: '🚨 NEW HIGH-PRIORITY QUOTE REQUEST',
    contact: '💬 NEW CONTACT MESSAGE ("Say Hi")',
    support: '🛠️ NEW CUSTOMER SUPPORT TICKET',
    audit: '🎯 NEW AUDIT REQUEST',
    newsletter: '📰 NEW NEWSLETTER SUBSCRIBER',
  };

  const title = typeTitles[payload.type] || '📩 NEW INCOMING INQUIRY';
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #0F172A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #E2E8F0;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #1E293B; border-radius: 16px; border: 1px solid #334155; overflow: hidden;">
    <tr>
      <td style="height: 5px; background: ${BRAND_GRADIENT};"></td>
    </tr>
    <tr>
      <td style="padding: 24px;">
        <div style="margin-bottom: 16px;">
          <img src="${NEXUS_REAL_LOGO_HORIZONTAL}" alt="Nexus" width="144" height="30" style="display: block; width: 144px; height: 30px; object-fit: contain; border: 0;" />
        </div>
        <div style="display: inline-block; background-color: #38BDF8; color: #0C4A6E; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 6px; text-transform: uppercase; margin-bottom: 12px;">
          NEXUS INTERNAL ALERT
        </div>
        <h2 style="margin: 0 0 16px 0; color: #FFFFFF; font-size: 20px; font-weight: 800;">
          ${title}
        </h2>
        <div style="background-color: #0F172A; border-radius: 12px; padding: 18px; border: 1px solid #334155; margin-bottom: 20px;">
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td width="35%" style="padding: 6px 0; color: #94A3B8; font-size: 13px;">Lead Type:</td>
              <td style="padding: 6px 0; color: #F8FAFC; font-size: 14px; font-weight: 700; text-transform: uppercase;">${payload.type}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #94A3B8; font-size: 13px;">Name:</td>
              <td style="padding: 6px 0; color: #F8FAFC; font-size: 14px; font-weight: 600;">${escapeHtml(payload.name)}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #94A3B8; font-size: 13px;">Email:</td>
              <td style="padding: 6px 0; color: #38BDF8; font-size: 14px; font-weight: 600;">
                <a href="mailto:${escapeHtml(payload.email)}" style="color: #38BDF8; text-decoration: none;">${escapeHtml(payload.email)}</a>
              </td>
            </tr>
            ${payload.phone ? `
            <tr>
              <td style="padding: 6px 0; color: #94A3B8; font-size: 13px;">Phone:</td>
              <td style="padding: 6px 0; color: #4ADE80; font-size: 14px; font-weight: 700;">
                <a href="tel:${escapeHtml(payload.phone)}" style="color: #4ADE80; text-decoration: none;">${escapeHtml(payload.phone)}</a>
              </td>
            </tr>
            ` : ''}
            ${payload.service ? `
            <tr>
              <td style="padding: 6px 0; color: #94A3B8; font-size: 13px;">Service Requested:</td>
              <td style="padding: 6px 0; color: #F8FAFC; font-size: 14px;">${escapeHtml(payload.service)}</td>
            </tr>
            ` : ''}
            ${payload.website ? `
            <tr>
              <td style="padding: 6px 0; color: #94A3B8; font-size: 13px;">Website:</td>
              <td style="padding: 6px 0; color: #F8FAFC; font-size: 14px;">
                <a href="${escapeHtml(payload.website)}" target="_blank" style="color: #38BDF8;">${escapeHtml(payload.website)}</a>
              </td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 6px 0; color: #94A3B8; font-size: 13px; vertical-align: top;">Message:</td>
              <td style="padding: 6px 0; color: #E2E8F0; font-size: 14px; line-height: 1.5;">${escapeHtml(payload.message || 'N/A')}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #94A3B8; font-size: 13px;">Received At (IST):</td>
              <td style="padding: 6px 0; color: #94A3B8; font-size: 12px;">${timestamp}</td>
            </tr>
          </table>
        </div>

        <!-- Quick Action Buttons -->
        <table role="presentation" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td style="background-color: #2563EB; border-radius: 10px;">
              <a href="mailto:${escapeHtml(payload.email)}?subject=Re:%20Nexus%20SMS%20Inquiry%20from%20${encodeURIComponent(payload.name)}" style="display: inline-block; padding: 12px 20px; color: #FFFFFF; font-weight: 700; text-decoration: none; font-size: 14px;">
                Reply to ${escapeHtml(payload.name)} ✉️
              </a>
            </td>
            ${payload.phone ? `
            <td width="10"></td>
            <td style="background-color: #16A34A; border-radius: 10px;">
              <a href="https://wa.me/${encodeURIComponent(payload.phone.replace(/[^0-9]/g, ''))}?text=Hi%20${encodeURIComponent(payload.name)},%20this%20is%20Nexus%20SMS%20team!" target="_blank" style="display: inline-block; padding: 12px 20px; color: #FFFFFF; font-weight: 700; text-decoration: none; font-size: 14px;">
                WhatsApp Client 💬
              </a>
            </td>
            ` : ''}
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
