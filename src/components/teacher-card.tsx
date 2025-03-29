import { useEffect, useState, type ReactNode } from "react"
import { AnimatePresence, motion } from 'motion/react'
import { format } from "date-fns"
import TeacherButton from "./teacher-button"

const text = {
    first: 'Welcome!',
    second: 'Coach Isabella',
    third: 'Today ',
    fourth: 'online'

}


export default function TeacherCard(): ReactNode {

    const [isChatOpen, setIsChatOpen] = useState<boolean>(false)

    function handleOpenChat() {
        setIsChatOpen(!isChatOpen)
    }

    useEffect(() => {
        console.log(isChatOpen)
    }, [isChatOpen])

    return (
        <AnimatePresence>

            <motion.section
                key={1}
                initial={{ scale: 1, width: 'auto', maxWidth: 420, height: 300, backgroundColor: '#131212', border: 0 }}
                animate={isChatOpen ? { scale: 1, width: '100%', maxWidth: 900, height: 800, backgroundColor: '#fdfcfb', border: '5px solid #10100e' } : { scale: 1, width: 'auto', maxWidth: 420, height: 300, backgroundColor: '#131212' }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5 }}
                className="shadow-md shadow-black border h-[300px] border-b-border border-x-gray-700 rounded-[25px]">




                <motion.div
                    key={3}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="flex flex-col justify-between h-full items-center px-7 py-8"
                >
                    {/* Header */}
                    {
                        !isChatOpen && (
                            <h1 className={`font-title text-start w-full text-text text-header`}>{text.first}</h1>
                        )
                    }

                    {/* Body */}
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
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        <p className="text-green-500 text-regular">{`${text.fourth}`}</p>
                                    </div>
                                )
                                    :
                                    (
                                        <p className="text-gray-400 text-regular">{`${text.third} ${format(Date.now(), 'p')}`}</p>
                                    )
                            }
                        </div>

                    </div>

                    {/* Button */}
                    {
                        !isChatOpen ? (
                            <TeacherButton onClick={handleOpenChat} />
                        )
                            :
                            (

                                <div className="relative w-full">
                                    <div className="absolute top-0 right-0 w-full h-full flex justify-end items-center px-[4px]">
                                        <button className="bg-secondary w-[56px] h-[56px] rounded-full"></button>
                                    </div>
                                    <input type="text" className="w-full rounded-full py-5 px-6 bg-dark text-text outline-0" />
                                </div>
                            )
                    }
                </motion.div>

            </motion.section>


        </AnimatePresence>
    )
}
