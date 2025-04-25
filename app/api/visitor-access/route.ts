import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Mark as edge function
export const runtime = 'edge';

// Simulated access token verification (in production, use proper JWT validation)
const validateAccessToken = (token: string): boolean => {
  return token.startsWith('VISITOR_');
};

export async function POST(request: Request) {
  try {
    const headersList = headers();
    const accessToken = headersList.get('authorization')?.replace('Bearer ', '');
    
    if (!accessToken || !validateAccessToken(accessToken)) {
      return NextResponse.json(
        { error: 'Invalid access token' },
        { status: 401 }
      );
    }

    const { visitorId, unitNumber, purpose, duration } = await request.json();

    // Validate required fields
    if (!visitorId || !unitNumber || !purpose || !duration) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate QR code data for access
    const accessCode = crypto.randomUUID();
    const expiryTime = new Date(Date.now() + duration * 60 * 60 * 1000); // duration in hours

    const accessDetails = {
      accessCode,
      visitorId,
      unitNumber,
      purpose,
      issuedAt: new Date().toISOString(),
      expiresAt: expiryTime.toISOString(),
      restrictions: {
        allowedAreas: ['lobby', `floor-${unitNumber.split('/')[0]}`, 'visitor-parking'],
        maxVisits: 1,
        requiresEscort: purpose === 'maintenance'
      }
    };

    // In production:
    // 1. Store access details in a database
    // 2. Send notification to unit owner
    // 3. Generate actual QR code
    // 4. Log access request

    return NextResponse.json({
      status: 'success',
      data: {
        ...accessDetails,
        qrCode: `https://api.stratamate.com/qr/${accessCode}` // Simulated QR code URL
      }
    }, {
      headers: {
        'Cache-Control': 'no-store',
        'X-Access-Expiry': expiryTime.toISOString()
      }
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process visitor access request' },
      { status: 500 }
    );
  }
} 