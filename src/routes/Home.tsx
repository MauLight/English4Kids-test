import { MoonIcon, SunIcon } from "@heroicons/react/16/solid"
import TeacherCard from "../components/teacher-card"
import { useTheme } from "../context/themeContext"

function Home() {

    const { theme, setTheme } = useTheme()

    return (
        <div className={`relative w-screen h-screen flex flex-col gap-y-5 justify-center items-center min-[500px]:px-5 ${theme === 'light' ? 'bg-primary' : 'bg-black'} transition-color duration-300`}>
            <TeacherCard />
            <div className='flex gap-x-2 items-center justify-center'>
                <button onClick={() => { setTheme('dark') }}>
                    <MoonIcon className={`w-6 h-6 ${theme === 'light' ? 'text-dark hover:text-secondary' : 'text-text hover:text-secondary'} transition-color duration-300`} />
                </button>
                <button onClick={() => { setTheme('light') }}>
                    <SunIcon className={`w-6 h-6 ${theme === 'light' ? 'text-dark hover:text-secondary' : 'text-text hover:text-secondary'} transition-color duration-300`} />
                </button>
            </div>
        </div>
    )
}

export default Home