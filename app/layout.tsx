import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// ✅ generateMetadata() function में API से SEO data fetch करो
export async function generateMetadata(): Promise<Metadata> {
  try {
    // 🌍 Absolute URL (Backend API URL from .env)
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://learning.sheconomy.in/program"; 
    
    const response = await fetch(`${API_URL}/api/seo`, {
      cache: "no-store", // 🚀 Real-time fresh data
    });

    if (!response.ok) throw new Error("Failed to fetch SEO data");

    const data = await response.json();

    if (data?.data?.length > 0) {
      const seoData = data.data[0];

      return {
        title: seoData.meta_title || "Sheconomy - Empowering Women",
        description:
          seoData.meta_description || "Sheconomy - Empowering Women Entrepreneurs",
        keywords: seoData.meta_keywords
          ? seoData.meta_keywords.split(",").join(", ")
          : "business, women, empowerment",
        openGraph: {
          title: seoData.og_title || "Sheconomy",
          description: seoData.og_description || "Empowering Women Entrepreneurs",
          images: seoData.og_images ? [{ url: seoData.og_images }] : [],
        },
        alternates: {
          canonical: "https://www.sheconomy.in",
        },
      };
    }
  } catch (error) {
    console.error("❌ Error fetching SEO data:", error);
  }

  // ✅ Default Metadata (अगर API से कुछ ना मिले)
  return {
    title: "Sheconomy - Empowering Women",
    description: "Sheconomy - Empowering Women Entrepreneurs",
    keywords: "business, women, empowerment",
    openGraph: {
      title: "Sheconomy",
      description: "Empowering Women Entrepreneurs",
      images: [],
    },
    alternates: {
      canonical: "https://www.sheconomy.in",
    },
  };
}

// ✅ Root Layout Component
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
