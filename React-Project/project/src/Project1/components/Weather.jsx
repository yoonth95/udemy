import React, { useEffect, useState } from 'react';


const getWeather = (setSuccessWeather, setCityName, setTemp, setTempImg, setTempDescription, setMinTemp, setMaxTemp) => {
    window.navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
        .then(res => res.json())
        .then(data => {
            setCityName(data.name);
            setTemp((data.main.temp - 273.15).toFixed(0)+'°');
            setTempImg(`https://openweathermap.com/img/w/${data.weather[0].icon}.png`);
            setTempDescription(data.weather[0].description);
            setMinTemp((data.main.temp_min - 273.15).toFixed(0)+'°');
            setMaxTemp((data.main.temp_max - 273.15).toFixed(0)+'°');

            setSuccessWeather(true);
        }).catch(error => console.log(error));
    },
    (err) => {
        let str = '';
        if (err.code === err.PERMISSION_DENIED) {
            str = '사용자 거부';
        } else if (err.code === err.POSITION_UNAVAILABLE) {
            str = '지리 정보 없음';
        } else if (err.code === err.TIMEOUT) {
            str = '시간 초과';
        } else {
            str = '알 수 없는 에러';
        }
        alert(str);
        return;
    });
}


const Weather = () => {
    const [successWeather, setSuccessWeather] = useState(false);
    const [cityName, setCityName] = useState('');
    const [temp, setTemp] = useState('');
    const [tempImg, setTempImg] = useState('');
    const [tempDescription, setTempDescription] = useState('');
    const [minTemp, setMinTemp] = useState('');
    const [maxTemp, setMaxTemp] = useState('');

    useEffect(() => {
        getWeather(setSuccessWeather, setCityName, setTemp, setTempImg, setTempDescription, setMinTemp, setMaxTemp);
    }, []);

    return (
        <div className={successWeather ? 'weather' : 'div-none'}>
            <div className='tempInfo'>
                <div>
                    <h3 id='cityName'>{cityName}</h3>
                    <h1 id='temp'>{temp}</h1>
                </div>

                <div>
                    <img src={tempImg} alt="" id='tempImg'/>
                    <p id="tempDescription">{tempDescription}</p>
                </div>
            </div>
            <div className='minMax'>
                최저: <span id='minTemp'>{minTemp}</span>
                최고: <span id='maxsTemp'>{maxTemp}</span>
            </div>
        </div>
    );
};

export default Weather;