import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faCodeFork } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function List({url, name, visibility, description, topics, language, star, updatedTime}){
  const [timer, setTimer] = useState('00:00:00');
    const [years, setYears] = useState();
    const [months, setMonths] = useState();
    const [days, setDays] = useState();
    const [hours, setHours] = useState();
    const [updated, setUpdated] = useState();

    const currentTimer = () =>{
      const date = new Date();
      const year = String(date.getFullYear());
      const month = String(date.getMonth()+1).padStart(2,"0");
      const day = String(date.getDate()).padStart(2,"0");
      const hour = String(date.getHours()).padStart(2,"0");
      const minute = String(date.getMinutes()).padStart(2,"0");
      const second = String(date.getSeconds()).padStart(2,"0");
      setTimer(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`);
      setYears(year)
      setMonths(month)
      setDays(parseInt(day))
      setHours(parseInt(hour))
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
    },[months, days, hours, updated])

    const updatedTimer = () => {


      const updatedYears = updatedTime.slice(0,4);//string
      const updatedMonths = updatedTime.slice(5,7);//string
      const updatedDays = parseInt(updatedTime.slice(8,10));//number
      const updatedHours = parseInt(updatedTime.slice(11,13));//number
      
      if(updatedYears === years){
        if(updatedMonths === months){
          if(updatedDays === days){
            setUpdated('update '+(hours-updatedHours)+' hours ago')
          }else{
            setUpdated('update '+ (days-updatedDays)+' days ago')
          }
        }else{
          setUpdated('updated '+updatedYears+' / '+updatedMonths)
        }
      }else{
        setUpdated('updated '+updatedYears+' / '+updatedMonths)
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
          <div className="lang-shell">

            <span><span className={language}>{lang(language)}</span> {language}</span>
            <span> ☆ {star}</span>
            <span> {updated} </span>
            <div>--------</div>
            <div>--참고--</div>
            <div>--------</div>
            <div>현재시간 : {timer}</div>
            <div>업데이트 시간 : {updatedTime}</div>
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

