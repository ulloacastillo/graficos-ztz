import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gráficos ZTZ',
  description:
    'Creación de gráficos de barras con imágenes; Hecho por Felipe López y Jorge Ulloa Castillo'
}

export default function RootLayout({ children }) {
  return (
    <html lang='es'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
