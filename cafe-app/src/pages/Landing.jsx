import React, { useState } from 'react';

import logo_image from 'assets/images/logo_image.png';
import mascot_image from 'assets/images/mascot.png';
import google_logo from 'assets/images/google_logo.png';

import "styles/landing.css";

const Landing = () => {
    const [loginStart, setLoginStart] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const inputValue = (e) => {
        const {target} = e;
        const [name, value] = [target.name, target.value];
        if (name === 'email') {
            setEmail(value);
        } else {
            setPassword(value);
        }
    }

    return (
        <>
        {loginStart ? 
            <div className='login'>
                <div className='login-logo'>
                    <img src={logo_image} alt="로고이미지"  width={60} height={60}/>
                    <p>Give My <br />Seat</p>
                </div>
                <div className='login-input'>
                    <input type="text" name="email" value={email} placeholder='Email' onChange={inputValue}/>
                    <input type="password" name="password" value={password} placeholder='Password' onChange={inputValue}/>
                    <button>Login</button>
                    <button><img src={google_logo} alt="구글로고" />Login with Google</button>
                </div>
            </div>
        :
            <div className='login-start'>
                <h1 className='login-title'>
                    <span>Give MY __</span>
                    <span>Seat<img src={logo_image} alt="로고이미지" width={36} height={36}/></span>
                </h1>
                <p className='startBtn' onClick={() => setLoginStart(!loginStart)}>로그인 시작하기</p>
                <img src={mascot_image} className="mascot" alt="마스코트이미지" />
            </div>
        }
        </>
    );
};

export default Landing;