import { useState } from 'react';

function Dropdown(props){
    const [isActive, setIsActive] = useState(false)
    const [title, setTitle] = useState(props.title)
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
                        <div 
                            // onClick={e=> props.setSortSelected(e.target.textContent)} 
                            className="dropdown-item" 
                            onClick={(e)=>{
                                chooseType(e.target.textContent); 
                                setTitle(e.target.textContent);
                            }}
                        >
                            {sortList}
                        </div>    
                        ))}
                    
                    {/* <div className="dropdown-item" onClick={(e)=>chooseType(e.target.textContent)}>
                        created
                    </div>
                    <div className="dropdown-item"  onClick={(e)=>chooseType(e.target.textContent)}>
                        updated
                    </div>
                    <div className="dropdown-item"  onClick={(e)=>chooseType(e.target.textContent)}>
                        pushed
                    </div>
                    <div className="dropdown-item"  onClick={(e)=>chooseType(e.target.textContent)}>
                        full_name
                    </div> */}
                </div>
            )}
        </div>
    )
}
export default Dropdown