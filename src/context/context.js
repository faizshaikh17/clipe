import { createContext, useContext } from "react";

export const themeContext = createContext({
    themeMode: 'light',
    lightTheme: () => { },
    darkTheme: () => { },
})

export const ThemeProvider = themeContext.Provider

export const useTheme = () => {
    return useContext(themeContext);
}