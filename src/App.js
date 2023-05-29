import logo from './logo.svg';
import './App.css';
import { Editor } from '@monaco-editor/react';
import { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';


function App() {
  const [code, setCode] = useState('print("Hello, World")');
  var [langueages, setLanguages] = useState('python');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [theme, setTheme] = useState('');
  const [loading, setLoading] = useState(false);
  var isNight = false;
  const languages = [
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "python", label: "Python" },
    { value: "javascript", label: "Js" },
    { value: "java", label: "Java" },
    { value: "go", label: "GoLang" },
    { value: "csharp", label: "C#" },
  ];
  const themes = [
      { value: "vs-dark", label: "Dark" },
      { value: "light", label: "Light" },
  ]

  const handleRun = () => {
    if(langueages == 'python'){
      langueages = 'py'
    }else if(langueages == 'javascript'){
      langueages = 'js'
    }else if(langueages == 'csharp'){
      langueages = 'cs'
    }
    try{
    axios.post('https://api.codex.jaagrav.in',{
      'code':code,
      'language':langueages,
      'input':input
    }).then((res) => {
      if(res.data.output){
        setOutput(res.data.output)
        setLoading(false)
      }else{
        setOutput(res.data.error)
      }
    })
    }catch(err){
      console.log(err);
    }
  }

  const handleValidate = () => {
    setLoading(true)
    if(code == ''){
      alert("Please write some code!!!")
    }else{
      handleRun();
    }
  }

  const handleOnLanguageChange = (language) =>{
    if(language=="python"){
      setCode('# Your First Python Program \nprint("Hello, World")')
    }else if(language=="javascript"){
      setCode('// Your First Javascript Program \nconsole.log("Hellow World")')
    }else if(language=="c"){
      setCode('// Your First C Program \n#include <stdio.h>\nint main()\n{\n\tprintf("Hello World");\n\treturn 0;\n}')
    }else if(language=="cpp"){
      setCode('// Your First C++ Program \n#include <iostream> \nint main() { \n\tstd::cout << "Hello World!"; \n\treturn 0; \n}')
    }else if(language == 'java'){
      setCode('// Your First Program \nclass HelloWorld { \n\tpublic static void main(String[] args) { \n\t\tSystem.out.println("Hello, World!"); \n\t}\n}')
    }else if(language == 'csharp'){
      setCode('// Hello World! program \nnamespace HelloWorld \n{ \n\tclass Hello { \n\t\tstatic void Main(string[] args)\n\t\t{\n\t\t\tSystem.Console.WriteLine("Hello World!");\n\t\t}\n\t}\n}')
    }else if(language == 'go'){
      setCode('package main\nimport "fmt"\nfunc main() {\n\tfmt.Println("hello world")\n}')
    }
  }

  return (
    <div className="App" id='App'>
      <header>
        <p className='logo'>codeEditor</p>
        <div className='optionsMenu'>
          <button onClick={handleValidate}>Run</button>
          <Select className='select' options={languages} onChange={(e) => {
            setLanguages(e.value)
            handleOnLanguageChange(e.value)
          }
          }></Select>
          {/* <Select className='select' options={themes}  onChange={(e) => 
            {
              setTheme(e.value)
              if(e.value == 'vs-dark'){
                isNight = true;
                console.log(isNight)
                var app = document.getElementById('App')
                var outputText = document.getElementById('output')
                app.style.backgroundColor = 'black'
                app.style.color = 'white';
              }else if(e.value == 'light'){
                isNight = false
                console.log(isNight)
                app.style.backgroundColor = 'white';
                app.style.color = 'black';
              }
            }
            }/> */}
        </div>
      </header>
      <main>
      <Editor 
        height='80vh'
        defaultLanguage='python'
        language={langueages}
        theme='light'
        defaultValue='print("Hello, World")'
        value={code}
        onChange={(value) => setCode(value)}
      />
      </main>
      <footer>
        <div className='output' id='output'>
          {/* <p className='output-text' style={{marginTop:0, fontWeight:'bold'}}>Output</p>
          <pre style={{marginTop:0}}>{output}</pre> */}

          {loading ? (
              <p>Loading...</p>
          ) : (
            <div className="output-text">
              <pre>{output}</pre>
            </div>
          )}
        </div>
        <div className='input'>
          <textarea placeholder='Input...' onChange={(e) => setInput(e.target.value)}>

          </textarea>
        </div>
      </footer>
    </div>
  );
}

export default App;
