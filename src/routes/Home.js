import { useState, useEffect } from 'react';
import List from '../components/List';

function Home() {
    let [lists, setLists] = useState([]);
    let [pages, setPages] = useState(1);
    let [searchValue, setSearchValue] = useState('');
    let [sorts, setSorts] = useState('updated')//created, updated, pushed (lasted update), full_name
    let [directions, setDirections] = useState('asc')// asc, desc

    const getLists = async() => {
        const response = await fetch(
        `https://api.github.com/orgs/facebook/repos?sort=${sorts}&direction=${directions}&per_page=100&page=${pages}`
        )
        const json = await response.json();
        console.log('제이슨랭스',json.length)
        // console.log('제이슨',json)
        setLists(json)
    }

    useEffect(()=>{
        getLists();
    },[pages]);

    // function directionChange() {
    //     if(directions == 'asc'){
    //         setDirections('desc')
    //     }else{
    //         setDirections('asc')
    //     }
    // };
    
    return (
        <div>
        <h2>Meta</h2>
        <div>Repositories</div>
        <div>
            <input value={searchValue} type="text" onChange={(e)=> setSearchValue(e.target.value)}/>
            <span> Language</span>
            {/* <button onClick={()=>directionChange()}>{directions == 'asc' ? "Sort DESC" : "Sort ASC"}</button> */}
        </div>

        {lists.filter((e)=>{
            if(searchValue == ''){
                // console.log('true',e)
                return(e)
            }else if (e.name.toLowerCase().includes(searchValue.toLowerCase())){
                // console.log('false',e)
                return(e)
            }
        }).map(data => {
            // return <p>
            //     {data.name}
            //     </p>
            return <List 
                key={data.name}
                url={data.html_url}
                name={data.name}
                visibility={data.visibility}
                description={data.description}
                topics={data.topics}
                language={data.language}
                star={data.stargazers_count}
                updatedTime={data.updated_at}
            />
        })}
        
        {/* {lists.map((list) => 
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
        )} */}

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