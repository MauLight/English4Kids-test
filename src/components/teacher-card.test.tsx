import { render, screen, fireEvent } from '@testing-library/react'
import TeacherCard from './teacher-card'
import { describe, it, expect } from 'vitest'
import { ThemeProvider } from '../context/themeContext'

const renderWithTheme = (ui: React.ReactElement) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>)
}

describe('TeacherCard Component', () => {
    it('renders the closed teacher card with header', () => {
        renderWithTheme(<TeacherCard />)
        const headerElement = screen.getByTestId('card-header')
        expect(headerElement).toBeInTheDocument()
    })

    it('opens the chat when teacher button is clicked', async () => {
        renderWithTheme(<TeacherCard />)
        const teacherButton = screen.getByRole('button')
        fireEvent.click(teacherButton)

        const input = await screen.findByPlaceholderText('Write a message...')
        expect(input).toBeInTheDocument()
    })

    it('renders teacher information in the open chat state', async () => {
        renderWithTheme(<TeacherCard />)
        const teacherButton = screen.getByRole('button')
        fireEvent.click(teacherButton)

        const teacherName = await screen.findByText('Coach Isabella')
        expect(teacherName).toBeInTheDocument()
    })
})