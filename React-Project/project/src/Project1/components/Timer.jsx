import React, { useState, useEffect } from 'react';

const Timer = () => {
    let [timer, setTimer] = useState(new Date());

    const timerFormat = (timer) => {
        const h = String(timer.getHours()).padStart(2, '0');
        const m = String(timer.getMinutes()).padStart(2, '0');
        const s = String(timer.getSeconds()).padStart(2, '0');

        return `${h}:${m}:${s}`;
    }

    useEffect(() => {
        const interval = setInterval(() => setTimer(new Date()), 1000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className='timer'>
            {timerFormat(timer)}
        </div>
    );
};

export default Timer;