import { useState, useEffect } from 'react';
import List from '../components/List';

function Home() {
    let [lists, setLists] = useState([]);
    let [pages, setPages] = useState(1);
    let [searchValue, setSearchValue] = useState('');
    let [sorts, setSorts] = useState('stargazers')//created, updated, pushed (lasted update), full_name
    let [directions, setDirections] = useState('asc')// asc, desc
    const getLists = async() => {
        const response = await fetch(
        // `https://api.github.com/orgs/facebook/repos?sort=updated&direction=desc&per_page=5&page=1`
        // `https://api.github.com/orgs/facebook/repos?sort=${sorts}&direction=${directions}&per_page=10&page=${pages}`
        `https://api.github.com/orgs/facebook/repos?sort=${sorts}&direction=${directions}&page=${pages}`
        )
        const json = await response.json();
        setLists(json)
    }
    useEffect(()=>{
        getLists();
        console.log(sorts, directions)
    },[pages, searchValue, sorts, directions]);

    function directionChange() {
        if(directions == 'asc'){
            setDirections('desc')
        }else{
            setDirections('asc')
        }
    };
    
    function searchValueList(e) {
        setSearchValue(e)
        // console.log(e)
        lists.filter((e)=>{
            
        })
    }
    
    return (
        <div>
        <h2>Meta</h2>
        <div>Repositories</div>
        <div>
            <input value={searchValue} type="text" onChange={(e)=> searchValueList(e.target.value)}/>
            <span> Language</span>
            <button onClick={()=>directionChange()}>{directions == 'asc' ? "Sort DESC" : "Sort ASC"}</button>
        </div>

        {lists.map((list) => 
            <List 
                key={list.name}
                url={list.html_url}
                name={list.name}
                visibility={list.visibility}
                description={list.description}
                topics={list.topics}
                language={list.language}
                star={list.stargazers_count}
                updatedTime={list.updated_at}
            />
        )}

        <div>
            <div>현재 페이지 : {pages}</div>
            <div>
                <button onClick={()=>{setPages(pages-1)}}>Previous</button>
                <button onClick={()=>{setPages(1)}}>1</button>
                <button onClick={()=>{setPages(2)}}>2</button>
                <button onClick={()=>{setPages(3)}}>3</button>
                <button onClick={()=>{setPages(4)}}>4</button>
                <button onClick={()=>{setPages(pages+1)}}>Next</button>
            </div>
        </div>
        </div>
    );
}
export default Home;