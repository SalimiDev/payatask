import { createContext, useState, useEffect } from 'react';

export const DarkModeContext = createContext();

export default function DarkModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const isDarkModeLS = localStorage.getItem('isDarkMode');
        if (isDarkModeLS === 'true') {
            setIsDarkMode(true);
            document.body.classList.add('dark');
        } else if (isDarkModeLS === 'false') {
            setIsDarkMode(false);
            document.body.classList.remove('dark');
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setIsDarkMode(true);
            document.body.classList.add('dark');
        }
    }, []);

    function toggleDarkMode() {
        setIsDarkMode(prevMode => {
            const newMode = !prevMode;
            if (newMode) {
                document.body.classList.add('dark');
                localStorage.setItem('isDarkMode', 'true');
            } else {
                document.body.classList.remove('dark');
                localStorage.setItem('isDarkMode', 'false');
            }
            return newMode;
        });
    }

    return <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
                        {children}
                </DarkModeContext.Provider>;
}
