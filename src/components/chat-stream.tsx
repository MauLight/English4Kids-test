import { motion } from "motion/react"
import { ChatStreamProps } from '@/types'

export default function ChatStream({ chatStream }: { chatStream: ChatStreamProps[] }) {
    return (
        <div className="w-full h-full flex flex-col gap-y-5 py-10 px-5">
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
                                        <div className="w-auto flex items-center justify-start py-2 px-3 border border-text2 rounded-[6px]">
                                            <p>{chat.text}</p>
                                        </div>
                                    </>
                                )
                                    :
                                    (
                                        <>
                                            <div className="w-auto flex items-center justify-start py-2 px-3 bg-dark text-text rounded-[6px]">
                                                <p>{chat.text}</p>
                                            </div>
                                            <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden">
                                                <img src="https://res.cloudinary.com/maulight/image/upload/v1743230917/cx3q6il3z0e77qq40etx.jpg" alt="" />
                                            </div>
                                        </>
                                    )
                            }
                        </div>
                    </motion.div>
                ))
            }
        </div>
    )
}
