"use client"

import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import Head from 'next/head' // Import Next.js Head component
import "./globals.css"

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [seoData, setSeoData] = useState<any>(null)

  useEffect(() => {
    // Fetch SEO data from the API on component mount
    const fetchSeoData = async () => {
      try {
        const response = await fetch('/api/seo')
        const data = await response.json()
        if (data?.data) {
          setSeoData(data.data[0]) 
        }
      } catch (error) {
        console.error("Error fetching SEO data:", error)
      }
    }

    fetchSeoData()
  }, [])

  return (
    <>
      <html lang="en">
        <head>
          {seoData && (
            <>
              <title>{seoData.meta_title}</title>
              <meta name="description" content={seoData.meta_description} />
              <meta 
                name="keywords" 
                content={seoData.meta_keywords ? seoData.meta_keywords.split(',').join(", ") : ""} 
              />
              {/* ✅ OG Image को Meta Tag में रखो */}
              {seoData.og_images && (
                <meta property="og:image" content={seoData.og_images} />
              )}
              <meta property="og:title" content={seoData.og_title} />
              <link rel="canonical" href="https://www.sheconomy.in" />
            </>
          )}
        </head>

        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </>
  )
}
