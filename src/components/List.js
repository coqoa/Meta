import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faCodeFork } from "@fortawesome/free-solid-svg-icons";

function List({url, name, visibility, description, topics, language, star, updatedTime}){
    const lang = (e) =>{
      if (e){
        return '●'
      }else{
        return ''
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

