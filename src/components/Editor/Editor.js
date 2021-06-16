import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Editor = ({setText}) => {
  
  return (
    <CKEditor
      editor={ClassicEditor}
      data=""
      onReady={(editor) => {
        console.log("Editor ready!", editor);
      }}
      onChange={(event, editor) => {
        // data that gets displayed on screen as you type
        const data = editor.getData();
        setText(data)
        console.log({ event, editor, data });
      }}
      onBlur={(event, editor) => {
        console.log("Blur.", editor);
      }}
      onFocus={(event, editor) => {
        console.log("Focus", editor);
      }}
      
    />
  );
};

export default Editor;
