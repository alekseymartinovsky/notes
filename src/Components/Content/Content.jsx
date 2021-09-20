import style from './Content.module.scss';
import Card from '../Card/Card';

const Content = ({ data }) => {
    return(
        <div className={style.content}>   
            {
                [...data].reverse().map((el) => {
                    return <Card key={'card_' + el.id} title={el.title} text={el.text} tags={el.tags} id={el.id}/>;
                })
            }
        </div>
    )
}

export default Content;