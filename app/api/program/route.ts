import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      include: {
        benefits: true,
        testimonials: true,
      }
    });

    return NextResponse.json({ data: programs });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
