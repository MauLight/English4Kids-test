import { motion } from "motion/react"
import { ChatStreamProps } from '@/types'
import { RefObject, useEffect, useRef } from "react"

export default function ChatStream({ chatStream }: { chatStream: ChatStreamProps[] }) {

    //* Ref to the placeholder div at the end of the stream
    const scrollRef: RefObject<HTMLDivElement | null> = useRef(null)

    //* Effect to scroll to the last div on the stream when chatStream gets updated
    useEffect(() => {
        const lastDiv = scrollRef.current
        if (lastDiv !== null) {
            lastDiv.scrollIntoView({ behavior: 'smooth' })
        }
    }, [chatStream])

    return (
        <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
            className="relative w-full h-full max-h-[550px]">

            <div className="w-full h-full bg-gray-100 border border-slate-200 rounded-[20px] overflow-y-scroll scrollbar-hide">
                <div className="w-full h-auto flex flex-col gap-y-5 p-2 sm:p-5">
                    {
                        chatStream && chatStream.length > 0 && chatStream.map((chat) => (
                            <motion.div
                                key={chat.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.1 }}
                                className={`w-full flex items-center ${chat.user === 'teacher' ? 'justify-start' : 'justify-end'} gap-x-2 z-10`}
                            >
                                <div className={`w-full sm:w-1/2 flex ${chat.user === 'teacher' ? 'justify-start' : 'justify-end'} gap-x-2`}>
                                    {
                                        chat.user === 'teacher' ? (
                                            <div className="relative w-auto flex items-center justify-start bg-text py-3 px-6 border border-gray-300 shadow-md shadow-gray-300 rounded-[25px]">

                                                <p>{chat.text}</p>
                                            </div>
                                        )
                                            :
                                            (
                                                <>
                                                    {
                                                        chat.text.startsWith('blob:') ? (
                                                            <>
                                                                <audio className='h-10 border border-gray-300 rounded-full shadow shadow-gray-200' src={chat.text} controls></audio>
                                                            </>
                                                        )
                                                            :
                                                            (
                                                                <div className="w-auto flex items-center justify-start py-3 px-6 bg-secondary text-text shadow-md shadow-gray-300 rounded-[25px]">
                                                                    <p>{chat.text}</p>
                                                                </div>
                                                            )
                                                    }
                                                </>
                                            )
                                    }
                                    <div ref={scrollRef}></div>
                                </div>
                            </motion.div>
                        ))
                    }
                </div>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.08 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute top-0 left-0 w-full h-full z-0">
                <img className="w-full h-full object-cover" src="https://res.cloudinary.com/maulight/image/upload/v1743239914/ffzeshx0mahdbgg4x5c0.png" alt="" />
            </motion.div>
        </motion.div>
    )
}
