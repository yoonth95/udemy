import React, { useState } from 'react';

const NameBox = ({ onEnterPress }) => {
    let [text, setText] = useState('');

    const inputValue = (e) => {
        if (e.code === 'Enter') {
            if (text.trim() === "") {
                alert('이름을 입력해주시기 바랍니다.');
                return;
            }
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