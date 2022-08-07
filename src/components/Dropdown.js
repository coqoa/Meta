import { useState } from 'react';

function Dropdown(props){
    const [isActive, setIsActive] = useState(false)
    const [title, setTitle] = useState(props.title)

    //상위 컴포넌트로 props 전송하고 isActive를 반대 값으로 변경해서 드롭 다운 리스트를 닫아주는 함수
    const chooseType = (e) =>{
        props.propFunction(e)
        setIsActive(!isActive)
    }
    
    return(
        <div className="dropdown">
            <div className="dropdown-btn" onClick={()=>setIsActive(!isActive)}>{title}</div>
            {isActive && (
                <div className="dropdown-content">
                    {props.list.map((sortList)=>(
                        <div className="dropdown-item" onClick={(e)=>{
                            chooseType(e.target.textContent); 
                            setTitle(e.target.textContent);
                        }}>
                            {sortList}
                        </div>    
                    ))}
                </div>
            )}
        </div>
    )
}
export default Dropdown