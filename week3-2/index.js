'use strict';

window.onload = () => {
    loadWeather();
    loadImage();
    loadTimer();
    setInterval(loadTimer, 1000);
}

let todoList = [];
let checkList = [];
let nameValue = '';

const container = document.querySelector(".container");
const timer = document.querySelector(".timer");
const input_name = document.getElementById("input-name");
const edit_name = document.getElementById("edit-name");
const add_btn = document.getElementById("addBtn");
const input_task = document.getElementById("input-task");

// 날씨 로드
function loadWeather() {
    window.navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        console.log(lat, lon)

        const API_KEY = '';

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.main);
            document.getElementById("cityName").innerText = data.name;
            document.getElementById("temp").innerText = (data.main.temp - 273.15).toFixed(0)+'°';
            document.getElementById("tempImg").src = `https://openweathermap.com/img/w/${data.weather[0].icon}.png`;
            document.getElementById("tempDescription").innerText = data.weather[0].description;

            document.getElementById("minTemp").innerText =  (data.main.temp_min - 273.15).toFixed(0)+'°';
            document.getElementById("maxTemp").innerText =  (data.main.temp_max - 273.15).toFixed(0)+'°';

            document.querySelector(".weather").style.display = "flex";
        }).catch(error => console.log(error));
    },
    (err) => {
        switch(err.code) {
            case err.PERMISSION_DENIED:
                str = '사용자 거부';
                break;
            case err.POSITION_UNAVAILABLE:
                str = '지리 정보 없음';
                break;
            case err.TIMEOUT:
                str = '시간 초과';
                break;
            case err.UNKNOWN_ERROR:
                str = '알 수 없는 에러';
                break;
        }
        alert(str);
    });
}

// 랜덤 배경이미지 로드
function loadImage() {
    const random_idx = parseInt(Math.random()*5+1);
    container.style.backgroundImage = `url('images/${random_idx}.jpg')`;
}

// 시계
function loadTimer() {
    const time = new Date();
    const hour = String(time.getHours());
    const min = String(time.getMinutes());
    const sec = String(time.getSeconds());
    
    timer.innerHTML = `${hour.padStart(2, '0')}:${min.padStart(2, '0')}:${sec.padStart(2, '0')}`;
}

// li 태그 동적 생성
async function newLi(text, id) {
    const ul_tag = document.getElementById("taskList");
    const li_tag = document.createElement("li");
    li_tag.classList.add("task");

    li_tag.innerHTML = `
        <input type='checkbox' class='check-complete' id="check_${id}" onclick="checkComplete(this, ${id})">
        <div contenteditable="false" class="task-text">
            ${text}
        </div>
        <div class="menu-list">
            <button id="editBtn" onclick="optionBtn(this, '${id}')">수정</button>
            <button id="deleteBtn" onclick="optionBtn(this, '${id}')">삭제</button>
        </div>
    `;

    ul_tag.appendChild(li_tag);
}

// 이름 입력
input_name.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        const val = e.target.value.trim();
        const input_tag = document.getElementById("user-name");
        input_tag.value = val;

        const user_name_tag = document.getElementById("input-name");
        input_tag.style.width = (user_name_tag.value.length * 32) + 'px';
        
        document.querySelector(".firstBox").style.display = "none";
        document.querySelector(".secondBox").style.display = "flex";
        
        if (localStorage.getItem(val)) {
            JSON.parse(localStorage.getItem(val)).forEach(async item => {
                await newLi(item['text'].trim(), item['id']);
                const newTodo = {
                    "id": item['id'],
                    "text": item['text'].trim()
                }
                todoList.push(newTodo);

                if (localStorage.getItem('checkList') && JSON.parse(localStorage.getItem('checkList')).includes(item['id'])) {
                    checkList.push(item['id']);
                    const checkBox_tag = document.getElementById(`check_${item['id']}`);
                    checkBox_tag.checked = true;
                    await checkComplete(checkBox_tag, item['id']);
                }
            });
        } else {
            localStorage.setItem(val, '');
        }

        document.querySelector(".taskInput").style.display = "flex";
    }
});

// input 크기 자동 조절
function adjustWidth(input) {
    input.style.width = ((input.value.length) * 32) + 'px';
}

// 이름 수정
edit_name.addEventListener('click', (e) => {
    const name_tag = document.getElementById("user-name");
    name_tag.removeAttribute("readonly");
    document.getElementById("edit-name").style.visibility = "hidden";
    nameValue = name_tag.value;
});

document.getElementById("user-name").addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        e.target.setAttribute("readonly", "");
        document.getElementById("edit-name").style.visibility = "visible";

        const oldValue = localStorage.getItem(nameValue);
        if (nameValue !== e.target.value) {
            localStorage.setItem(e.target.value, oldValue);
            localStorage.removeItem(nameValue);
            nameValue = '';
        }
    }
});

// to-do 추가
add_btn.addEventListener('click', async (e) => {
    const input_name = document.getElementById("input-name").value;
    const input_tag = e.target.previousElementSibling;

    const id = new Date().getTime();
    const text = input_tag.value.trim()
    const newTodo = {
        "id": id,
        "text": text
    }

    todoList.push(newTodo);
    await newLi(text, id);

    localStorage.setItem(input_name, JSON.stringify(todoList));

    input_tag.value = "";
});

input_task.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        add_btn.click();
    }
});

function optionBtn(tag, id) {
    const tag_id = tag.id;
    const li_tag = tag.parentNode.parentNode;
    const text_tag = li_tag.querySelector(".task-text");
    const input_name = document.getElementById("input-name").value.trim();

    // 수정
    if (tag_id === 'editBtn') {
        tag.id = 'completeBtn';
        tag.innerText = '완료';
        text_tag.contentEditable = "true";
    } 
    // 삭제
    else if (tag_id === 'deleteBtn') {
        li_tag.remove();
        todoList = todoList.filter(e => e.id != id);
        localStorage.setItem(input_name, JSON.stringify(todoList));

        checkList = checkList.filter(e => e != id);
        localStorage.setItem("checkList", JSON.stringify(checkList));
    } 
    // 수정 완료
    else {
        tag.id = 'editBtn';
        tag.innerText = '수정';
        text_tag.contentEditable = "false";

        const todo = todoList.find(todo => todo.id == id);
        todo.text = text_tag.innerText;
        localStorage.setItem(input_name, JSON.stringify(todoList));
    }
}

async function checkComplete(tag, id) {
    const text_tag = tag.nextElementSibling;
    if (tag.checked) {
        text_tag.style.textDecoration = "line-through";
        checkList.push(id);
        localStorage.setItem("checkList", JSON.stringify(checkList));
    } else {
        text_tag.style.textDecoration = "none";
        checkList = checkList.filter(e => e != id);
        localStorage.setItem("checkList", JSON.stringify(checkList));
    }
}