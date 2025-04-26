import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getDbConnection() {
  try {
    // Test the connection
    await prisma.$connect();
    return prisma;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

// Ensure proper cleanup
export async function closeDbConnection() {
  await prisma.$disconnect();
} 