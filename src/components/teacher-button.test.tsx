import { render, screen, fireEvent } from '@testing-library/react'
import TeacherButton from './teacher-button'
import { describe, it, expect, vi } from 'vitest'
import { ThemeProvider } from '../context/themeContext'

const renderWithTheme = (ui: React.ReactElement) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>)
}

describe('TeacherButton Test', () => {
    it('renders the doodle image with correct alt text and src', () => {
        const handleClick = vi.fn()
        renderWithTheme(<TeacherButton onClick={handleClick} lessonStarted={false} />)
        const image = screen.getByAltText('doodle')
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('src', expect.stringContaining('cloudinary'))
    })

    it('renders "Start practicing" when lessonStarted equals false', () => {
        const handleClick = vi.fn()
        renderWithTheme(<TeacherButton onClick={handleClick} lessonStarted={false} />)
        expect(screen.getByText(/start practicing/i)).toBeInTheDocument()
    })

    it('renders "Continue practicing" when lessonStarted equals true', () => {
        const handleClick = vi.fn()
        renderWithTheme(<TeacherButton onClick={handleClick} lessonStarted={true} />)
        expect(screen.getByText(/continue practicing/i)).toBeInTheDocument()
    })

    it('calls onClick when the button is pressed', () => {
        const handleClick = vi.fn()
        renderWithTheme(<TeacherButton onClick={handleClick} lessonStarted={false} />)
        const button = screen.getByRole('button')
        fireEvent.click(button)
        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})