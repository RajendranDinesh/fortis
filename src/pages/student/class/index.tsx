import { useState } from "react";
import { useParams } from "react-router-dom"

export default function Class() {

    const { classId } = useParams();

    const [activeTabId, setActiveTabId] = useState(0);

    const tabContent = [
        {
            id: 0,
            displayString: "Tests",
            content: <>Tests</>
        },
        {
            id: 1,
            displayString: "Staff",
            content: <>Staff</>
        }
    ]
    
    return(
        <div>
            <h1>Class {classId}</h1>

            <div>
                {tabContent.map((tab) =>
                <div>
                    <button
                    onClick={() => setActiveTabId(tab.id)}
                    >{tab.displayString}</button>
                </div>)}
            </div>

            <div>
                {tabContent[activeTabId].content}
            </div>

        </div>
    )
}