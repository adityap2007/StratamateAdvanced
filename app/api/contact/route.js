import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';

export async function GET() {
  return NextResponse.json({ message: 'Contact form endpoint' });
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please fill in all fields' },
        { status: 400 }
      );
    }

    const pdo = await getDbConnection();
    const stmt = await pdo.prepare(
      'INSERT INTO contact_messages (name, email, message, created_at) VALUES (?, ?, ?, NOW())'
    );
    await stmt.execute([name, email, message]);

    return NextResponse.json({
      success: "Thank you for your message! We'll get back to you soon."
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Sorry, there was an error submitting your message. Please try again later.' },
      { status: 500 }
    );
  }
} 