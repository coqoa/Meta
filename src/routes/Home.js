import { useState, useEffect } from 'react';
import Dropdown from '../components/Dropdown';
import List from '../components/List';
import "../styles/style.css"

function Home() {
    const [lists, setLists] = useState([]);
    const [listView, setListView] = useState([])
    const [pages, setPages] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [sorts, setSorts] = useState('')
    const [language, setLanguage] = useState('')
    const [directions, setDirections] = useState('desc')
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

        
        console.log(localStorage.getItem('searchValue'))
    }
    
    const sliceJson = (e) =>{
        const listSlice = [lists.slice(0,10), lists.slice(10,20), lists.slice(20,30), lists.slice(30,40), ]
        setPages(e)
        return setListView(listSlice[e])
    }
    
    useEffect(()=>{
        getLists();
    },[searchValue, sorts, directions, language]);

    // localStorage.setItem('searchValue',searchValue)
    // localStorage.setItem('sorts',sorts)
    // localStorage.setItem('directions',directions)
    // localStorage.setItem('language',language)

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
        <div className='body'>
            <div className='container'>
                <h2>Meta Repo</h2>
                <div className='sort-shell'>
                    <input className='search-bar' value={searchValue} type="text" placeholder='🔎 Find a repository' onChange={(e)=> setSearchValue(e.target.value)}/>
                    <div className='sort-btn' onClick={()=>directionChange()}>{directions == 'asc' ? "ASC" : "DESC"}</div>
                    <Dropdown title={'Sort'} list={sortList} propFunction={dropdownSort}/>
                    <Dropdown title={'Language'} list={languageList} propFunction={dropdownLanguage}/>
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
                    <div>현재 페이지 : {pages+1}</div>
                    <div className='btn-section'>
                        <div className='prev-btn' onClick={()=>{pages > 0 && sliceJson(pages-1)}}>＜ Previous</div>
                        <div className='num-btn' onClick={()=>{sliceJson(0)}}>1</div>
                        <div className='num-btn' onClick={()=>{sliceJson(1)}}>2</div>
                        <div className='num-btn' onClick={()=>{sliceJson(2)}}>3</div>
                        <div className='num-btn' onClick={()=>{sliceJson(3)}}>4</div>
                        <div className='next-btn' onClick={()=>{pages < 3 && sliceJson(pages+1)}}>Next ﹥</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;