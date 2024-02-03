import React, { useEffect, useState } from "react";
const Modal = (props) => {
    const { children, show = false } = props        
    useEffect(() => {
        document.body.style.overflow = show ? 'hidden' : 'auto';
    }, [show])
    return <>
        {show && <>            
            <div className="fixed top-0 left-0 w-full h-screen bg-indigo-800 flex justify-center items-center z-40 overflow-auto">
                {children}
            </div>
        </>}
    </>
}

export default Modal