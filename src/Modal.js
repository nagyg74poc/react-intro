import React, {useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';


export const Modal = ({children}) => {
    const elRef = useRef(null);
    if (!elRef.current) {
        const div = document.createElement('div');
        div.className = 'modalContainer';
        elRef.current = div;
    }

    useEffect(() => {
        const modalRoot = document.getElementById('modal');
        modalRoot.appendChild(elRef.current);

        return () => modalRoot.removeChild(elRef.current);
    }, []);

    return createPortal(<div className="modalBody">{children}</div>, elRef.current);
};

export default Modal;
