import "./globals.css";
import "lenis/dist/lenis.css";
import { ReactLenis } from "@/utils/lenis";
import Footer from "@/components/Footer";
import Head from "next/head";

export const metadata = {
  title: "Логодар | Інноваційний реабілітаційний онлайн центр",
  description:
    "Відновлення мови та мовлення при тяжких порушеннях. Освітньо-тренінгові послуги для логопедів, терапевтів мови та мовлення, фахівців реабілітаційного напрямку, психологів.",
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "https://logodar.com.ua/",
    title: "Логодар | Інноваційний реабілітаційний онлайн центр",
    description:
      "Відновлення мови та мовлення при тяжких порушеннях. Освітньо-тренінгові послуги для логопедів, терапевтів мови та мовлення, фахівців реабілітаційного напрямку, психологів.",
    images: [
      {
        url: "https://logodar.com.ua/opengraph.jpg", // Absolute URL for production
        width: 1200,
        height: 630,
        alt: "Логодар | Інноваційний реабілітаційний онлайн центр",
      },
    ],
    siteName: "Логодар | Інноваційний реабілітаційний онлайн центр",
  },
  twitter: {
    card: "summary_large_image",
    title: "Логодар | Інноваційний реабілітаційний онлайн центр",
    description:
      "Відновлення мови та мовлення при тяжких порушеннях. Освітньо-тренінгові послуги для логопедів, терапевтів мови та мовлення, фахівців реабілітаційного напрямку, психологів.",
    images: ["https://logodar.com.ua/opengraph.jpg"], // Absolute URL for production
  },
  other: {
    "og:logo": "https://logodar.com.ua/opengraph.jpg", // Absolute URL for production
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='ua'>
      <Head>
        <link
          rel='icon'
          type='image/png'
          href='/favicon-96x96.png'
          sizes='96x96'
        />
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
        <link rel='shortcut icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
      </Head>
      <ReactLenis root>
        <body className=' font-roboto'>
          <div className='relative min-h-screen bg-[#ebebeb] overflow-hidden'>
            {/* Blurred Circle Background */}
            <div
              className='absolute -top-[800px] md:-top-[400px] -right-[700px] md:right-0 w-[1241px] h-[1241px] bg-circle rounded-full blur-3xl'
              style={{ transform: "translateX(30%)" }}
            ></div>

            <main>{children}</main>
          </div>
          <Footer />
          <div id='modal-root'></div>
        </body>
      </ReactLenis>
    </html>
  );
}
