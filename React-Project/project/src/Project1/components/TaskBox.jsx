import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";


const TaskBox = ({name}) => {
    const inputRef = useRef(null);

    let [originName, setOriginName] = useState(name);
    let [newName, setNewName] = useState(name);

    let [visible, setVisible] = useState('visible');
    let [readOnly, setReadOnly] = useState(true);
    let [textStyle, setTextStyle] = useState({ width: `${name.length*32}px` });

    let [taskValue, setTaskValue] = useState('');
    let [todos, setTodos] = useState([]);
    let [Checks, setChecks] = useState([]);
    let [editingTodos, setEditingTodos] = useState([]);


    // 로딩
    useEffect(() => {
        const storedValue = JSON.parse(localStorage.getItem(originName));
        if (storedValue) {
            setTodos(storedValue.todo_list || []);
            setChecks(storedValue.check_list || []);
        }
    }, [originName]);

    // 이름 수정 값 입력 시
    const editName = (e) => {
        setNewName(e.target.value);
        setTextStyle({
            width: `${e.target.value.length*32}px`
        });
    }
    
    // 이름 수정 완료 시
    const completeName = (e) => {
        if (e.code === 'Enter') {
            setVisible('visible');
            setReadOnly(true);

            const user_task = localStorage.getItem(originName);
            if (user_task && originName !== newName) {
                localStorage.setItem(newName, user_task);
                localStorage.removeItem(originName);
                setOriginName(newName);
            }
        }
    }

    // 이름 수정 버튼 눌렀을 시
    const editBtn = () => {
        setVisible('hidden');
        setReadOnly(false);
        inputRef.current.focus();
    }

    // todo 추가
    const addBtn = () => {
        const todo = { id: new Date().getTime(), text: taskValue }
        const nextTodo = [...todos, todo];
        setTodos(nextTodo);

        let origin_check = localStorage.getItem(originName)["check_list"];
        const dic = {
            "todo_list": nextTodo,
            "check_list": origin_check
        }

        localStorage.setItem(originName, JSON.stringify(dic))
        
        setTaskValue('');
    }

    // todo list
    const TodoList = ({todos}) => {
        return (
            <ul>
                {todos.map(item => (
                    <li key={item.id} data-id={item.id}>
                        <input type="checkbox" checked={Checks.includes(item.id)} onChange={() => checkClick(item.id)}/>
                        <div contentEditable={editingTodos.includes(item.id)} className='task-text' style={Checks.includes(item.id) ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}>{item.text}</div>
                        <div className='menu-list'>
                            <button id={editingTodos.includes(item.id) ? "completeBtn" : "editBtn"} onClick={() => editTodo(item.id)}>
                                {editingTodos.includes(item.id) ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faPen} />}
                            </button>
                            <button id="deleteBtn" onClick={() => removeTodo(item.id)}><FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                    </li>
                ))}
            </ul>
        )
    }

    // 체크박스 클릭 시
    const checkClick = (id) => {
        const el = document.querySelector(`[data-id='${id}'] .task-text`);

        let checkList = [];
        if (Checks.includes(id)) {
            checkList = Checks.filter(checkId => checkId !== id);
            el.style.textDecoration = 'line-through';
        } else {
            checkList = [...Checks, id];
            el.style.textDecoration = 'none';
        }

        setChecks(checkList);

        const storedValue = JSON.parse(localStorage.getItem(originName));
        const origin_todo = storedValue ? storedValue.todo_list : [];
        let dic = {
            "todo_list": origin_todo,
            "check_list": checkList
        };

        localStorage.setItem(originName, JSON.stringify(dic))
    }

    // todo 수정
    const editTodo = (id) => {
        let editList = [];
        if (editingTodos.includes(id)) {
            const el = document.querySelector(`[data-id='${id}'] .task-text`).innerText;

            let origin_value = JSON.parse(localStorage.getItem(originName));
            origin_value.todo_list.map(item => {if (item.id === id) {item.text = el}});
            localStorage.setItem(originName, JSON.stringify(origin_value));

            setTodos(origin_value.todo_list);

            editList = editingTodos.filter(editId => editId !== id);
        } else {
            editList = [...editingTodos, id];
        }
        setEditingTodos(editList);
    }

    // todo 삭제
    const removeTodo = (id) => {
        if (window.confirm('삭제하시겠습니까?')) {
            const todoList = todos.filter(item => item.id !== id);
            const checkList = Checks.filter(item => item !== id);
            const editList = editingTodos.filter(item => item !== id);
  
            setTodos(todoList);
            setEditingTodos(editList);
            setChecks(checkList);

            const todoValue = {
                todo_list: todoList,
                check_list: checkList
            }

            localStorage.setItem(originName, JSON.stringify(todoValue));
        }
    }

    return (
        <div className='secondBox'>
            <div className='nameBox'>
                <p>Hello, <input type="text" ref={inputRef} id="user-name" value={newName} readOnly={readOnly} style={textStyle} onChange={e => editName(e)} onKeyUp={e => completeName(e)}/></p>
                <span id='edit-name' onClick={editBtn} style={{visibility: visible}}><FontAwesomeIcon icon={faPen} /></span>
            </div>
            <div className="taskInput">
                <input type="text" value={taskValue} placeholder="Add New Task" onChange={e => setTaskValue(e.target.value)} onKeyUp={e => {if (e.code === 'Enter') addBtn()}}/>
                <button type="button" onClick={addBtn}>+</button>
            </div>
            <TodoList todos={todos}/>
        </div>
    );
};

export default TaskBox;