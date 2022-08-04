import PropTypes from "prop-types"

function List({url, name, visibility, description, topics, language, star, updatedTime}){
    return (
        <div>
          <h3>
            <a href={url} target="_blank">{name}</a>
            <span>{visibility}</span>
          </h3>
          
          <p>내용 : {description}</p>
          <p>토픽 : 
            {topics.map( topic => 
              <span key={topic}>{topic}</span>)
            }
          </p>
          <p>
            <span> 언어 : {language}</span>
            <span> 별 : {star}</span>
            <span> 업데이트 시간 : {updatedTime}</span>
          </p>
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

