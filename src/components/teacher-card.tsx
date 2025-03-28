import { type ReactNode } from "react"


export default function TeacherCard(): ReactNode {
    return (
        <div className="flex flex-col justify-center w-full max-w-[420px] h-[320px] rounded-[25px] bg-dark items-center z-20">
            <h1 className={`font-title text-text text-header uppercase`}>Hello World</h1>
            <p className="text-regular text-text2">This is a longer sentence.</p>
        </div>
    )
}
