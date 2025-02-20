import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
   
    const programs = await prisma.program.findMany({
      include: {
        benefits: true,
        testimonials: true,
      },
    });

    console.log("Fetched Programs:", programs); 

   
    if (!programs || programs.length === 0) {
      return NextResponse.json({ message: 'No program data found' }, { status: 404 });
    }

    return NextResponse.json({ data: programs });
  } catch (error: any) {
    console.error('Error fetching program data:', error);

   
    let errorMessage = "Unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "object" && error !== null) {
      errorMessage = JSON.stringify(error);
    }

    return NextResponse.json(
      { message: 'Error fetching program data', error: errorMessage },
      { status: 500 }
    );
  } finally {
  
    await prisma.$disconnect();
  }
}
