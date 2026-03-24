"use client"

// import Mini3dGame from "@/components/mini3dGame/Mini3dGame";
import { createContext, useContext, ReactNode, useMemo, useState, useRef, useEffect } from "react"


interface DefaultContext {
    [x: string]: any;
}

const defaultState = {};

const AppContext = createContext<DefaultContext>(defaultState);

export const useAppContext = () => useContext(AppContext)

export const AppProvider = ( { children }: { children: ReactNode } ) => {
    // const mini3dGame = useMemo(() => <Mini3dGame />, [])
    const [enabledMusic, setEnabledMusic] = useState(false);
    const [enabled3dSpline, setEnabled3dSpline] = useState(true);
    const [screenSize, setScreenSize] = useState(0);
    const [smallDevices, setSmallDevices] = useState(false);
    const [topArtistEndpoint, setTopArtistEndpoint] = useState('')

    const themeList = [
        {
            name: "Default",
            bg_outside: "#010c15",
            primary: "#011627",
            secondary: "aliceblue",
            tertiary: "#6a86a1",
            accent: "#43d9ad",
            button_hover: "#0f2233",
            button_active: "rgba(0, 0, 0, 0.2)",
            line: "#1e2d3d",
            type: "dark"
        },
        {
            name: "Snowy (Development)",
            bg_outside: "#D8D9DA",
            primary: "#fff",
            secondary: "#1b232b",
            tertiary: "#61677A",
            accent: "#27272a",
            button_hover: "#f8f8f8",
            button_active: "rgba(0, 0, 0, 0.07)",
            line: "#c3c9d3",
            type: "light"
        },
        {
            name: "Elegant",
            bg_outside: "#10161d",
            primary: "#040D12",
            secondary: "#F1F6F9",
            tertiary: "#607b96",
            accent: "#2f5197",
            button_hover: "#102733",
            button_active: "#07141b",
            line: "#0b1c25",
            type: "dark"
        },
        {
            name: "Peach",
            bg_outside: "#A2678A",
            primary: "#35152e",
            secondary: "white",
            tertiary: "#aaa",
            accent: "#E19898",
            button_hover: "#472542",
            button_active: "rgba(0, 0, 0, 0.2)",
            line: "#5a2f51",
            type: "dark"
        },
        {
            name: "Azure",
            bg_outside: "#081F37",
            primary: "#03001C",
            secondary: "aliceblue",
            tertiary: "#607b96",
            accent: "#8DC6FF",
            button_hover: "#0f2233",
            button_active: "rgba(0, 0, 0, 0.2)",
            line: "#0e1720",
            type: "dark"
        },
        {
            name: "Coffee",
            bg_outside: "#EED6C4",
            primary: "#171010",
            secondary: "white",
            tertiary: "#aaa",
            accent: "#EABF9F",
            button_hover: "#574343",
            button_active: "rgba(0, 0, 0, 0.2)",
            line: "#332525",
            type: "dark"
        },
        {
            name: "Vermilion",
            bg_outside: "#7D1935",
            primary: "#420516",
            secondary: "white",
            tertiary: "#aaa",
            accent: "#E23E57",
            button_hover: "#580404",
            button_active: "rgba(0, 0, 0, 0.25)",
            line: "#691414",
            type: "dark"
        },
        {
            name: "Xanthous",
            bg_outside: "#0e1016",
            primary: "#1A1D26",
            secondary: "white",
            tertiary: "#aaa",
            accent: "#ffeb3c",
            button_hover: "#222631",
            button_active: "rgba(0, 0, 0, 0.25)",
            line: "#2b303d",            
            type: "dark"
        },
    ]

    const [theme, setTheme] = useState({
        name: "Default",
        bg_outside: "#010c15",
        primary: "#011627",
        secondary: "aliceblue",
        tertiary: "#6a86a1",
        accent: "#43d9ad",
        button_hover: "#0f2233",
        button_active: "rgba(0, 0, 0, 0.2)",
        line: "#1e2d3d",
        type: "dark"
    })

    function storageExist(){
        if(typeof (Storage) === undefined) return false
        return true
    }

    function loadDataFromStorage(){

        const themeLocalStorage = localStorage.getItem("theme");
        if(themeLocalStorage != null){
            const parsedTheme = JSON.parse(themeLocalStorage)
            const html = document.querySelector<any>("html");
            const root = document.querySelector<any>(":root");
            root.style.setProperty("--bg-outside", parsedTheme.bg_outside)
            root.style.setProperty("--primary", parsedTheme.primary)
            root.style.setProperty("--secondary", parsedTheme.secondary)
            root.style.setProperty("--tertiary", parsedTheme.tertiary)
            root.style.setProperty("--accent", parsedTheme.accent)
            root.style.setProperty("--button-hover", parsedTheme.button_hover)
            root.style.setProperty("--button-active", parsedTheme.button_active)
            root.style.setProperty("--line", parsedTheme.line)
            html.className = parsedTheme.type == "dark" ? "dark" : "light"
            setTheme(parsedTheme)
        }
    }

    useEffect(() => {
        if(storageExist()){
            loadDataFromStorage();
        }

        setScreenSize(window.innerWidth);
        if(window.innerWidth < 1024) {
            setSmallDevices(true)
            setEnabled3dSpline(false)
        }
    }, []);

    const contextValue = {
        ...defaultState,
        // mini3dGame,
        enabledMusic,
        setEnabledMusic,
        enabled3dSpline,
        setEnabled3dSpline,
        screenSize,
        setScreenSize,
        smallDevices,
        topArtistEndpoint,
        setTopArtistEndpoint,
        theme,
        setTheme,
        themeList,
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )

}



