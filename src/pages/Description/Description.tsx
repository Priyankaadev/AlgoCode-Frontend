import ReactMarkdown from 'react-markdown';
import Dompurify from 'dompurify';
import { useState } from 'react';
import AceEditor from 'react-ace';

import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-c_cpp"
import "ace-builds/src-noconflict/mode-java"
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/ext-language_tools"





function Description({ descriptionText }) {


    const sanitizedMarkdown = Dompurify.sanitize(descriptionText)
    const [activeTab, setActiveTab] = useState('statement')
    const [leftWidth, setLeftWidth] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    const startDragging=(e)=>{
        setIsDragging(true)
        e.preventDefault()
    }

    const stopDragging=(e)=>{
        if (!isDragging) {
           setIsDragging(false) 
        }
    }

    const onDrag = (e)=>{
        if (isDragging) return;

        const newLeftWidth = (e.clientX / window.innerWidth) * 100;
        if(newLeftWidth >10 && newLeftWidth < 90){
            setLeftWidth(newLeftWidth)
        }
    }

    return (
        <div className='container flex w-full h-[100vh]'
        onMouseMove={onDrag}
        onMouseUp={stopDragging}
        >
            <div className='leftPanel h-full overflow-auto' style={{width:`${leftWidth}%}`}}>
                <div className='tabs'>
                    <button onClick={() => setActiveTab('statement')}>Editorial</button>
                    <button onClick={() => setActiveTab('editorial')}>Problem Statement</button>
                    <button onClick={() => setActiveTab('submissions')}>Submission</button>
                </div>

                <div className='markdownViewer p-[20px] basis-1/2 '>
                    <ReactMarkdown>
                        {sanitizedMarkdown}
                    </ReactMarkdown>
                </div>

            </div>

            <div className='divider cursor-col-resize w-[5px] h-full bg-slate-200'
            onMouseDown={startDragging}
            ></div>

            <div className='rightPanel h-full overflow-auto' style={{width:`${100 - leftWidth}%`}}>
                <div className='editorContainer'>
                    <AceEditor
                    mode='cpp'
                    theme='monokai'
                    name='codeEditor'
                    className='editor'
                    style={{width: '100%'}}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion:true,
                        enableSnippets:true,
                        showLineNumbers:true,
                        fontSize:16
                    }}
                    > 

                    </AceEditor>
                </div>
            </div>
        </div>
    )
}

export default Description;