import './globals.css'

export const metadata = {
  title: 'Netflix Clone',
  description: 'A Netflix clone built with Next.js 14',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}