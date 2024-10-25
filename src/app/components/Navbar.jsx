import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className='relative z-10 py-4 px-2 lg:px-20 flex items-center justify-between'>
      {/* Logo */}
      <div className='text-orange font-bold text-2xl'>
        <Link href='/' className='flex items-center'>
          <Image
            src='/logo.svg'
            alt='Logo'
            width={40}
            height={40}
            className='h-14 w-14'
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className='hidden lg:flex space-x-14 text-gray-700'>
        <Link href='/' className='hover:text-gray-900 transition'>
          Home
        </Link>
        <Link href='/pages' className='hover:text-gray-900 transition'>
          Pages
        </Link>
        <Link href='/services' className='hover:text-gray-900 transition'>
          Services
        </Link>
        <Link href='/blog' className='hover:text-gray-900 transition'>
          Blog
        </Link>
      </div>

      {/* Action Buttons */}
      <div className='flex items-center space-x-4'>
        <button className='hidden lg:inline-block border-2 text-md border-orange text-black px-6 py-2 rounded-md hover:bg-orange hover:text-white transition'>
          MAKE APPOINTMENT
        </button>
        <button className='text-gray-700 hover:text-gray-900 transition'>
          <FaSearch size={16} />
        </button>
      </div>
    </nav>
  );
}
