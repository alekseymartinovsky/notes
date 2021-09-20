import style from './Card.module.scss';
import trash from './trash.png';
import { useState } from 'react';
import { Link, Route } from 'react-router-dom';

const Card = ({title, text, tags, id}) => {
    const [render, setRender] = useState(true);
    
    const deleteNote = (e) => {
        e.preventDefault();
        let data = JSON.parse(localStorage.getItem("notes"));
        let newData = data.filter((el, i) => i !== id);
        localStorage.setItem('notes', JSON.stringify(newData));
        setRender(false);
    } 

    return(
        <>
        <Link to={`/edit/${id}`}>  
        <div>
        {
            render
            ? <div className={style.card}>
            <h3 className={style.card_title}><div>{title}</div> <div className={style.card_trash} onClick={deleteNote}><img src={trash} alt="" /></div></h3>
            <p className={style.card_text}>{text}</p>
            <p className={style.card_tags}>
                {
                    tags.map((el, id) => {
                        return <span key={"tag" + id}>{el + " "}</span>;
                    })
                }
            </p>
        </div>
            : null
        }
        </div>
        </Link>
        </>
    )
}

export default Card;
