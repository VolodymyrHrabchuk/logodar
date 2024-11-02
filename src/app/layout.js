import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className=' font-roboto'>
        <div className='relative min-h-screen bg-[#ebebeb] overflow-hidden'>
          {/* Blurred Circle Background */}
          <div
            className='absolute -top-[800px] md:-top-[400px] -right-[700px] md:right-0 w-[1241px] h-[1241px] bg-circle rounded-full blur-3xl'
            style={{ transform: "translateX(30%)" }}
          ></div>
          <Navbar />
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
