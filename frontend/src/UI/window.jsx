import { useState } from 'react'


const WindowContent = ({isOpen1,children}) => {



    return (
        <div className='window_content'>
            {children}
        </div>
    )
}

export default WindowContent