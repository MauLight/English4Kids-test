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
        <>
            {
                !isChatOpen ? (
                    <div className='w-full grid grid-cols-4 gap-x-5 z-10'>
                        <div className='col-span-1 hidden min-[500px]:flex'>
                            <motion.img
                                initial={{ width: 'auto' }}
                                animate={isChatOpen ? { width: '60px', minWidth: '60px' } : { width: 'auto' }}
                                className="rounded-full shrink-0"
                                src="https://res.cloudinary.com/maulight/image/upload/v1743206725/dsnh1fjkctgoneeis60v.png"
                                alt="avatar"
                            />
                        </div>
                        <div className={'col-span-3 flex flex-col justify-center gap-y-2'}>
                            <p className={`${isChatOpen ? 'text-dark' : 'text-text'} text-[1.4rem] leading-5`}>{text.second}</p>

                            <p className="text-gray-400 text-regular">{`${text.third} ${format(Date.now(), 'p')}`}</p>

                        </div>

                    </div>
                )
                    :
                    (
                        <div className={`max-[500px]:w-screen w-full grid grid-cols-4`}>

                            <div className="col-span-3 min-[500px]:col-span-2 w-full flex justify-start items-center gap-x-4 max-[500px]:px-2">
                                <img
                                    className="w-[60px] rounded-full"
                                    src="https://res.cloudinary.com/maulight/image/upload/v1743206725/dsnh1fjkctgoneeis60v.png"
                                    alt="avatar"
                                />
                                <div>
                                    <p className={`${isChatOpen ? 'text-dark' : 'text-text'} text-[1.4rem] leading-5`}>{text.second}</p>
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
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    )
}
