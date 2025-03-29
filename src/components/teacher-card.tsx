import { useEffect, useState, type ReactNode } from "react"
import { format } from "date-fns"
import TeacherButton from "./teacher-button"

const text = {
    first: 'Welcome!',
    second: 'Coach Isabella',
    third: 'Today '

}


export default function TeacherCard(): ReactNode {

    const [isChatOpen, setIsChatOpen] = useState<boolean>(false)

    function handleOpenChat() {
        setIsChatOpen(!isChatOpen)
    }

    useEffect(() => {
        console.log(isChatOpen)
    }, [isChatOpen])

    return (
        <>
            <section className="flex flex-col justify-between w-full max-w-[420px] h-[300px] rounded-[25px] bg-dark items-center px-7 py-8 shadow-md shadow-black border border-b-border border-x-gray-700">

                {/* Header */}
                <h1 className={`font-title text-start w-full text-text text-header`}>{text.first}</h1>

                {/* Body */}
                <div className="grid grid-cols-4 gap-x-5">
                    <div className="col-span-1">
                        <img
                            className="rounded-full"
                            src="https://res.cloudinary.com/maulight/image/upload/v1743206725/dsnh1fjkctgoneeis60v.png"
                            alt="avatar"
                        />
                    </div>
                    <div className="col-span-3 flex flex-col gap-y-2">
                        <p className="text-text text-[1.4rem] leading-5">{text.second}</p>
                        <p className="text-gray-400 text-regular">{`${text.third} ${format(Date.now(), 'p')}`}</p>
                    </div>

                </div>

                {/* Button */}
                <TeacherButton onClick={handleOpenChat} />
            </section>
        </>
    )
}
