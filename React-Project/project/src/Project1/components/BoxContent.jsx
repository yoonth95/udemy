import React, { useState } from 'react';
import Timer from './Timer';
import NameBox from './NameBox';
import TaskBox from './TaskBox';

const BoxContent = () => {
    const [displayComponent, setDisplayComponent] = useState(true);
    const [name, setName] = useState('');

    const onEnterPress = (NameInput, displayComponent) => {
        setDisplayComponent(!displayComponent);
        setName(NameInput);
    }

    return (
        <div className='content'>
            <Timer/>
            {displayComponent ? <NameBox onEnterPress={onEnterPress}/> : <TaskBox name={name}/>}
        </div>
    );
};

export default BoxContent;