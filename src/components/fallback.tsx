import { type ReactNode } from 'react'

export default function Fallback(): ReactNode {
    return (
        <div className='w-screen h-screen flex justify-center items-center bg-primary'>
            <div className="w-full max-w-[420px] h-[300px] flex gap-x-5 justify-center bg-dark animate-pulse rounded-[25px]">
            </div>
        </div>
    )
}
