import { useState, useEffect } from 'react';
import List from '../components/List';

function Home() {
    let [lists, setLists] = useState([]);
    let [pages, setPages] = useState(1);
    let [searchValue, setSearchValue] = useState('');
    let [sorts, setSorts] = useState('')//created, updated, pushed (lasted update), full_name
    let [directions, setDirections] = useState('desc')// asc, desc

    const getLists = async() => {
        const response = await fetch(
        `https://api.github.com/orgs/facebook/repos?sort=${sorts}&direction=${directions}&per_page=100&page=${pages}`
        // `https://api.github.com/orgs/facebook/repos?per_page=100&page=${pages}`
        ,{
            headers:{
                Authorization : "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"
            }
        })
        const json = await response.json();
        const filteredJson = await json.filter(data => {
            if (data.name.toLowerCase().includes(searchValue.toLowerCase())){
                return(data)
            }
        })
        const sliceJson = (e) =>{
            if(e==0){
                return filteredJson.slice(0,9)
            }else if(e==1){
                return filteredJson.slice(10,19)
            }else if(e==2){
                return filteredJson.slice(20,29)
            }else if(e==3){
                return filteredJson.slice(30,39)
            }
        }
        setLists(sliceJson(0))

        // console.log('객체',Object.keys(filteredJson)[0]) // 객체 첫번째 키 가져오기
        // console.log('객체',filteredJson[Object.keys(filteredJson)[0]]) // 객체 첫번째 값 가져오기
        // console.log('타입', typeof(filteredJson))
        // console.log('랭스', filteredJson.length)
    }

    useEffect(()=>{
        getLists();
    },[searchValue, pages, directionChange]);

    function directionChange() {
        if(directions == 'asc'){
            setDirections('desc')
        }else{
            setDirections('asc')
        }
    };
    
    return (
        <div>
        <h2>Meta Repo</h2>
        {/* <div>Repositories</div> */}
        <div>
            <input value={searchValue} type="text" onChange={(e)=> setSearchValue(e.target.value)}/>
            <span> Language</span>
            <button onClick={()=>directionChange()}>{directions == 'asc' ? "Sort DESC" : "Sort ASC"}</button>
        </div>
        {/* {lists.filter((filterResult)=>{
                if(searchValue == ''){
                    return(filterResult)
                }else if (filterResult.name.toLowerCase().includes(searchValue.toLowerCase())){
                    return(filterResult)
                }
            }).map(data => {
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
            })
        } */}
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
                <button onClick={()=>{pages > 0 && setPages(pages-1)}}>Previous</button>
                <button onClick={()=>{setPages(1)}}>1</button>
                <button onClick={()=>{setPages(2)}}>2</button>
                <button onClick={()=>{setPages(3)}}>3</button>
                <button onClick={()=>{setPages(4)}}>4</button>
                <button onClick={()=>{pages < 4 && setPages(pages+1)}}>Next</button>
            </div>
        </div>
        </div>
    );
}
export default Home;