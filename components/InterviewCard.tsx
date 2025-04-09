"use client";

import { useEffect, useMemo, useState } from "react";
import { getRandomInterviewCover, TechIconData } from "@/lib/utils"; // Assuming TechIconData is exported from utils or defined here/imported
import dayjs from "dayjs";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import DisplayTechIcons from "./DisplayTechIcons"; // Import the modified component

// Define the shape of the icon data if not imported
// interface TechIconData {
//   tech: string;
//   url: string;
// }

// Update props for InterviewCard
interface InterviewCardProps {
  id: string;
  role: string;
  type?: string; // Keep default
  techstack?: string[]; // You might keep this if needed for other reasons
  techIcons: TechIconData[]; // <<<--- Add this prop to receive fetched icons
  createdAt: string | Date;
  Feedback?: Feedback | null; // Assuming Feedback type exists
}


const InterviewCard = ({
    id,
    role,
    type = "technical",
    // techstack = [], // Keep if needed elsewhere, remove if only for icons
    techIcons = [], // <<<--- Use the new prop, provide default empty array
    createdAt,
    Feedback = null, // Provide default for Feedback too
  }: InterviewCardProps) => { // <<<--- Update props destructuring

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const [formattedDate, setFormattedDate] = useState("");

  const interviewCover = useMemo(() => getRandomInterviewCover(), []);

  useEffect(() => {
    const dateToFormat = Feedback?.createdAt || createdAt || new Date();
    setFormattedDate(dayjs(dateToFormat).format("MMM D, YYYY"));
  }, [Feedback?.createdAt, createdAt]);

  // No need for this check if parent ensures createdAt is always present
  // if (!formattedDate) return null;

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          {/* ... (rest of the card content remains the same) ... */}
          <Image
            src={interviewCover}
            alt="Company Profile"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />

          <h3 className="mt-5 capitalize">{role} interview</h3>

          <div className="flex flex-row gap-5 mt-3">
             {/* ... date and score ... */}
             <div className="flex flex-row gap-2">
              <Image src="/calendar.svg" alt="calendar" width={22} height={22} />
              <p>{formattedDate || 'Date N/A'}</p> {/* Handle case where date might still be calculating */}
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Image src="/star.svg" alt="star" width={22} height={22} />
              <p>{Feedback?.totalScore || "---"}/100</p>
            </div>
          </div>

          <p className="line-clamp-2 mt-5">
            {Feedback?.finalAssessment || "You haven't taken the interview yet. Take the interview NOW to ace your interview."}
          </p>

          <div className="flex flex-row justify-between mt-7">
            {/* Pass the techIcons data to DisplayTechIcons */}
            <DisplayTechIcons icons={techIcons} />

            <Button className="btn-primary">
              <Link href={Feedback ? `/interview/${id}/feedback` : `/interview/${id}`}>
                {Feedback ? "View Feedback" : "Take Interview"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;