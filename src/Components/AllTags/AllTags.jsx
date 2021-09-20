import { Link } from 'react-router-dom';
import style from './AllTags.module.scss';

const AllTags = ({ tags }) => {
    return (
        <div className={style.allTags}>
            <div className={style.tags}>
                <h3>Choose tags:</h3>
                <ul>
                    {
                    (tags.length > 0)
                    ? tags.map((el, id) => {
                        el = el.slice(1, el.length);
                        return <Link key={"linkTag_" + id} to={"find/" + el + "+ "}><li>{"#" + el}</li></Link>
                    })
                    : <div>Please, add tags in you notes</div>
                    }
                </ul>
            </div>
        </div>
    )
}

export default AllTags;