import { getRandomInterviewCover } from "@/lib/utils";
import dayjs from "dayjs";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import DisplayTechIcons from "./DisplayTechIcons";
const InterviewCard = ({ interviewId, userId, role, type, techstack, createdAt }: InterviewCardProps) => {
    const Feedback = null as Feedback | null

    const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;  //checks if user has written mix of __ if yes it just returns mixed

    const formattedDate = dayjs(Feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY')

    return (
        <div className="card-border w-[360px] max-sm:w-full min-h-96">
            <div className="card-interview">
                <div>
                    <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
                        <p className="badge-text">
                            {normalizedType}
                        </p>
                    </div>

                    <Image src={getRandomInterviewCover()} alt="Company Profile" width={90} height={90} className="rounded-full object-fit size-[90px]" />

                    <h3 className="mt-5 capitalize">
                        {role} interview
                    </h3>

                    <div className="flex flex-row gap-5 mt-3">
                        <div className="flex flex-row gap-2">
                            <Image src="/calendar.svg" alt="calendar" width={22} height={22} />
                            <p>{formattedDate}</p>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <Image src="/star.svg" alt="star" width={22} height={22} />
                            <p>
                                {Feedback?.totalScore || "---"}/100
                            </p>
                        </div>
                    </div>
                    <p className="line-clamp-2 mt-5">
                        {Feedback?.finalAssessment || "You havent taken the interview yet. Take the interview NOW to ace your interview."}
                    </p>

                    <div className="flex flex-row justify-between mt-7">

                        <DisplayTechIcons techStack={techstack} /> 

                        <Button className="btn-primary">
                            <Link href={Feedback ?
                                `/interview/${interviewId}/feedback`
                                : `/interview/${interviewId}`
                            }>
                                {Feedback ? 'Check feedback' : 'View Interview'}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InterviewCard