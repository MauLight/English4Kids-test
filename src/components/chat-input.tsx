import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { PaperAirplaneIcon, MicrophoneIcon, StopIcon, XMarkIcon, CloudArrowUpIcon } from '@heroicons/react/16/solid'
import { useTheme } from '../context/themeContext'


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

    const { theme } = useTheme()
    const iconClass = `w-7 h-7 group-hover:text-secondary transition-color duration-300 ${theme === 'light' ? 'text-text' : 'text-black'}`
    const buttonClass = `group absolute top-1 right-1 bg-secondary ${theme === 'light' ? 'hover:bg-text' : 'hover:bg-dark border border-border'} transition-color duration-300 w-[56px] h-[56px] flex justify-center items-center rounded-full cursor-pointer`

    //* Store permission request and stream preparation
    const [permission, setPermission] = useState(false)
    const [stream, setStream] = useState<MediaStream | null>(null)

    //* Audio recording state
    const [recordingStatus, setRecordingStatus] = useState<'recording' | 'paused' | 'inactive'>('inactive')
    const [audioChunks, setAudioChunks] = useState<Blob[]>([])
    const mediaRecorder = useRef<MediaRecorder | null>(null)

    //* Get permissions from browser, start first recording
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

    //* Start a new recording
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

    //* Stop the recording
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

    //* Add audio blob URL to chat stream
    function handleSendAudio() {
        handleAddMessage()
        setAudioUrl(null)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.5 }}
            className='relative w-full'>

            {
                audioUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, type: 'spring', bounce: 0.2 }}
                        className="absolute -top-17 right-0 z-20 py-3 flex justify-end">
                        <button onClick={handleSendAudio} data-testid="send-audio-button" className='absolute top-3 -left-15 z-30 h-10 px-4 bg-gray-100 hover:bg-green-500 transition-color duration-300 border border-gray-300 rounded-full'>
                            <CloudArrowUpIcon className='w-5 h-5 text-dark' />
                        </button>
                        <button onClick={() => { setAudioUrl(null) }} data-testid="clear-audio-button" className='absolute top-1 -right-1 z-30'>
                            <XMarkIcon className='w-5 h-5 text-dark hover:text-red-500' />
                        </button>
                        <audio data-testid="audio-element" className='h-10 border border-gray-300 rounded-full shadow shadow-gray-200' src={audioUrl} controls></audio>
                    </motion.div>
                )
            }

            <div className={`relative w-full rounded-full py-5 px-6 bg-dark ${theme === 'light' ? '' : 'border border-border'}`}>
                {
                    isWriting ? (
                        <button onClick={handleAddMessage} data-testid="send-button" className={buttonClass}>
                            <PaperAirplaneIcon className={iconClass + ' -rotate-45'} />
                        </button>
                    )
                        :
                        (
                            <>
                                {
                                    recordingStatus === 'recording' ? (
                                        <button onClick={stopRecording} data-testid="stop-recording-button" className={buttonClass}>
                                            <StopIcon className={iconClass} />
                                        </button>
                                    )
                                        :
                                        (
                                            <button onClick={startRecording} data-testid="start-recording-button" className={buttonClass}>
                                                <MicrophoneIcon className={iconClass} />
                                            </button>
                                        )
                                }
                            </>
                        )
                }

                <input placeholder='Write a message...' onKeyDown={(e) => { handleKeyDown(e) }} value={userInput} onChange={onChange} type="text" className="w-full h-full text-text outline-0 z-20" />
            </div>
        </motion.div>
    )
}
