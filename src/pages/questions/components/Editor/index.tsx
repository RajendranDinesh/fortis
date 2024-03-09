import Editor, { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

import styles from './editor.module.css';

interface EditorProps {
    value?: string;
    lang: string | undefined;
    onChange: (value: string | undefined, event: monaco.editor.IModelContentChangedEvent) => void;
}

loader.config({
    paths: {
        vs: `${process.env.PUBLIC_URL}/monaco-editor/min/vs`
    }
});

loader.init().then((monaco1) => {
    monaco1.editor.defineTheme('customTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
            'editor.background': '#262626',
            'editor.foreground': '#f3f3f3',
        }
    });
    
});


loader.config({ monaco });

const OurEditor = ({value="", lang, onChange}: EditorProps) => {
    return (
        <Editor
          value={value}
          className={styles.editor}
          defaultLanguage={'python'}
          language={lang}
          onChange={onChange}
          theme='customTheme'
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