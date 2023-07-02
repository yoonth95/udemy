import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faChevronLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

import styles from "styles/Chat.module.css";


const Chat = () => {
    const socketRef = useRef();

    const [isOpen, setIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const [chatID, setChatID] = useState('');
    const [chatMessage, setChatMessage] = useState('');

    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        socketRef.current = io('http://localhost:3001');

        socketRef.current.on('message', handleMessage);
        return () => {
            socketRef.current.off('message', handleMessage);
            socketRef.current.disconnect();
        }
    }, []);

    const handleMessage = (message) => {
        setMessageList(prev => [...prev, message]);
    }

    const chatLogin = () => {
        if (chatID.trim() === '') {
            alert("이름을 입력해주시기 바랍니다.");
            return;
        }
        setIsLogin(!isLogin);
    }

    const sendMessage = () => {
        if (chatMessage.trim() === '') {
            alert("메시지를 입력해주시기 바랍니다.");
            return;
        }
        const time = new Date();
        const h = String(time.getHours()).padStart(2, '0');
        const m = String(time.getMinutes()).padStart(2, '0');
        socketRef.current.emit('message', {
            idx: new Date().getTime(),
            name: chatID,
            content: chatMessage,
            time: `${h}:${m}`
        });
        setChatMessage('');
    }
    
    const loginEnter = (e) => { if (e.key === 'Enter') chatLogin(); }
    const messageEnter = (e) => { if (e.key === 'Enter') sendMessage(); }

    return (
        <div style={{position: "relative", zIndex: 10}}>
            <div className={styles.chatIcon} onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon icon={faComment} />
            </div>
            <div className={isOpen ? styles.chatOn : styles.chatOff}>
                <div className={styles.chatHeader}>
                    <span onClick={() => setIsLogin(!isLogin)}><FontAwesomeIcon icon={faChevronLeft} /></span>
                    <span onClick={() => setIsOpen(!isOpen)}><FontAwesomeIcon icon={faXmark} /></span>
                </div>
                <div className={isLogin ? styles.chatStart : styles.chatLogin}>
                    {isLogin ?
                        <>
                            <ul className={styles.chatList}>
                                {messageList.map(item => (
                                    <li key={item.idx} className={ item.name === chatID ? styles.chat_me : styles.chat_you }>
                                        <span>{item.name}</span>
                                        <div className={ item.name === chatID ? styles.chat_me_box : styles.chat_you_box }>
                                            <p>{item.content}</p>
                                            <strong>{item.time}</strong>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className={styles.chatMessage}>
                                <input type="text" value={chatMessage} placeholder="메시지를 입력해주세요" onChange={(e) => setChatMessage(e.target.value)} onKeyUp={messageEnter}/>
                                <button onClick={sendMessage}><FontAwesomeIcon icon={faPaperPlane} /></button>
                            </div>
                        </>
                        :
                        <>
                            <input type="text" className={styles.loginInput} value={chatID} placeholder="이름을 입력해주세요" onChange={(e) => setChatID(e.target.value)} onKeyUp={loginEnter}/>
                            <button className={styles.loginBtn} onClick={chatLogin}>입장</button>
                        </>
                    }
                </div>
            </div>  
        </div>
    );
};

export default Chat;