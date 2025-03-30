import { render, screen } from '@testing-library/react'
import ChatStream from './chat-stream'
import { describe, it, expect } from 'vitest'

const teacherChat = { id: '1', text: 'Hello from teacher!', user: 'teacher', position: 1 }
const studentChatText = { id: '2', text: 'Hello from student!', user: 'student', position: 1 }
const studentChatAudio = { id: '3', text: 'blob:http://localhost/audio', user: 'student', position: 1 }

describe('ChatStream Component', () => {
    it('renders teacher message correctly', () => {
        render(<ChatStream chatStream={[teacherChat]} />)
        const message = screen.getByText(teacherChat.text)
        expect(message).toBeInTheDocument()
    })

    it('renders student text message correctly', () => {
        render(<ChatStream chatStream={[studentChatText]} />)
        const message = screen.getByText(studentChatText.text)
        expect(message).toBeInTheDocument()
    })

    it('renders audio element for student audio message', () => {
        render(<ChatStream chatStream={[studentChatAudio]} />)
        const audio = screen.getByTestId('audio-element')
        expect(audio).toBeInTheDocument()
        expect(audio).toHaveAttribute('src', studentChatAudio.text)
    })
})