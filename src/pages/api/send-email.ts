import type { APIRoute } from 'astro';
import { sendEmailWorkflow } from '../../lib/email/resend';
import type { EmailPayload } from '../../lib/email/types';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    let payload: Partial<EmailPayload> = {};

    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      payload = await request.json();
    } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      payload = {
        name: (formData.get('name') as string) || '',
        email: (formData.get('email') as string) || '',
        phone: (formData.get('phone') as string) || '',
        message: (formData.get('message') as string) || '',
        service: (formData.get('service') as string) || '',
        website: (formData.get('website') as string) || '',
        type: ((formData.get('type') as string) || 'contact') as any,
      };
    } else {
      return new Response(
        JSON.stringify({ success: false, message: 'Unsupported Content-Type' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Basic validation
    if (!payload.email || !payload.email.includes('@')) {
      return new Response(
        JSON.stringify({ success: false, message: 'A valid email address is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!payload.name) {
      payload.name = payload.email.split('@')[0] || 'Friend';
    }

    const type = payload.type || 'contact';
    const emailData: EmailPayload = {
      type,
      name: payload.name,
      email: payload.email,
      phone: payload.phone || undefined,
      message: payload.message || undefined,
      service: payload.service || undefined,
      website: payload.website || undefined,
    };

    const result = await sendEmailWorkflow(emailData);

    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('API Error in /api/send-email:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error?.message || 'Internal server error while processing email request.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
