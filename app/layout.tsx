import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Asteroid',
  description: 'See the near-earth asteroids.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css" />
      </head>
      <body className={inter.className}>
      <div className="container">
        <header>
          <hgroup style={{ textAlign: "center", padding: "64px 0" }}>
            <h1>Asteroids</h1>
            <h2>See all asteroids close to earth through time.</h2>
          </hgroup>
        </header>
        {children}
      </div>
      </body>
    </html>
  )
}
