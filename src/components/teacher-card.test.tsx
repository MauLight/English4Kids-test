import { render, screen, fireEvent } from '@testing-library/react'
import TeacherCard from './teacher-card'
import { describe, it, expect } from 'vitest'

describe('TeacherCard Component', () => {
    it('renders the closed teacher card with header', () => {
        render(<TeacherCard />)
        const headerElement = screen.getByText('Welcome!')
        expect(headerElement).toBeInTheDocument()
    })

    it('opens the chat when teacher button is clicked', async () => {
        render(<TeacherCard />)
        const teacherButton = screen.getByRole('button')
        fireEvent.click(teacherButton)

        const input = await screen.findByPlaceholderText('Write a message...')
        expect(input).toBeInTheDocument()
    })

    it('renders teacher information in the open chat state', async () => {
        render(<TeacherCard />)
        const teacherButton = screen.getByRole('button')
        fireEvent.click(teacherButton)

        const teacherName = await screen.findByText('Coach Isabella')
        expect(teacherName).toBeInTheDocument()
    })
})