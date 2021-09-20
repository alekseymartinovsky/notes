import { useDebugValue, useEffect, useState } from 'react';
import style from './Edit.module.scss';
import { Link } from 'react-router-dom';
import { Editor, EditorState, ContentState, CompositeDecorator } from 'draft-js';
import 'draft-js/dist/Draft.css';

const Edit = ({ data }) => {
  const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;
  const [title, setTitle] = useState(data.title);
  const [tags, setTags] = useState(data.tags);
  let index = -1;

  const editTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  }

  const HashtagSpan = (props) => {
    useEffect(() => {
      index++;
    }, [])

    useEffect(() => {
      if(props.children[0].props.text.length > 2){
        let arr = tags;
        arr[index] = props.children[0].props.text;
        setTags(arr);
      }else{
        let arr = tags;
        arr[index] = "";    
        setTags(arr);
      }
    }, [props.decoratedText]);

    return (
      <span {...props} style={{color: '#f757e1'}}>
        {props.children}
      </span>
    );
  };
  
  const hashtagStrategy = (contentBlock, callback, contentState) => {
    findWithRegex(HASHTAG_REGEX, contentBlock, callback);
  }

  const decorator = new CompositeDecorator([
    {
      strategy: hashtagStrategy,
      component: HashtagSpan,
    },
  ]);

  const findWithRegex = (regex, contentBlock, callback) => {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index;
      let res = text.slice(start, start + matchArr[0].length);
      callback(start, start + matchArr[0].length);
    }
  }

  const [textEditor, setTextEditor] = useState(
    EditorState.createWithContent(ContentState.createFromText(data.text), decorator)
  )

  const save = () => {
    let finalTags = [];
    tags.map((el) => {
      if(el !== ""){
        finalTags.push(el);
      }
    })
    let note = {
      id: data.id,
      title: title,
      text: textEditor.getCurrentContent().getPlainText('\u0001'),
      tags: tags
    }
    let notes = JSON.parse(localStorage.getItem('notes'));
    notes[data.id] = note;
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  return (
    <div className={style.edit}>
      <h3>Title</h3>
      <input placeholder="write..." className={style.inp_title} type="text" value={title} onChange={editTitle} />
      <h3>Text</h3>
      <div className={style.inp_editor}>
        <Editor placeholder="write..." editorState={textEditor} onChange={setTextEditor}/>
      </div>  
      <h3>Tags</h3>
      <div>
        {
          tags.map((el, id) => {
            return <span className={style.tag} key={"tag_" + id}>{el + " "}</span>
          })
        }
      </div>
      <div className={style.edit_butons}>
        <div className={style.edit_buttons_save}><Link onClick={save} to="/">Save</Link></div>
        <div className={style.edit_buttons_close} ><Link to="/">Close</Link></div>
      </div>
    </div>
  )
}

export default Edit;