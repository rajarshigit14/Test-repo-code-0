import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movie App using Next.js',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
       <nav className='px-10 py-5 bg-nav'>
          <Link prefetch href="/" className="text-xl font-bold text-white">
            Cine Collective <span className='text-teal-400'>Critiques</span>
          </Link>
          <button className=" ml-5 mr-5 mb-2 float-right text-white
        bg-teal-600 hover:bg-teal-700 md:text-xs p-2 
          rounded-full cursor-pointer">Connect Wallet</button>
       </nav>
        {children}</body>
    </html>
  )
}
