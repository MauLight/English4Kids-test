import { motion } from "motion/react"
import { ChatStreamProps } from '@/types'
import { RefObject, useEffect, useRef } from "react"

export default function ChatStream({ chatStream }: { chatStream: ChatStreamProps[] }) {

    //* Ref to the placeholder div at the end of the stream
    const scrollRef: RefObject<HTMLDivElement> = useRef(null)

    //* Effect to scroll to the last div on the stream when chatStream gets updated
    useEffect(() => {
        const lastDiv = scrollRef.current
        if (lastDiv !== null) {
            lastDiv.scrollIntoView({ behavior: 'smooth' })
        }
    }, [chatStream])

    return (
        <div className="w-full h-full max-h-[550px] bg-gray-200 border border-slate-200 rounded-[20px] overflow-y-scroll scrollbar-hide">
            <div className="w-full h-auto flex flex-col gap-y-5 p-5">
                {
                    chatStream && chatStream.length > 0 && chatStream.map((chat) => (
                        <motion.div
                            key={chat.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`w-full flex items-center ${chat.user === 'teacher' ? 'justify-start' : 'justify-end'} gap-x-2`}
                        >
                            <div className={`w-1/2 flex ${chat.user === 'teacher' ? 'justify-start' : 'justify-end'} gap-x-2`}>
                                {
                                    chat.user === 'teacher' ? (
                                        <>
                                            <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden">
                                                <img className="w-full h-full object-cover" src="https://res.cloudinary.com/maulight/image/upload/v1743206725/dsnh1fjkctgoneeis60v.png" alt="avatar" />
                                            </div>
                                            <div className="w-auto flex items-center justify-start bg-text py-2 px-3 border border-gray-300 shadow-md shadow-gray-300 rounded-[6px]">
                                                <p>{chat.text}</p>
                                            </div>
                                        </>
                                    )
                                        :
                                        (
                                            <>
                                                <div className="w-auto flex items-center justify-start py-2 px-3 bg-dark text-text shadow-md shadow-gray-400 rounded-[6px]">
                                                    <p>{chat.text}</p>
                                                </div>
                                                <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden">
                                                    <img src="https://res.cloudinary.com/maulight/image/upload/v1743230917/cx3q6il3z0e77qq40etx.jpg" alt="" />
                                                </div>
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
    )
}
