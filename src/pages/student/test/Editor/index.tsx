import * as monaco from 'monaco-editor';
import Editor, { loader } from '@monaco-editor/react';

import styles from './editor.module.css';

interface EditorProps {
    value?: string;
    lang: string | undefined;
}
loader.config({ monaco });

const AnswerEditor = ({ value = "", lang }: EditorProps) => {
    return (
        <Editor
            value={value}
            className={styles.editor}
            defaultLanguage={'python'}
            language={lang === 'javascript' ? '' : lang}
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
                readOnly: true, // makes the editor read-only
            }}
        />
    );
}

export default AnswerEditor;