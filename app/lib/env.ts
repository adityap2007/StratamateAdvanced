export const env = {
  // API
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',

  // Database
  databaseUrl: process.env.DATABASE_URL || 'default-connection-string',

  // Authentication
  authEnabled: process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true',
  authSecret: process.env.AUTH_SECRET || 'development-secret',

  // Email
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.example.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || 'default-user',
    password: process.env.SMTP_PASSWORD || 'default-password',
  },

  // Feature Flags
  maintenanceMode: process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true',
  enableNotifications: process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS === 'true',

  // Building Information
  building: {
    name: 'Strata Mate',
    contactEmail: 'contact@stratamate.com',
    address: '123 Strata Street, Sydney NSW 2000',
  },

  environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'development'
} as const;

// Development-only validation
if (process.env.NODE_ENV === 'development') {
  console.warn('Running in development mode - skipping strict environment validation');
} 