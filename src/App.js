import { createHashHistory } from "history"
import style from './App.module.scss';
import Header from './Components/Header/Header';
import Content from './Components/Content/Content';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import data from './data.json';
import Edit from './Components/Edit/Edit';
import AllTags from './Components/AllTags/AllTags';

function App() {
  let info;
  const customHistory = createHashHistory()

  const getData = () => {
    if (localStorage.getItem('notes') !== null) {
      info = JSON.parse(localStorage.getItem('notes'));
    } else {
      localStorage.setItem('notes', JSON.stringify(data));
      info = data;
    }
  }

  getData();

  return (
    <BrowserRouter history={customHistory}>
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path="/">
            {
              () => {
                getData();
                return <Content data={info} />
              }
            }
          </Route>
          <Route path="/create">
            {
              () => {
                getData();
                return (
                  <div>
                    <Edit data={{ id: info.length, title: "", text: "", tags: [] }} />  
                  </div>
                )
              }
            }
          </Route>
          <Route path="/edit/:id">
            {
              () => {
                getData();
                let url = window.location.href.split('/');
                let id = url[url.length - 1];
                return <Edit data={info[id]} />
              }
            }
          </Route>
          <Route path="#/find/:tag">
            {
              () => {
                let findedEl = [];
                let url = window.location.href.split('/');
                let tag = '#' + url[url.length - 1];
                tag = tag.slice(0, tag.length - 1);

                getData();
                info.map((el) => {
                  el.tags.map((t) => {
                    if (t == tag) {
                      findedEl.push(el);
                    }
                  })
                })

                if (findedEl.length > 0) {
                  return <Content data={findedEl} />
                } else {
                  return <div className={style.notFound}>No notes found</div>
                }
              }
            }
          </Route>
          <Route path="/allTags">
            {
              () => {               
                getData();
                let tags = [];
                info.map((el) => {
                  el.tags.map((tag) => {
                    if(!tags.includes(tag)){
                      tags.push(tag);
                    }
                  })
                })
                console.log(tags)
                return <AllTags tags={tags} />
              }
            }
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
