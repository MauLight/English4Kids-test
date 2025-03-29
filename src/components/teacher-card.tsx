import { KeyboardEvent, useEffect, useState, type ReactNode } from "react"
import { AnimatePresence, motion } from 'motion/react'
import { useDebouncedCallback } from 'use-debounce'
import { v4 as uuid } from 'uuid'

//* Components
import TeacherButton from "./teacher-button"
import ChatInput from "./chat-input"
import TeacherInformation from "./teacher-information"

//* Types
import { ChatStreamProps } from "@/types"
import ChatStream from "./chat-stream"

const teacherStream = [
    {
        text: 'Hello student! Are you ready to start?',
        user: 'teacher'
    },
    {
        text: "That's the spirit! Today's lesson will be about professions",
        user: 'teacher'
    },
    {
        text: 'Hello student! Are you ready to start?',
        user: 'teacher'
    },
    {
        text: "That's the spirit! Today's lesson will be about professions",
        user: 'teacher'
    },
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
        const teacherReplyCount = chatStream.filter((chat) => chat.user === 'teacher').length

        const teacherReplyIndex = teacherReplyCount % teacherStream.length

        if (teacherReplyCount > 0) {

            setTimeout(() => {
                setIsTeacherWriting(true)
                const id = uuid()
                setTimeout(() => {
                    setChatStream((prev) => [...prev, { ...teacherStream[teacherReplyIndex], id: `teacher-${id}`, position: chatPosition }])
                    setChatPosition((prev) => prev + 1)
                    setIsTeacherWriting(false)
                }, 5000)
            }, 1500)

        }

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
                className={`relative shadow-md shadow-black border h-[300px] max-[500px]:min-w-[90%] border-b-border border-x-gray-700 rounded-[25px] overflow-hidden ${!isChatOpen ? 'max-[500px]:mx-5' : ''}`}>
                <motion.div
                    key={3}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className={`flex flex-col justify-between h-full items-center ${isChatOpen ? 'px-2 sm:px-7' : 'px-7'} py-8`}
                >
                    {/* Header */}
                    {
                        !isChatOpen && (
                            <h1 className={`font-title text-start w-full text-text text-header z-10`}>{text.first}</h1>
                        )
                    }

                    {/* Body */}

                    <TeacherInformation
                        text={text}
                        isChatOpen={isChatOpen}
                        isTeacherWriting={isTeacherWriting}
                    />

                    {
                        isChatOpen && (
                            <ChatStream
                                chatStream={chatStream}
                            />
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
                {
                    !isChatOpen && (
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 min-[500px]:hidden">
                            <motion.img
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                className="min-w-[500px]"
                                src="https://res.cloudinary.com/maulight/image/upload/v1743206725/dsnh1fjkctgoneeis60v.png"
                                alt="avatar"
                            />
                        </div>
                    )
                }
            </motion.section>
        </AnimatePresence>
    )
}
