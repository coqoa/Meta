import { useState, useEffect, useRef } from 'react';
import Dropdown from '../components/Dropdown';
import List from '../components/List';
import "../styles/style.css"

function Home() {
    const [lists, setLists] = useState([]);
    const [listView, setListView] = useState([])
    const [pages, setPages] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [sorts, setSorts] = useState('')//created, updated, pushed (lasted update), full_name
    const [language, setLanguage] = useState('')//created, updated, pushed (lasted update), full_name
    const [directions, setDirections] = useState('desc')// asc, desc
    const [sortSelected, setSortSelected] = useState('')

    const sortList = ['created', 'updated', 'pushed', 'full_name']
    const languageList = ['All', 'C', 'C++', 'Go', 'Hack', 'Haskell', 'HTML', 'Java', 'JavaScript', 'Jupyter Notebook', 'Kotlin', 'Objective-C', 'Objective-C++', 'OCaml', 'PHP', 'Python', 'Ruby', 'Rust', 'Swift', 'TypeScript']

    const getLists = async() => {
        const response = await fetch(
        `https://api.github.com/orgs/facebook/repos?sort=${sorts}&direction=${directions}&per_page=100`
        ,{
            headers:{
                Authorization : "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"
            }
        })

        const json = await response.json();
        // 검색어 필터
        const searchFilter = await json.filter(data => {
            if (data.name.toLowerCase().includes(searchValue.toLowerCase())){
                return(data)
            }
        })
        // 언어 필터
        const langFilter = await searchFilter.filter(filt => {
            if(language === '' || language === 'All'){
                return searchFilter
            }else if(filt.language === language){
                return filt
            }
        })

        setLists(langFilter);
        setListView(langFilter.slice(0,10));
    }

    const sliceJson = (e) =>{
        const listSlice = [lists.slice(0,10), lists.slice(10,20), lists.slice(20,30), lists.slice(30,40), ]
        setPages(e)
        // console.log(listSlice[e])
        return setListView(listSlice[e])
        // if(e===1){
        //     return setListView(lists.slice(0,10))
        // }else if(e===2){
        //     return setListView(lists.slice(11,20))
        // }else if(e===3){
        //     return setListView(lists.slice(21,30))
        // }else if(e===4){
        //     return setListView(lists.slice(31,40))
        // }
        
    }
    // console.log(pages)
    useEffect(()=>{
        getLists();
    },[searchValue, sorts, directions, language]);

    function directionChange() {
        if(directions === 'asc'){
            setDirections('desc')
        }else{
            setDirections('asc')
        }
    };
    const dropdownSort = (e) => {
        setSorts(e)
    }
    const dropdownLanguage = (e) => {
        setLanguage(e)
    }
    return (
        <div>
        <h2>Meta Repo</h2>
        <div>
            <input value={searchValue} type="text" onChange={(e)=> setSearchValue(e.target.value)}/>
            <span> Language</span>
            <button onClick={()=>directionChange()}>{directions == 'asc' ? "Sort DESC" : "Sort ASC"}</button>
            <Dropdown title={'Sort'} list={sortList} selected={sortSelected} setSelected={setSortSelected} propFunction={dropdownSort}/>
            <Dropdown title={'Language'} list={languageList} propFunction={dropdownLanguage}/>
        </div>
        {listView.map((list) => 
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
            <div>현재 페이지 : {pages+1}</div>
            <div>
                <button onClick={()=>{pages > 0 && sliceJson(pages-1)}}>Previous</button>
                <button onClick={()=>{sliceJson(0)}}>1</button>
                <button onClick={()=>{sliceJson(1)}}>2</button>
                <button onClick={()=>{sliceJson(2)}}>3</button>
                <button onClick={()=>{sliceJson(3)}}>4</button>
                <button onClick={()=>{pages < 3 && sliceJson(pages+1)}}>Next</button>
            </div>
        </div>
        </div>
    );
}
export default Home;