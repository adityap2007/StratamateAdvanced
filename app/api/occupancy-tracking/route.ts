import { NextResponse } from 'next/server';

// Mark as edge function
export const runtime = 'edge';

// In-memory cache simulation (in production, use Redis or similar)
let occupancyCache = new Map();

export async function POST(request: Request) {
  try {
    const { areaId, action, deviceId } = await request.json();

    // Validate input
    if (!areaId || !['enter', 'exit'].includes(action) || !deviceId) {
      return NextResponse.json(
        { error: 'Invalid input parameters' },
        { status: 400 }
      );
    }

    // Get current count for area
    const currentCount = occupancyCache.get(areaId) || 0;

    // Update count based on action
    const newCount = action === 'enter' ? currentCount + 1 : Math.max(0, currentCount - 1);
    occupancyCache.set(areaId, newCount);

    // Calculate occupancy percentage (assuming max capacity of 100 per area)
    const occupancyPercentage = (newCount / 100) * 100;

    // Determine status based on occupancy
    let status = 'normal';
    if (occupancyPercentage >= 90) status = 'critical';
    else if (occupancyPercentage >= 75) status = 'warning';

    const response = {
      areaId,
      currentOccupancy: newCount,
      occupancyPercentage: Math.round(occupancyPercentage),
      status,
      timestamp: new Date().toISOString(),
      lastAction: {
        type: action,
        deviceId,
      }
    };

    // Add warning header if occupancy is high
    const headers: HeadersInit = {
      'Cache-Control': 'no-store',
    };
    
    if (status !== 'normal') {
      headers['X-Occupancy-Warning'] = status;
    }

    return NextResponse.json({
      status: 'success',
      data: response
    }, { headers });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update occupancy' },
      { status: 500 }
    );
  }
} 