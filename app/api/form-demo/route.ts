import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body
    const body = await request.json();

    // Validate the request body
    if (!body.name || !body.email) {
      // Return 400 Bad Request if required fields are missing
      return new NextResponse(
        JSON.stringify({ error: 'Name and email are required' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Process the form data (in a real app, you might save to a database here)
    console.log('Form submission:', body);

    // Demonstrate different response scenarios:

    // 1. Successful response with data
    if (body.redirect === 'success') {
      // Redirect to a success page
      return NextResponse.redirect(new URL('/form-demo/success', request.url));
    }

    // 2. Regular success response
    return NextResponse.json(
      { message: 'Form submitted successfully', data: body },
      { status: 201 }
    );

  } catch (error) {
    // Return 500 Internal Server Error for any server-side errors
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export async function GET(request: NextRequest) {
  // Get query parameters from the URL
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name');
  const email = searchParams.get('email');

  // Validate parameters
  if (!name || !email) {
    return new NextResponse(
      JSON.stringify({ error: 'Name and email are required' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // Return the data
  return NextResponse.json(
    {
      message: 'Data received successfully',
      data: { name, email }
    },
    { status: 200 }
  );
} 