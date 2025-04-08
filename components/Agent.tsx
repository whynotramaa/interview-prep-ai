import { cn } from '@/lib/utils';
import Image from 'next/image'

enum CallStatus {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
    CONNECTING = 'CONNECTING',
    FINISHED = 'FINISHED',
  }
  
const Agent = ({ userName }: AgentProps) => {
    const callStatus = CallStatus.FINISHED
    const isSpeaking = true;

    const messages = [
        'Whats your name ? ',
        'Myself Abhishek Kurmi. Nice to meet you'
    ]

    const lastMessage = messages[messages.length-1]

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

            {messages.length>0 && (
                <div className="transcript-border">
                    <div className='transcript lg:p-6'>
                        <p key={lastMessage} className= {cn('transcript-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')} >
                            {lastMessage}
                        </p>
                    </div>
                </div>
            )}

            <div className='w-full flex justify-center'>
                {callStatus !== 'ACTIVE' ? (
                    <button className='btn-call'>
                        <span className={cn('hover:animate-ping rounded-full opacity-75 font-bold text-gray-900', callStatus!=='CONNECTING' & 'hidden')}>
                            {callStatus === 'INACTIVE' || callStatus === 'FINISHED' ? 'Call' : '. . .'}
                        </span>
                    </button>
                ) : 
                (
                    <button className='btn-disconnect'>
                        End Call
                    </button>
                )
             }
            </div>

        </>
    )
}

export default Agent