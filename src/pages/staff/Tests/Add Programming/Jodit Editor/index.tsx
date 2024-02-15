import React, { useState, useRef, useMemo } from 'react';
// import Jodit from "jodit";
// import 'jodit/build/jodit.min.css';
import JoditEditor from 'jodit-react';
import { editorConfig } from './EditorConfig';
import styles from '../addProgramming.module.css'

function Jodit() {
const [data, setData] = useState('');
const editor = useRef(null);

const handleSaveQuestion = () => {
    console.log(data);
};

const config = useMemo(
    () => ({
        readonly: false,
        toolbar: true,
        spellcheck: true,
        language: 'en',
        showCharsCounter: true,
        showWordsCounter: true,
        showXPathInStatusbar: false,
        askBeforePasteHTML: true,
        askBeforePasteFromWord: true,
        uploader: {
            insertImageAsBase64URI: true
        },
        width: 700,
        height: 600,
        placeholder: "Start Typing in your question...",
        controls: {
            font: {
                command: 'fontname',
                list: {
                    "'Open Sans',sans-serif": 'Open Sans',
                    'Helvetica,sans-serif': 'Helvetica',
                    'Arial,Helvetica,sans-serif': 'Arial',
                    'Georgia,serif': 'Georgia',
                    'Impact,Charcoal,sans-serif': 'Impact',
                    'Tahoma,Geneva,sans-serif': 'Tahoma',
                    "'Times New Roman',Times,serif": 'Times New Roman',
                    'Verdana,Geneva,sans-serif': 'Verdana',
                    'Consolas,monaco,monospace': 'Consolas'
                }
            }
        }
    }),
    []
);

	return (
        <>
        <div
			style={{ maxWidth: editorConfig.width, margin: '0 auto' }}
		>
			<JoditEditor
                ref={editor}
                value={data}
                config={config}
                onBlur={value => setData(value)}
            />
		</div>
        <div className={styles.addProgramming_body_middle_bottom}>
            <button onClick={handleSaveQuestion}>Save Question</button>
        </div>
        </>
	);
}

export default Jodit;
