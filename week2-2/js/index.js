'use strict';


document.addEventListener("DOMContentLoaded", function() {
    loadProfile();
});

function loadProfile() {
    document.getElementById("section_profile").style.display = "flex";
}

function pagination(id) {
    document.querySelectorAll(".section1").forEach(item => {
        if (item.id === document.getElementById(`section_${id}`).id) item.style.display = "flex";
        else item.style.display = "none";
    });
}
