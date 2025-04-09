import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

// Define the shape of the icon data it expects
interface TechIconData {
  tech: string;
  url: string;
}

// Update props definition
interface DisplayTechIconsProps {
  icons: TechIconData[]; // Expects the already fetched icons
}

// Remove 'async'
const DisplayTechIcons = ({ icons }: DisplayTechIconsProps) => {
  // No need to fetch here, icons are passed in
  if (!icons || icons.length === 0) {
    return null; // Or return some placeholder if needed
  }

  return (
    <div className='flex flex-row'>
      {/* Use the passed 'icons' prop directly */}
      {icons.slice(0, 3).map(({ tech, url }, index) => (
        <div key={tech} className={cn('relative group bg-dark-300 rounded-full p-2 flex-center', index >= 1 && '-ml-3')}>
          <span className='tech-tooltip'>
            {tech}
          </span>
          <Image src={url} alt={tech} width={100} height={100} className='size-5' />
        </div>
      ))}
    </div>
  )
}

export default DisplayTechIcons