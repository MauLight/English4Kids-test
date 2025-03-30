import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { PaperAirplaneIcon, MicrophoneIcon, StopIcon, XMarkIcon, CloudArrowUpIcon } from '@heroicons/react/16/solid'


interface ChatInputProps {
    isWriting: boolean
    userInput: string
    audioUrl: string | null
    setAudioUrl: Dispatch<SetStateAction<string | null>>
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
    handleAddMessage: () => void
}

export default function ChatInput({
    isWriting,
    userInput,
    audioUrl,
    setAudioUrl,
    onChange,
    handleKeyDown,
    handleAddMessage

}: ChatInputProps) {

    const [permission, setPermission] = useState(false)
    const [stream, setStream] = useState<MediaStream | null>(null)

    const [recordingStatus, setRecordingStatus] = useState<'recording' | 'paused' | 'inactive'>('inactive')
    const [audioChunks, setAudioChunks] = useState<Blob[]>([])
    const mediaRecorder = useRef<MediaRecorder | null>(null)

    async function handleGetMicPermission() {
        if ('MediaRecorder' in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false
                })

                setPermission(true)
                setStream(streamData)


                setRecordingStatus('recording')
                const media = new MediaRecorder(streamData, { mimeType: 'audio/webm' })
                mediaRecorder.current = media

                //* Start recording
                mediaRecorder.current.start()
                let localAudioChunks: Blob[] = []
                mediaRecorder.current.ondataavailable = (e) => {
                    if (typeof e.data === 'undefined') return
                    if (e.data.size === 0) return
                    localAudioChunks.push(e.data)
                }
                setAudioChunks(localAudioChunks)


            } catch (error) {
                console.error(error)
            }
        } else {
            console.error('The MediaRecorder API is not supported in your browser.')
        }
    }

    function startRecording() {
        if (!permission) {
            handleGetMicPermission()
        } else {
            if (stream) {
                setRecordingStatus('recording')
                const media = new MediaRecorder(stream, { mimeType: 'audio/webm' })
                mediaRecorder.current = media

                //* Start recording
                mediaRecorder.current.start()
                let localAudioChunks: Blob[] = []
                mediaRecorder.current.ondataavailable = (e) => {
                    if (typeof e.data === 'undefined') return
                    if (e.data.size === 0) return
                    localAudioChunks.push(e.data)
                }
                setAudioChunks(localAudioChunks)
            } else {
                console.error('The stream was not initialized.')
            }
        }
    }

    function stopRecording() {
        setRecordingStatus('inactive')
        if (mediaRecorder.current) {
            mediaRecorder.current.stop()
            mediaRecorder.current.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/webm' })
                const audioUrl = URL.createObjectURL(audioBlob)
                setAudioUrl(audioUrl)
                setAudioChunks([])
            }
        }
    }

    function handleSendAudio() {
        handleAddMessage()
        setAudioUrl(null)
    }

    return (
        <div className='relative w-full'>

            {
                audioUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, type: 'spring', bounce: 0.2 }}
                        className="absolute -top-17 right-0 z-20 py-3 flex justify-end">
                        <button onClick={handleSendAudio} className='absolute top-3 -left-15 z-30 h-10 px-4 bg-gray-100 hover:bg-green-500 transition-color duration-300 border border-gray-300 rounded-full'>
                            <CloudArrowUpIcon className='w-5 h-5 text-dark' />
                        </button>
                        <button onClick={() => { setAudioUrl(null) }} className='absolute top-1 -right-1 z-30'>
                            <XMarkIcon className='w-5 h-5 text-dark hover:text-red-500' />
                        </button>
                        <audio className='h-10 border border-gray-300 rounded-full shadow shadow-gray-200' src={audioUrl} controls></audio>
                    </motion.div>
                )
            }

            <div className="relative w-full rounded-full py-5 px-6 bg-dark">

                {
                    isWriting ? (
                        <button onClick={handleAddMessage} className="group absolute top-1 right-1 bg-secondary hover:bg-text transition-color duration-300 w-[56px] h-[56px] flex justify-center items-center rounded-full cursor-pointer">
                            <PaperAirplaneIcon className="w-6 h-6 text-text group-hover:text-secondary transition-color duration-300 -rotate-45" />
                        </button>
                    )
                        :
                        (
                            <>
                                {
                                    recordingStatus === 'recording' ? (
                                        <button onClick={stopRecording} className="group absolute top-1 right-1 bg-secondary hover:bg-text transition-color duration-300 w-[56px] h-[56px] flex justify-center items-center rounded-full cursor-pointer">
                                            <StopIcon className="w-7 h-7 text-text group-hover:text-secondary transition-color duration-300" />
                                        </button>
                                    )
                                        :
                                        (
                                            <button onClick={startRecording} className="group absolute top-1 right-1 bg-secondary hover:bg-text transition-color duration-300 w-[56px] h-[56px] flex justify-center items-center rounded-full cursor-pointer">
                                                <MicrophoneIcon className="w-7 h-7 text-text group-hover:text-secondary transition-color duration-300" />
                                            </button>
                                        )
                                }
                            </>
                        )
                }

                <input placeholder='Write a message...' onKeyDown={(e) => { handleKeyDown(e) }} value={userInput} onChange={onChange} type="text" className="w-full h-full text-text outline-0 z-20" />
            </div>
        </div>
    )
}
