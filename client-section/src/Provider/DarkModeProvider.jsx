import { createContext, useContext, useEffect, useState } from "react";


const DarkContext = createContext();

export const DarkModeProvider = ({ children }) => {

    const darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
    const [isDark, setIsDark] = useState(darkMode || false);


    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);

    return (
        <DarkContext.Provider value={{ isDark, setIsDark }}>
            {children}
        </DarkContext.Provider>
    );
};

export const useDarkMode = () => useContext(DarkContext);

