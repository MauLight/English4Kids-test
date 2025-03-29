import { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDoubleRightIcon } from '@heroicons/react/16/solid'

const containerVariants = {
    initial: {
        scale: 1
    },
    hover: {
        transition: {
            duration: 0.1,
            type: 'spring',
            bounce: 0.2
        }
    },
    click: { scale: 1.04 }
}

const childVariants = {
    initial: { left: -380 },
    hover: { left: 0 },
    click: { opacity: 0 }
}

export default function TeacherButton({ onClick }: { onClick: () => void }): ReactNode {

    return (
        <AnimatePresence>
            <motion.div
                variants={containerVariants}
                initial='initial'
                whileHover='hover'
                whileTap='click'
                onClick={onClick}
                className="relative group w-full rounded-full py-4 bg-primary hover:border-primary active:border-transparent border flex justify-between px-5 items-center text-black overflow-hidden cursor-pointer"
            >
                <p className="text-regular group-hover:text-primary group-active:text-dark transition-color duration-200 ease-out z-20 font-semibold uppercase">Start</p>
                <ChevronDoubleRightIcon className="w-6 h-6 z-20 group-hover:text-primary group-active:text-dark transition-color duration-200 ease-out" />
                <motion.div
                    className='w-full h-full absolute top-0 left-0 bg-dark rounded-full'
                    variants={childVariants}
                ></motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
