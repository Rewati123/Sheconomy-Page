import { PrismaClient } from '@prisma/client'; // Import PrismaClient
import { NextResponse } from 'next/server';

// Instantiate PrismaClient
const prisma = new PrismaClient();

export async function GET(request) {
  try {
 
    const programs = await prisma.program.findMany({
      include: {
        benefits: true,
        testimonials: true 
      }
    });


    return NextResponse.json(programs);
  } catch (error) {
    console.error('Error fetching program data:', error);
    return NextResponse.json({ message: 'Error fetching program data' }, { status: 500 });
  } finally {
    
    await prisma.$disconnect();
  }
}
