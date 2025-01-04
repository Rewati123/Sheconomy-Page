
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'
import "./globals.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SHEconomy Women in Digital Startup Program',
  description: 'Empowering women entrepreneurs in the tech industry',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

