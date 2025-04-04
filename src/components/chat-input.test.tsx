import { render, screen, fireEvent } from '@testing-library/react'
import ChatInput from './chat-input'
import { describe, it, expect, vi } from 'vitest'
import { ThemeProvider } from '../context/themeContext'

const renderWithTheme = (ui: React.ReactElement) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>)
}

describe('ChatInput Component', () => {
    const defaultProps = {
        isWriting: false,
        userInput: '',
        audioUrl: null,
        setAudioUrl: vi.fn(),
        onChange: vi.fn(),
        handleKeyDown: vi.fn(),
        handleAddMessage: vi.fn()
    }

    it('renders the microphone button when not writing and no audio exists', () => {
        renderWithTheme(<ChatInput {...defaultProps} />)

        const micButton = screen.getByTestId('start-recording-button')
        expect(micButton).toBeInTheDocument()
    })

    it('renders the send button when isWriting is true', () => {
        renderWithTheme(<ChatInput {...defaultProps} isWriting={true} />)
        const sendButton = screen.getByTestId('send-button')
        expect(sendButton).toBeInTheDocument()

        fireEvent.click(sendButton)
        expect(defaultProps.handleAddMessage).toHaveBeenCalledTimes(1)
    })

    it('renders the audio element when audioUrl is provided', () => {
        const testUrl = 'blob:http://localhost/test'
        renderWithTheme(<ChatInput {...defaultProps} audioUrl={testUrl} />)
        const audioElement = screen.getByTestId('audio-element') as HTMLAudioElement
        expect(audioElement).toBeInTheDocument()
        expect(audioElement.src).toContain(testUrl)
    })
})