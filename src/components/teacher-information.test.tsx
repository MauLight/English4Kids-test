import { render, screen } from '@testing-library/react'
import TeacherInformation from './teacher-information'
import { describe, it, expect } from 'vitest'

const defaultText = {
    second: 'Teacher Name',
    third: 'Last seen',
    fourth: 'Online',
    fifth: 'Writing...'
}

describe('TeacherInformation Component', () => {
    it('renders correctly when chat is closed', () => {
        render(
            <TeacherInformation
                text={defaultText}
                isChatOpen={false}
                isTeacherWriting={false}
            />
        )

        const avatar = screen.getByAltText(/avatar/i)
        expect(avatar).toBeInTheDocument()

        const teacherName = screen.getByText(defaultText.second)
        expect(teacherName).toBeInTheDocument()

        const statusText = screen.getByText((content) =>
            content.includes(defaultText.third)
        )
        expect(statusText).toBeInTheDocument()
    })

    it('renders open chat with teacher writing indicator when teacher is writing', () => {
        render(
            <TeacherInformation
                text={defaultText}
                isChatOpen={true}
                isTeacherWriting={true}
            />
        )

        const avatar = screen.getByAltText(/avatar/i)
        expect(avatar).toBeInTheDocument()

        const teacherName = screen.getByText(defaultText.second)
        expect(teacherName).toBeInTheDocument()

        const writingIndicator = screen.getByText(defaultText.fifth)
        expect(writingIndicator).toBeInTheDocument()
    })

    it('renders open chat with teacher online indicator when teacher is not writing', () => {
        render(
            <TeacherInformation
                text={defaultText}
                isChatOpen={true}
                isTeacherWriting={false}
            />
        )

        const avatar = screen.getByAltText(/avatar/i)
        expect(avatar).toBeInTheDocument()

        const teacherName = screen.getByText(defaultText.second)
        expect(teacherName).toBeInTheDocument()
        const onlineStatus = screen.getByText(defaultText.fourth)
        expect(onlineStatus).toBeInTheDocument()

        const onlineIndicator = document.querySelector('.w-3.h-3.rounded-full.bg-green-500')
        expect(onlineIndicator).not.toBeNull()
    })
})