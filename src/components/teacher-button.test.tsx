import { render, screen, fireEvent } from '@testing-library/react'
import TeacherButton from './teacher-button'
import { describe, it, expect, vi } from 'vitest'


describe('TeacherButton Test', () => {
    it('renders "Start practicing" when lessonStarted equals false', () => {
        const handleClick = vi.fn()
        render(<TeacherButton onClick={handleClick} lessonStarted={false} />)
        expect(screen.getByText(/start practicing/i)).toBeInTheDocument()
    })

    it('renders "Continue practicing" when lessonStarted equals true', () => {
        const handleClick = vi.fn()
        render(<TeacherButton onClick={handleClick} lessonStarted={true} />)
        expect(screen.getByText(/continue practicing/i)).toBeInTheDocument()
    })

    it('calls onClick when the button is pressed', () => {
        const handleClick = vi.fn()
        render(<TeacherButton onClick={handleClick} lessonStarted={false} />)
        const button = screen.getByRole('button')
        fireEvent.click(button)
        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})




// it('renders the doodle image with correct alt text and src', () => {
//     const handleClick = vi.fn()
//     render(<TeacherButton onClick={handleClick} lessonStarted={false} />)
//     const image = screen.getByAltText('doodle')
//     expect(image).toBeInTheDocument()
//     expect(image).toHaveAttribute('src', expect.stringContaining('cloudinary'))
// })

// it('has the expected button classes', () => {
//     const handleClick = vi.fn()
//     render(<TeacherButton onClick={handleClick} lessonStarted={false} />)
//     const button = screen.getByRole('button')
//     expect(button).toHaveClass('rounded-full')
//     expect(button).toHaveClass('bg-secondary')
// })