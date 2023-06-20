'use strict';

window.onload = () => {
    loadImage();
    loadTimer();
}

// 랜덤 배경이미지 로드
function loadImage() {
    const random_idx = parseInt(Math.random()*5+1);
    document.querySelector(".container").style.backgroundImage = `url('images/${random_idx}.jpg')`;
}

// 시계
function loadTimer() {
    const timer = document.querySelector(".timer");
    
    const time = new Date();
    const hour = String(time.getHours());
    const min = String(time.getMinutes());
    const sec = String(time.getSeconds());
    
    timer.innerHTML = `${hour.padStart(2, '0')}:${min.padStart(2, '0')}:${sec.padStart(2, '0')}`;
}
setInterval(loadTimer, 1000);

// 이름 입력
document.getElementById("input-name").addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        const val = e.target.value;
        document.getElementById("user-name").innerText = val+'!';
        
        document.querySelector(".firstBox").style.display = "none";
        document.querySelector(".secondBox").style.display = "flex";
        
        if (localStorage.getItem(val)) {
            JSON.parse(localStorage.getItem(val)).forEach(item => {
                newLi(item);
            });
        } else {
            localStorage.setItem(val, '');
        }
    }
});

// li 태그 동적 생성
function newLi(input) {
    const ul_tag = document.getElementById("taskList");
    const li_tag = document.createElement("li");
    li_tag.classList.add("task");
    li_tag.innerHTML = `
        <div>
            <input type='checkbox' class='check-complete'>
            ${input}
        </div>
        <button class="menu-bar"><i class="fa-solid fa-ellipsis-vertical"></i></button>
        <div class="menu-list">
            <button id="edit"></button>
            <button id="delete"></button>
        </div>
    `;
    ul_tag.appendChild(li_tag);
}