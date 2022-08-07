import PropTypes from "prop-types"
import { useEffect, useState } from "react";

function List({url, name, visibility, description, topics, language, star, updatedTime}){
  // const [timer, setTimer] = useState('00:00:00');
    const [years, setYears] = useState();
    const [months, setMonths] = useState();
    const [days, setDays] = useState();
    const [hours, setHours] = useState();
    const [updated, setUpdated] = useState();

    const currentTimer = () =>{
      // 현재 시간을 알아내는 함수
      const date = new Date();
      const year = String(date.getFullYear());
      const month = String(date.getMonth()+1).padStart(2,"0");
      const day = String(date.getDate()).padStart(2,"0");
      const hour = String(date.getHours()).padStart(2,"0");
      // const minute = String(date.getMinutes()).padStart(2,"0");
      // const second = String(date.getSeconds()).padStart(2,"0");
      // setTimer(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`);
      setYears(year)
      setMonths(month)
      setDays(parseInt(day))
      setHours(parseInt(hour))
    }

    // language 데이터가 있으면 출력하고 없으면 출려하지 않는 함수
    const dot = (e) =>{
      if (e){
        return '●'
      }else{
        return ''
      }
    }
    useEffect(()=>{
      currentTimer()
      updatedTimer()
    },[months, days, hours, updated])

    const updatedTimer = () => {


      const updatedYears = updatedTime.slice(0,4);//string
      const updatedMonths = updatedTime.slice(5,7);//string
      const updatedDays = parseInt(updatedTime.slice(8,10));//number
      const updatedHours = parseInt(updatedTime.slice(11,13));//number
      // 업데이트 년도와 현재 년도를 비교
      if(updatedYears === years){
        // 업데이터 월과 현재 월을 비교
        if(updatedMonths === months){
          // 업데이트 일자와 현재 일자를 비교
          if(updatedDays === days){
            // 일자가 같으면 시간 계산 후 출력
            setUpdated('updated '+(hours-updatedHours)+' hours ago')
          }else{
            // 일자가 다르면 일자 계산 후 출력
            setUpdated('updated '+ (days-updatedDays)+' days ago')
          }
        }else{
          // 해당 년.월을 출력
          setUpdated('updated on '+updatedYears+'.'+updatedMonths)
        }
      }else{
        // 해당 년.월을 출력
        setUpdated('updated on '+updatedYears+'.'+updatedMonths)
      }
    }

    return (
        <div className="list-shell">
          <h3>
            <a href={url} target="_blank">{name}</a>
            <span>{visibility}</span>
          </h3>
          <p className="description-shell">{description}</p>
          <p className="topic-shell"> 
            {topics.map( topic => 
              <span key={topic} className="topic-badge">{topic}</span>)
            }
          </p>
          <div className="bottom-shell">

            <span><span className={language}>{dot(language)}</span> {language}</span>
            <span>  
              <svg aria-hidden="true" height="11" viewBox="0 0 16 16" version="1.1" width="11" data-view-component="true" class="octicon octicon-star">
                <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
              </svg>
              {star}
            </span>
            <span> {updated} </span>
          </div>
        </div>
    );
}
List.propTypes = {
  // key: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  visibility: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  topics: PropTypes.arrayOf(PropTypes.string).isRequired,
  language: PropTypes.string,
  star: PropTypes.number.isRequired,
  updatedTime: PropTypes.string.isRequired
};
export default List;

