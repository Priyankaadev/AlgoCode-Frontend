import ReactMarkdown from 'react-markdown';
import Dompurify from 'dompurify';
import { useState } from 'react';
import AceEditor from 'react-ace';
import rehypeRaw from 'rehype-raw';
import Languages from '../../constants/Languages';

import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-c_cpp"
import "ace-builds/src-noconflict/mode-java"
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/ext-language_tools"

import "ace-builds/src-noconflict/theme-tomorrow"
import "ace-builds/src-noconflict/theme-kuroir"
import "ace-builds/src-noconflict/theme-twilight"
import "ace-builds/src-noconflict/theme-xcode"
import "ace-builds/src-noconflict/theme-textmate"
import "ace-builds/src-noconflict/theme-solarized_dark"
import "ace-builds/src-noconflict/theme-solarized_light"
import "ace-builds/src-noconflict/theme-terminal"


type themeStyle = {
    themeName: string,
    value: string
}


function Description({ descriptionText }: { descriptionText: string }) {


    const sanitizedMarkdown = Dompurify.sanitize(descriptionText)
    const [activeTab, setActiveTab] = useState('statement')
    const [leftWidth, setLeftWidth] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    const [language, setLanguage] = useState('javascript');
    const [theme, setTheme] = useState('monokai');

    const startDragging = (e: MouseEvent) => {
        setIsDragging(true)
        e.preventDefault()
    }

    const stopDragging = (e: MouseEvent) => {
        if (isDragging) {
            setIsDragging(false)
        }
    }

    const onDrag = (e: MouseEvent) => {
        if (!isDragging) return;

        const newLeftWidth = (e.clientX / window.innerWidth) * 100;
        if (newLeftWidth > 10 && newLeftWidth < 90) {
            setLeftWidth(newLeftWidth)
        }
    }

    const isActiveTab = (tabName : string)=>{
        if (activeTab == tabName) {
            return 'tab tab-active';
        }else {
            return 'tab'
        }
    }

    return (
        <div className=' flex w-full h-[100vh]'
            onMouseMove={onDrag}
            onMouseUp={stopDragging}
        >
            <div className='leftPanel h-full overflow-auto' style={{ width: `${leftWidth}%` }}>
               
                <div role="tablist" className="tabs tabs-boxed tabs-sm w-2/4">
                    <a  onClick={() => setActiveTab('statement')} role="tab" className={isActiveTab("statement")}>Problem Statement </a>
                    <a onClick={() => setActiveTab('editorial')} role="tab" className={isActiveTab("editorial")}>Editorial</a>
                    <a onClick={() => setActiveTab('submissions')} role="tab" className={isActiveTab("submissions")}>Submission</a>
                </div>

                <div className='markdownViewer p-[20px] basis-1/2 '>
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                        {sanitizedMarkdown}
                    </ReactMarkdown>
                </div>

            </div>

            <div className='divider bg-red-400 cursor-col-resize w-[5px] h-full bg-slate-200'
                onMouseDown={startDragging}
            ></div>

            <div className='rightPanel h-full overflow-auto' style={{ width: `${100 - leftWidth}%` }}>
                <div className='flex justify-start items-center py-2 px-4 gap-2'>
                    <div>
                    <button className="btn btn-warning btn-sm">Run</button>
                    </div>
                    <div>
                    <button className="btn btn-success btn-sm">Submit</button>
                    </div>
                    <div>
                    <select className='select select-sm select-info select-bordered w-full max-w-xs' 
                    value={language}
                    onChange={(e)=> setLanguage(e.target.value) }
                    >
                        {Languages.map((language: languageSupport)=>(
                             <option key={language.value} value={language.value}>{language.languageName}</option>
                        ) )}
                   
                    </select>
                    </div>
        
                    <div>
                    <select 
                    className='select select-info w-full select-sm max-w-xs'
                    value={theme}
                    onChange={(e)=> setTheme(e.target.value)}
                    >
                        {Themes.map((theme : themeStyle)=>(
                            <option key={theme.value} value={theme.value}>{theme.themeName}</option>
                        ))}
                        
                    </select>
                    </div>
        
                </div>
                
                <div className='editorContainer'>
                    <AceEditor
                        mode={language}
                        theme={theme}
                        name='codeEditor'
                        className='editor'
                        style={{ width: '100%' }}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                            fontSize: 16
                        }}
                    >

                    </AceEditor>
                </div>
            </div>
        </div>
    )
}

export default Description;