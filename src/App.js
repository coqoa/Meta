import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState([]);
  const getLists = async() => {
    const response = await fetch(
      // `https://api.github.com/orgs/facebook/repos?sort=updated&direction=desc&per_page=5&page=1`
      `https://api.github.com/orgs/facebook/repos?sort=updated&direction=desc&per_page=10&page=1`
    )
    const json = await response.json();
    setLists(json)
    setLoading(false)
  }
  useEffect(()=>{
    getLists();
  },[])

  return (
    <div>
      {loading ? 
        <h1>Loading...</h1> : 
        <div>
          {lists.map(list => 
            <div key={list.id}>
              <h3>
                <a href={list.html_url} target="_blank">{list.name}</a>
                <span>{list.visibility}</span>
              </h3>
              
              <div>내용 : {list.description}</div>
              <span>토픽 : {list.topics.map( topic => 
                <div>
                  {topic}
                </div>)
              }</span>
              <span> 언어 : {list.language}</span>
              <span> 별 : {list.stargazers_count}</span>
              <span> 업데이트 시간 : {list.updated_at}</span>
            </div>)
          }
        </div>
      }
    </div>
  );
}

export default App;
