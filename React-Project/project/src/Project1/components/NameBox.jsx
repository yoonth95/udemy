import React, { useState } from 'react';

const NameBox = ({ onEnterPress }) => {
    let [text, setText] = useState('');

    const inputValue = (e) => {
        if (e.code === 'Enter') {
            onEnterPress(text, true);

            if (!localStorage.getItem(text)) {
                const dic = {
                    todo_list: '',
                    check_list: ''
                }
                localStorage.setItem(text, JSON.stringify(dic));
            }
        }
    }

    return (
        <div className='firstBox'>
            <p>What is your Name?</p>
            <input type="text" value={text} id='input-name' onChange={(e) => setText(e.target.value.trim())} onKeyUp={(e) => inputValue(e)}/>
            <span className='bottom-line'></span>
        </div>
    );
};

export default NameBox;