import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function HomePage() {
  return (
    <>
    
    <section className='card-cta'>
      <div className="flex flex-col gap-6 max-w-lg">
<h2>
  Get Interview ready with AI powered practice and feedback
</h2>

<p className="text-lg">
  Practice on real interview questions asked by AI itself.
</p>
<Button asChild className='btn-primary max-sm:w-full'>
  <Link href='/interview'>
    Start an Interview
  </Link>
</Button>
      </div>
      <Image src='/robot.png' alt='chitti-the-roboo' width={400} height={400} className='max-sm:hidden' />
    </section>

    <section className="flex flex-col gap-6 mt-8">
      <h2>Your Interviews</h2>
      <div className="interviews-section">
        {/* <p className='text-gray-300'>
          You haven&apos;t taken any interviews <span className='underline text-gray-100 font-bold italic'>yet</span>
        </p> */}
        {dummyInterviews.map((interview)=>(
          <InterviewCard {...interview} key={interview.id}/>
        ))}
      
      </div>
    </section>

    <section className="flex flex-col gap-6 mt-8">
      <h2>
        Take an Interview
      </h2>

      <div className="interviews-section">
        {dummyInterviews.map((interview)=>(
          <InterviewCard {...interview} key={interview.id}/>
        ))}
      </div>

    </section>

    </>
  )
}

export default HomePage