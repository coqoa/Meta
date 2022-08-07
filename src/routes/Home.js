import { useState, useEffect } from 'react';
import Dropdown from '../components/Dropdown';
import List from '../components/List';
import "../styles/style.css"

function Home() {
    const [lists, setLists] = useState([]);
    const [listView, setListView] = useState([]);
    const [searchBy, setSearchBy] = useState(localStorage.getItem('searchBy'));
    const [searchValue, setSearchValue] = useState('');
    const [directions, setDirections] = useState(localStorage.getItem('directions'))
    const [sorts, setSorts] = useState(localStorage.getItem('sorts'))
    const [language, setLanguage] = useState(localStorage.getItem('language'))
    const [pages, setPages] = useState(0);

    // Dropdown.js로 보내는 배열
    const searchList = ['name', 'topic', 'description']
    const sortList = ['created', 'updated', 'pushed', 'full_name']
    const languageList = ['All', 'C', 'C++', 'Go', 'Hack', 'Haskell', 'HTML', 'Java', 'JavaScript', 'Jupyter Notebook', 'Kotlin', 'Objective-C', 'Objective-C++', 'OCaml', 'PHP', 'Python', 'Ruby', 'Rust', 'Swift', 'TypeScript']

    // API 관리함수
    const getLists = async() => {
        await localStor();
        // API불러오기
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
            if(searchBy === 'name'){
                if (data.name.toLowerCase().includes(searchValue.toLowerCase())){
                    return(data)
                }
            }else if(searchBy === 'topic'){
                if (JSON.stringify(data.topics).toLowerCase().includes(searchValue.toLowerCase())){
                    return(data)
                }
            }else if (searchBy === 'description'){
                if (data.description.toLowerCase().includes(searchValue.toLowerCase())){
                    return(data)
                }
            }else if (searchBy === ''){
                if (data.name.toLowerCase().includes(searchValue.toLowerCase())){
                    return(data)
                }
            }
        })

        // language 필터
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
    
    // list object 페이지 분배 함수
    const sliceJson = (e) =>{
        const listSlice = [lists.slice(0,10), lists.slice(10,20), lists.slice(20,30), lists.slice(30,40), ]
        setPages(e)
        return setListView(listSlice[e])
    }
    
    useEffect(()=>{
        getLists();
    },[searchValue, sorts, directions, language, searchBy]);

    // 순서 정렬 함수
    function directionChange() {
        if(directions === 'asc'){
            setDirections('desc')
            localStorage.setItem('directions', 'desc')
        }else{
            setDirections('asc')
            localStorage.setItem('directions', 'asc')
        }
    };
    // 분류 함수
    const dropdownSort = (e) => {
        setSorts(e)
        localStorage.setItem('sorts', e)
    }
    // language 분류 함수
    const dropdownLanguage = (e) => {
        setLanguage(e)
        localStorage.setItem('language', e)
    }

    // 검색 필터 함수
    const dropdownSearch = (e) => {
        setSearchBy(e)
        localStorage.setItem('searchBy', e)
    }

    // 로컬스토리지 저장 함수
    const localStor = () => {
        const getSearchBy = () =>{
            if(localStorage.getItem('searchBy') !== null){
                setSearchBy(localStorage.getItem('searchBy'))
            }else{
                setSearchBy('name');
                localStorage.setItem('searchBy','name')
            }
        }
        const getDirections = () =>{
            if(localStorage.getItem('directions') !== null){
                setDirections(localStorage.getItem('directions'))
            }else{
                setDirections('desc');
                localStorage.setItem('directions','desc')
            }
        }
        const getSorts = () =>{
            if(localStorage.getItem('sorts') !== null){
                setSorts(localStorage.getItem('sorts'))
            }else{
                setSorts('updated');
                localStorage.setItem('sorts','updated')
            }
        }
        const getLanguage = () =>{
            if(localStorage.getItem('language') !== null){
                setLanguage(localStorage.getItem('language'))
            }else{
                setLanguage('All');
                localStorage.setItem('language','All')
            }
        }
        getSearchBy();
        getDirections();
        getSorts();
        getLanguage();
    }

    // 필터 초기화 함수
    const clearFilter = () => {
        setPages(0);
        setSearchValue('');
        localStorage.removeItem('searchBy');
        localStorage.removeItem('directions');
        localStorage.removeItem('sorts');
        localStorage.removeItem('language');
    }
    return (
        <div className='body'>
            <div className='container'>
                <div className='title-shell'>
                    <img className='title-img' src="https://avatars.githubusercontent.com/u/69631?s=60&amp;v=4" width="28" height="28" alt="@facebook" />
                    <div className='title-text'>Meta Repo</div>
                </div>
                <div className='sort-shell'>
                    <span className='search-bar'>
                        <Dropdown title={localStorage.getItem('searchBy') === null ? 'Search by' : searchBy} list={searchList} propFunction={dropdownSearch}/>
                        <input  value={searchValue} type="text" placeholder='Find a repository' onChange={(e)=> setSearchValue(e.target.value)}/>
                    </span>
                    <div className='sort-btn' onClick={()=>directionChange()}>{directions == 'asc' ? "Ascending" : "Descending"}</div>
                    <Dropdown title={localStorage.getItem('sorts') === null ? 'Sort by' : sorts } list={sortList} propFunction={dropdownSort}/>
                    <Dropdown title={'Language'} list={languageList} propFunction={dropdownLanguage}/>
                    <div className='clear-btn-section'>
                        <span className='clear-btn' onClick={()=>clearFilter()}> Filter Clear </span>
                    </div>
                </div>
                <div className='contents-shell'>
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
                </div>
                <div className='btn-shell'>
                    <div className='btn-section'>
                        <div className='prev-btn' onClick={()=>{pages > 0 && sliceJson(pages-1)}}>◀︎ Previous</div>
                        <div className='num-btn' onClick={()=>{sliceJson(0)}}>{pages+1 === 1 ? <span className='selected-btn'>1</span> : 1}</div>
                        <div className='num-btn' onClick={()=>{sliceJson(1)}}>{pages+1 === 2 ? <span className='selected-btn'>2</span> : 2}</div>
                        <div className='num-btn' onClick={()=>{sliceJson(2)}}>{pages+1 === 3 ? <span className='selected-btn'>3</span> : 3}</div>
                        <div className='num-btn' onClick={()=>{sliceJson(3)}}>{pages+1 === 4 ? <span className='selected-btn'>4</span> : 4}</div>
                        <div className='next-btn' onClick={()=>{pages < 3 && sliceJson(pages+1)}}>Next ▶︎</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;