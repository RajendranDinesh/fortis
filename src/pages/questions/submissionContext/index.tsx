import { createContext, useState } from "react";

interface SubmissionContextType {
    currentSubmissionId: number | null;
    changeSubmissionId: (submissionId: number) => void;
    currentActiveSubmissionTab: "Table" | "Submission";
    changeActiveSubmissionTab: (tab: "Table" | "Submission") => void;
}

export const SubmissionContext = createContext<SubmissionContextType>({
    currentSubmissionId: null,
    changeSubmissionId: () => { },
    currentActiveSubmissionTab: "Table",
    changeActiveSubmissionTab: () => { }
});

export const SubmissionProvider = ({ children }: React.PropsWithChildren) => {
    const [currentSubmissionId, setCurrentSubmissionId] = useState<number | null>(null);
    const [currentActiveSubmissionTab, setCurrentActiveSubmissionTab] = useState<"Table" | "Submission">("Table");

    const changeSubmissionId = (submissionId: number) => {
        setCurrentSubmissionId(submissionId);
    }

    const changeActiveSubmissionTab = (tab: "Table" | "Submission") => {
        setCurrentActiveSubmissionTab(tab);
    }

    return (
        <SubmissionContext.Provider
            value={{
                currentSubmissionId,
                changeSubmissionId,
                currentActiveSubmissionTab,
                changeActiveSubmissionTab
            }}
        >
            {children}
        </SubmissionContext.Provider>
    );
}