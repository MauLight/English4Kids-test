import TeacherCard from "../components/teacher-card"

function Home() {
    return (
        <div className="relative w-screen h-screen flex flex-col gap-y-5 justify-center items-center bg-primary px-5">
            <TeacherCard />
        </div>
    )
}

export default Home