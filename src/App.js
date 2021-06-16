import "./App.css";
import React from 'react'
import Editor from './components/Editor/Editor.js'
import CountButton from './components/WordCount/CountButton'

function App() {
  const [text, setText] = React.useState('')
  return (
    <div className="App">
      <h2>MinimalEditor</h2>
      <CountButton text={text}/>
      <div style={{"height": "20px"}}></div>
      <Editor setText={setText}/>
    </div>
  );
}

export default App;
