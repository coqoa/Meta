import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faCodeFork } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function List({url, name, visibility, description, topics, language, star, updatedTime}){
  const [timer, setTimer] = useState('00:00:00');
    const [months, setMonths] = useState();
    const [days, setDays] = useState();
    const [hours, setHours] = useState();
    const [updated, setUpdated] = useState();

    const currentTimer = () =>{
      const date = new Date();
      const years = String(date.getFullYear())
      const months = String(date.getMonth()+1).padStart(2,"0")
      const days = String(date.getDay()).padStart(2,"0")
      const hours = String(date.getHours()).padStart(2,"0")
      const minutes = String(date.getMinutes()).padStart(2,"0")
      const seconds = String(date.getSeconds()).padStart(2,"0")
      setTimer(`${years}-${months}-${days}T${hours}:${minutes}:${seconds}Z`)
      setMonths(`${months}`)
      setDays(`${days}`)
      setHours(`${hours}`)
    }
    const lang = (e) =>{
      if (e){
        return '●'
      }else{
        return ''
      }
    }
    useEffect(()=>{
      currentTimer()
      updatedTimer()
    },[months, days, hours])
    //업데이트
    // console.log('월',updatedTime.slice(5,7)) //월
    // console.log('일',updatedTime.slice(8,10)) //일
    // console.log('시',updatedTime.slice(11,13)) //일

    // console.log('업데이트월',updatedTime.slice(5,7)-months)
    // console.log('업데이트일',updatedTime.slice(8,10)-days)
    // console.log('업데이트시',updatedTime.slice(11,13)-hours)

    const updatedTimer = () => {
      const updatedMonths = months-updatedTime.slice(5,7);
      const updatedDays = days-updatedTime.slice(8,10);
      const updatedHours = hours-updatedTime.slice(11,13);

      if(updatedMonths === 0){
        console.log('months : 0')
        if(updatedDays === 0){
          console.log('days : 0')
          setUpdated('updated '+updatedHours+' hours ago')
        }else{
          setUpdated('updated '+updatedDays+' days ago')
        }
      }else{
        setUpdated('updated '+updatedMonths+' months ago')
      }
    }

   
    return (
        <div className="list-shell">
          <h3>
            <a href={url} target="_blank">{name}</a>
            <span>{visibility}</span>
          </h3>
          
          <p className="list-description">{description}</p>
          <p> 
            {topics.map( topic => 
              <span key={topic}>{topic}</span>)
            }
          </p>
          <div className="lang-shell">

            <span><span className={language}>{lang(language)}</span> {language}</span>
            <span> ☆ {star}</span>
            <span> updated {updatedTime}</span>
            <div> 업데이티드 : {updated}</div>
            <div>-</div>
            <div>-</div>
            <div>-</div>
            <div>
              <div> updatedTime : {updatedTime}</div>
              <div> today : {timer}</div>
            </div>
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

