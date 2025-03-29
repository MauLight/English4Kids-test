import { type ReactNode } from "react"
import { motion } from "motion/react"
import { format } from "date-fns"

interface TeacherInformationProps {
    text: Record<string, string>
    isChatOpen: boolean
    isTeacherWriting: boolean
}

export default function TeacherInformation({ text, isChatOpen, isTeacherWriting }: TeacherInformationProps): ReactNode {
    return (
        <div className={`w-full grid ${isChatOpen ? 'grid-cols-9' : 'grid-cols-4'} gap-x-5`}>
            <div className="col-span-1">
                <motion.img
                    initial={{ width: 'auto' }}
                    animate={isChatOpen ? { width: '60px' } : { width: 'auto' }}
                    className="rounded-full"
                    src="https://res.cloudinary.com/maulight/image/upload/v1743206725/dsnh1fjkctgoneeis60v.png"
                    alt="avatar"
                />
            </div>
            <div className="col-span-3 flex flex-col gap-y-2">
                <p className={`${isChatOpen ? 'text-dark' : 'text-text'} text-[1.4rem] leading-5`}>{text.second}</p>
                {
                    isChatOpen ? (
                        <div className="flex gap-x-2 items-center">
                            {
                                isTeacherWriting ? (
                                    <>
                                        <p className="text-dark2 text-regular animate-pulse">{`${text.fifth}`}</p>
                                    </>
                                )
                                    :
                                    (
                                        <>
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                            <p className="text-green-500 text-regular">{`${text.fourth}`}</p>
                                        </>
                                    )
                            }
                        </div>
                    )
                        :
                        (
                            <p className="text-gray-400 text-regular">{`${text.third} ${format(Date.now(), 'p')}`}</p>
                        )
                }
            </div>

        </div>
    )
}
