import  { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

interface Props {
    value: string;
    setValue: (value: string) => void;
}

function Jodit({ value, setValue }: Props) {

const editor = useRef(null);

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
        width: 1000,
        height: 500,
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
            <JoditEditor
                ref={editor}
                value={value}
                config={config}
                onBlur={value => setValue(value)}
            />
        </>
	);
}

export default Jodit;
