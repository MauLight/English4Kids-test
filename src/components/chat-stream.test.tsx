import { render, screen } from '@testing-library/react'
import ChatStream from './chat-stream'
import { describe, it, expect } from 'vitest'
import { ThemeProvider } from '../context/themeContext'

const renderWithTheme = (ui: React.ReactElement) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>)
}

const teacherChat = { id: '1', text: 'Hello from teacher!', user: 'teacher', position: 1 }
const studentChatText = { id: '2', text: 'Hello from student!', user: 'student', position: 1 }
const studentChatAudio = { id: '3', text: 'blob:http://localhost/audio', user: 'student', position: 1 }

describe('ChatStream Component', () => {
    it('renders teacher message correctly', () => {
        renderWithTheme(<ChatStream chatStream={[teacherChat]} />)
        const message = screen.getByText(teacherChat.text)
        expect(message).toBeInTheDocument()
    })

    it('renders student text message correctly', () => {
        renderWithTheme(<ChatStream chatStream={[studentChatText]} />)
        const message = screen.getByText(studentChatText.text)
        expect(message).toBeInTheDocument()
    })

    it('renders audio element for student audio message', () => {
        renderWithTheme(<ChatStream chatStream={[studentChatAudio]} />)
        const audio = screen.getByTestId('audio-element')
        expect(audio).toBeInTheDocument()
        expect(audio).toHaveAttribute('src', studentChatAudio.text)
    })
})