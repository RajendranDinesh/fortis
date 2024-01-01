import Editor, { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

import styles from './editor.module.css';

interface EditorProps {
    lang: string | undefined;
    onChange: (value: string | undefined, event: monaco.editor.IModelContentChangedEvent) => void;
}

loader.init().then((monaco) => {
    monaco.editor.defineTheme('customTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
            'editor.background': '#262626',
            'editor.foreground': '#f3f3f3',
        }
    });
    
});

loader.config({
    paths: {
        vs: '/monaco-editor/min/vs'
    }
});

const OurEditor = ({lang, onChange}: EditorProps) => {
    return (
        <Editor
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