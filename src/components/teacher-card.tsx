import { KeyboardEvent, useEffect, useState, type ReactNode } from "react"
import { AnimatePresence, motion } from 'motion/react'
import { useDebouncedCallback } from 'use-debounce'
import { format } from "date-fns"
import { v4 as uuid } from 'uuid'

//* Components
import TeacherButton from "./teacher-button"
import ChatInput from "./chat-input"

interface ChatStreamProps {
    id: string
    position: number
    text: string
    user: string
}

const teacherStream = [
    {
        text: 'Hello student! Are you ready to start?',
        user: 'teacher'
    }
]

const text = {
    first: 'Welcome!',
    second: 'Coach Isabella',
    third: 'Today ',
    fourth: 'online',
    fifth: 'writing...'

}


export default function TeacherCard(): ReactNode {

    //* Transition between card and chat
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false)
    //* Transition between send message and record audio
    const [isWriting, setIsWriting] = useState<boolean>(false)

    //* Input state
    const [userInput, setUserInput] = useState<string>('')
    //* Teacher active state (writing or online)
    const [isTeacherWriting, setIsTeacherWriting] = useState<boolean>(false)

    //* Chat stream array
    const [chatStream, setChatStream] = useState<ChatStreamProps[]>([])
    //* Chat entries counter
    const [chatPosition, setChatPosition] = useState<number>(1)

    //* Method to open the chat
    function handleOpenChat() {
        setIsChatOpen(!isChatOpen)
    }

    //* Method to debounce the teacher's reply by one second
    const debouncedTeacherReply = useDebouncedCallback(() => {
        console.log("Debounced callback triggered")
    }, 1000)

    //* Method to submit reply on enter keydown
    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' && userInput.length > 0) {
            handleInputButton()
        }
    }

    //* Method to submit a new reply to the chat
    function handleInputButton() {
        if (isWriting) {

            const id = uuid()

            const newChatEntry = {
                id: `user-${id}`,
                position: chatPosition,
                text: userInput,
                user: 'user'
            }

            setChatStream((prev) => [...prev, newChatEntry])
            setChatPosition((prev) => prev + 1)
            setUserInput('')
            debouncedTeacherReply()
        }
    }

    //* Submit the teacher's first message upon loading the chat
    useEffect(() => {
        if (chatStream.length === 0) {
            setTimeout(() => {
                setIsTeacherWriting(true)
                const id = uuid()
                setTimeout(() => {
                    setChatStream((prev) => [...prev, { ...teacherStream[0], id: `teacher-${id}`, position: chatPosition }])
                    setChatPosition((prev) => prev + 1)
                    setIsTeacherWriting(false)
                }, 5000)
            }, 5000)
        }
    }, [])

    //* Effect to manage conditional rendering of the action button, toggle between mic and send message
    useEffect(() => {
        if (!userInput.length && isWriting) {
            setIsWriting(false)
        }

        if (userInput.length && !isWriting) {
            setIsWriting(true)
        }

    }, [userInput])

    useEffect(() => {
        console.log(chatStream)
    }, [chatStream])

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

                    {
                        isChatOpen && (
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
                                                            <div className="w-10 h-10 rounded-full overflow-hidden">
                                                                <img src="https://res.cloudinary.com/maulight/image/upload/v1743206725/dsnh1fjkctgoneeis60v.png" alt="" />
                                                            </div>
                                                            <div className="w-auto h-10 flex items-center justify-start px-4 border border-text2 rounded-[6px]">
                                                                <p>{chat.text}</p>
                                                            </div>
                                                        </>
                                                    )
                                                        :
                                                        (
                                                            <>
                                                                <div className="w-auto  h-10 flex items-center justify-start px-4 bg-dark text-text rounded-[6px]">
                                                                    <p>{chat.text}</p>
                                                                </div>
                                                                <div className="w-10 h-10 rounded-full overflow-hidden">
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

                    {/* Button */}
                    {
                        !isChatOpen ? (
                            <TeacherButton onClick={handleOpenChat} />
                        )
                            :
                            (
                                <ChatInput
                                    isWriting={isWriting}
                                    userInput={userInput}
                                    handleKeyDown={handleKeyDown}
                                    handleInputButton={handleInputButton}
                                    onChange={(e) => { setUserInput(e.target.value) }}
                                />
                            )
                    }
                </motion.div>
            </motion.section>
        </AnimatePresence>
    )
}
