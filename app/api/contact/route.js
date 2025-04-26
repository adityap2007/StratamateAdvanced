import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';

export async function GET() {
  return NextResponse.json({ message: 'Contact form endpoint' });
}

export async function POST(request) {
  const prisma = await getDbConnection();
  
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

    await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
        createdAt: new Date()
      }
    });

    return NextResponse.json({
      success: "Thank you for your message! We'll get back to you soon."
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Sorry, there was an error submitting your message. Please try again later.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 