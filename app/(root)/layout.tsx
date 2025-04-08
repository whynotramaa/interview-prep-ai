import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode } from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='root-layout'>
      <nav>
        <Link href='/' className='flex items-center gap-2' >
          <Image src='/logo.svg' width={34} height={28} alt='logo' />
          <h3 className='text-primary-100'>
          Preperr
          </h3>
        </Link>
      </nav>

      {children}
    </div>
  )
}

export default RootLayout