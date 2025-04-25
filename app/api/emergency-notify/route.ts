import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Mark as edge function
export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const headersList = headers();
    const userLocation = headersList.get('x-vercel-ip-city') || 'unknown';
    const userCountry = headersList.get('x-vercel-ip-country') || 'unknown';
    
    const { type, message, buildingSection } = await request.json();

    // Validate emergency type
    const validTypes = ['fire', 'security', 'maintenance', 'natural-disaster'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid emergency type' },
        { status: 400 }
      );
    }

    // Geolocation-based priority routing
    const priority = type === 'fire' || type === 'natural-disaster' ? 'critical' : 'high';
    
    const notification = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      type,
      message,
      buildingSection,
      location: {
        city: userLocation,
        country: userCountry
      },
      priority,
      status: 'active'
    };

    // In a real app, you would:
    // 1. Push to a real-time notification service
    // 2. Trigger emergency response systems
    // 3. Alert relevant authorities based on type

    return NextResponse.json({
      status: 'success',
      data: notification
    }, {
      headers: {
        'Cache-Control': 'no-store',
        'X-Emergency-Priority': priority
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process emergency notification' },
      { status: 500 }
    );
  }
} 