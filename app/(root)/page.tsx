import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import { getCurrentUser, getInterviewByUserId, getLatestInterviews } from '@/lib/actions/auth.action'
import Image from 'next/image'
import Link from 'next/link'
import React, { use } from 'react'

async function HomePage() {

  const user = await getCurrentUser();

  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewByUserId(user?.id!),
    await getLatestInterviews({ userId: user?.id! })
  ]);

  const hasPastInterviews = userInterviews?.length > 0;
  const hasUpcomingINterviews = latestInterviews?.length > 0

  // due to this one blocks another which means we cant perform both at once so we use upper layout/method
  // const userInterviews = await getInterviewByUserId(user?.id!);
  // const latestInterviews = await getLatestInterviews({userId: user?.id!})



  // const hasPastInterviews = userInterviews?.length > 0;

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


          {
            hasPastInterviews ? (
              userInterviews?.map((interview) => (
                <InterviewCard {...interview} key={interview.id} />
              ))
            ) : (
              <p className='text-gray-300'>
                You haven&apos;t taken any interviews{" "}
                <span className='underline text-gray-100 font-bold italic'>yet</span>
              </p>
            )
          }


        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>
          Take an Interview
        </h2>

        <div className="interviews-section">
        {
            hasUpcomingINterviews ? (
              latestInterviews?.map((interview) => (
                <InterviewCard {...interview} key={interview.id} />
              ))
            ) : (
              <p className='text-gray-300'>
                There are no interviews available yet.
                <span className='underline text-gray-100 font-bold italic'>yet</span>
              </p>
            )
          }
        </div>

      </section>

    </>
  )
}

export default HomePage