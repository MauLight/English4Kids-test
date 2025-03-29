import { PaperAirplaneIcon, MicrophoneIcon } from '@heroicons/react/16/solid'


interface ChatInputProps {
    isWriting: boolean
    userInput: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
    handleInputButton: () => void
}

export default function ChatInput({
    isWriting,
    userInput,
    onChange,
    handleKeyDown,
    handleInputButton

}: ChatInputProps) {
    return (
        <div className="relative w-full rounded-full py-5 px-6 bg-dark">

            <button onClick={handleInputButton} className="group absolute top-1 right-1 bg-secondary hover:bg-text transition-color duration-300 w-[56px] h-[56px] flex justify-center items-center rounded-full cursor-pointer">
                {
                    isWriting ? (
                        <PaperAirplaneIcon className="w-7 h-7 text-text group-hover:text-secondary transition-color duration-300 -rotate-45" />
                    )
                        :
                        (
                            <MicrophoneIcon className="w-7 h-7 text-text group-hover:text-secondary transition-color duration-300" />
                        )
                }
            </button>

            <input placeholder='Write a message...' onKeyDown={(e) => { handleKeyDown(e) }} value={userInput} onChange={onChange} type="text" className="w-full h-full text-text outline-0 z-20" />
        </div>
    )
}
