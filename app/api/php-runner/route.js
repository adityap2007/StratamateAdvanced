import { exec } from 'child_process';
import path from 'path';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');
  
  if (!file) {
    return new Response('File parameter is required', { status: 400 });
  }

  const fullPath = path.join(process.cwd(), 'public', 'php', file);

  return new Promise((resolve, reject) => {
    exec(`php ${fullPath}`, (error, stdout, stderr) => {
      if (error) {
        resolve(new Response(`<pre>Error: ${stderr}</pre>`, { 
          status: 500,
          headers: { 'Content-Type': 'text/html' }
        }));
        return;
      }
      resolve(new Response(stdout, {
        headers: { 'Content-Type': 'text/html' }
      }));
    });
  });
}

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');
  
  if (!file) {
    return new Response('File parameter is required', { status: 400 });
  }

  const fullPath = path.join(process.cwd(), 'public', 'php', file);
  const body = await request.text();
  const formData = new URLSearchParams(body);

  return new Promise((resolve, reject) => {
    const env = {
      ...process.env,
      REQUEST_METHOD: 'POST',
      CONTENT_TYPE: 'application/x-www-form-urlencoded',
      QUERY_STRING: formData.toString()
    };

    exec(`php ${fullPath}`, { env }, (error, stdout, stderr) => {
      if (error) {
        resolve(new Response(`<pre>Error: ${stderr}</pre>`, { 
          status: 500,
          headers: { 'Content-Type': 'text/html' }
        }));
        return;
      }
      resolve(new Response(stdout, {
        headers: { 'Content-Type': 'text/html' }
      }));
    });
  });
} 