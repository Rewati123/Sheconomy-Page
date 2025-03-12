import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: Request) {
  try {
    // Fetch all SEO data using Prisma
    const seoData = await prisma.seo.findMany({
      select: {
        id: true,
        meta_title: true,
        meta_description: true,
        meta_keywords: true,
        og_images: true,
        og_title: true,
        og_description: true,

      },
    })

    console.log("Prisma Query Result:", seoData)

    // Check if no data was found
    if (seoData.length === 0) {
      console.log("No SEO data found")
      return NextResponse.json(
        {
          error: "No SEO data found",
        },
        { status: 404 },
      )
    }

    // Return the SEO data
    return NextResponse.json({
      message: "SEO data fetched successfully",
      data: seoData,
    })
  } catch (error) {
    console.error("Error fetching SEO data:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

