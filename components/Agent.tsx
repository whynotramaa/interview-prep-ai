'use client';

import { cn } from '@/lib/utils';
import { vapi } from '@/lib/vapi.sdk';
import { error } from 'console';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


enum CallStatus {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
    CONNECTING = 'CONNECTING',
    FINISHED = 'FINISHED',
}

interface SavedMessage {
    role: 'user' | 'system' | 'assistant';
    content: string;
}

const Agent = ({ userName, userId, type }: AgentProps) => {
    const router = useRouter()
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);

    const [messages, setMessages] = useState<SavedMessage[]>([]);

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
        const onMessage = (message: Message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = { role: message.role, content: message.transcript }

                setMessages((prev) => [...prev, newMessage]);

            }
        }

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);

        const onError = (error: Error) => console.log("Error", error);

        vapi.on('call-start', onCallStart)
        vapi.on('call-end', onCallEnd)
        vapi.on('message', onMessage)
        vapi.on('speech-start', onSpeechStart)
        vapi.on('speech-end', onSpeechEnd)
        vapi.on('error', onError)

        return()=>{
            vapi.on('call-start', onCallStart)
        vapi.off('call-end', onCallEnd)
        vapi.off('message', onMessage)
        vapi.off('speech-start', onSpeechStart)
        vapi.off('speech-end', onSpeechEnd)
        vapi.off('error', onError)
        }

    }, [])

    useEffect(()=>{
            if(callStatus===CallStatus.FINISHED) router.push('/')
    },[messages, callStatus, type, userId])

    const handleCall = async()=>{
        setCallStatus(CallStatus.CONNECTING);

        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
            variableValues:{
                username: userName,
                userid: userId,
            }
        })
    }


    const handleDisconnect = async()=>{
        setCallStatus(CallStatus.FINISHED)

        vapi.stop()
    }

    const latestMessages = messages[messages.length - 1]?.content;

    const isCallInactiveOrFinished = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

    

    return (
        <>
            <div className='call-view'>
                <div className='card-interviewer'>
                    <div className="avatar">
                        <Image src='/ai-avatar.png' alt='vapi' height={54} width={65} className='object-cover' />
                        {isSpeaking && <span className='animate-speak'></span>}
                    </div>
                    <h3>AI interviewer</h3>
                </div>

                <div className="card-border">
                    <div className="card-content">
                        <Image src="/user-avatar.png" alt='user avatar' width={540} height={540} className='rounded-full object-cover size-[120px]' />
                        <h3>
                            {userName}
                        </h3>
                    </div>
                </div>

            </div>

            {messages.length > 0 && (
                <div className="transcript-border">
                    <div className='transcript lg:p-6'>
                        <p key={latestMessages} className={cn('transcript-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')} >
                            {latestMessages}
                        </p>
                    </div>
                </div>
            )}

            <div className='w-full flex justify-center'>
                {callStatus !== 'ACTIVE' ? (
                    <button className='btn-call' onClick={handleCall}>
                        <span className={cn('rounded-full opacity-75 ', callStatus !== 'CONNECTING' && 'hidden')} />
                           <span className='font-bold'>
                             {isCallInactiveOrFinished ? 'Call' : '. . .'}
                        </span>
                    </button>
                ) :
                    (
                        <button className='btn-disconnect' onClick={handleDisconnect}>
                            End Call
                        </button>
                    )
                }
            </div>

        </>
    )
}

export default Agent