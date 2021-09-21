import { Link } from 'react-router-dom';
import style from './Header.module.scss';
import { useState } from 'react';

const Header = ({find}) => {
    const [inp, setInp] = useState('');

    const changeInp = (e) => {
        e.preventDefault();
        setInp(e.target.value);
    }

    return (
        <div className={style.header}>
            <Link to="/">Notes</Link>
            <Link to="/create">Create</Link>
            <Link to="/allTags">Check tags</Link>
            <form action={`/find/${inp}`}>
                # <input type="text" placeholder="tag" value={inp} onChange={changeInp} />
                <button>Find</button>
            </form>
        </div>
    )
}

export default Header;