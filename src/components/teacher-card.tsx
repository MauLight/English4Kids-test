import { type ReactNode } from "react"
import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid"
import { format } from "date-fns"

const text = {
    first: 'Welcome!',
    second: 'Coach Isabella',
    third: 'Today '

}


export default function TeacherCard(): ReactNode {
    return (
        <section className="flex flex-col justify-between w-full max-w-[420px] h-[300px] rounded-[25px] bg-dark items-center px-7 py-8">

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
            <div className="w-full rounded-full py-3 bg-secondary flex justify-between px-5 items-center">
                <p className="text-subheader text-text">Start</p>
                <ChevronDoubleRightIcon className="w-6 h-6 text-text" />
            </div>
        </section>
    )
}
