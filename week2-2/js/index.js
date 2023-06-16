'use strict';


document.addEventListener("DOMContentLoaded", function () {
    loadProfile();
});

function loadProfile() {
    document.getElementById("section_profile").classList.add("div-block");
    document.getElementById("profile").classList.add("active");
}

function pagination(id) {
    Array.from(document.querySelector(".pagination").children).forEach(item => {
        item.id === id ? item.classList.add("active") : item.classList.remove("active");
    });

    const tag = document.getElementById(`section_${id}`);
    document.querySelectorAll(".section1").forEach(item => {
        if (item.id === tag.id) item.classList.add("div-block");
        else item.classList.remove("div-block");
    });
}
