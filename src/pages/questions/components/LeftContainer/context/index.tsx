import React, { createContext, useState } from "react";

interface LeftContainerContextType {
    currentActiveTab: "Questions" | "Description" | "Submissions";
    changeActiveTab: (tab: "Questions" | "Description" | "Submissions") => void;
}

export const LeftContainerContext = createContext<LeftContainerContextType>({
    currentActiveTab: "Questions",
    changeActiveTab: () => { }
});

export const LeftContainerProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [currentActiveTab, setCurrentActiveTab] = useState<"Questions" | "Description" | "Submissions">("Questions");

    const changeActiveTab = (tab: "Questions" | "Description" | "Submissions") => {
        setCurrentActiveTab(tab);
    }

    return (
        <LeftContainerContext.Provider
            value={{
                currentActiveTab,
                changeActiveTab
            }}
        >
            {children}
        </LeftContainerContext.Provider>
    );
}
