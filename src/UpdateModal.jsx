import React from 'react'

function UpdateModal({body, restart, close}) {    
    return (
        <div>
            <h1>안녕!!!!</h1>
            {body}
            <button onClick={() => close()}>닫기</button>
            <button onClick={() => restart()}>재시작</button>
        </div>
    )
}

export default UpdateModal;
