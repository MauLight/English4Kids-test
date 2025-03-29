'use client'

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react"

interface ThemeContextProps {
    theme: string
    setTheme: Dispatch<SetStateAction<string>>
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<string>('light')

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = (): ThemeContextProps => {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }

    return context
}