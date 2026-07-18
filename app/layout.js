import './globals.css'

export const metadata = {
  title: 'RUMMAN.OS // Neural Operating System',
  description: 'Enter the AI operating system of Rumman Khan — AI Business Analyst, Automation Engineer & ML Developer. A cinematic cyberpunk portfolio experience.',
  keywords: 'Rumman Khan, AI Portfolio, Cyberpunk Portfolio, Machine Learning, Automation Engineer',
  openGraph: {
    title: 'RUMMAN.OS',
    description: 'Enter the neural network of Rumman Khan.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&family=JetBrains+Mono:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-black text-cyan-100 overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
