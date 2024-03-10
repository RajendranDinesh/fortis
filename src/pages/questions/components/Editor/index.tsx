import * as monaco from 'monaco-editor';
import Editor, { loader } from '@monaco-editor/react';

import styles from './editor.module.css';

interface EditorProps {
    value?: string;
    lang: string | undefined;
    onChange: (value: string | undefined, event: monaco.editor.IModelContentChangedEvent) => void;
}

// Change the languages variable if using a different api provider
export const programmingLanguages = [
    { id: 92, name: 'Python', value: 'python' },
    { id: 50, name: 'C', value: 'c' },
    { id: 54, name: 'C++', value: 'c++' },
    { id: 91, name: 'Java', value: 'java' },
    { id: 93, name: 'JavaScript', value: 'javascript' },
];

// const languages = [
//     { id: 71, name: 'Python', value: 'python' },
//     { id: 50, name: 'C', value: 'c' },
//     { id: 54, name: 'C++', value: 'cpp' },
//     { id: 62, name: 'Java', value: 'java' },
//     { id: 63, name: 'JavaScript', value: 'javascript' },
// ];

loader.config({ monaco });

const OurEditor = ({ value = "", lang, onChange }: EditorProps) => {
    return (
        <Editor
            value={value}
            className={styles.editor}
            defaultLanguage={'python'}
            language={lang === 'javascript' ? '' : lang}
            onChange={onChange}
            theme='vs-dark'
            options={{
                quickSuggestions: false,
                parameterHints: {
                    enabled: false
                },
                suggestOnTriggerCharacters: false,
                tabCompletion: "off",
                wordBasedSuggestions: "off",
                contextmenu: false,
                minimap: {
                    enabled: false
                },
            }}
        />
    );
}

export default OurEditor;