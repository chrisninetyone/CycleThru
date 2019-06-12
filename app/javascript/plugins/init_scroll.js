var nav = document.querySelector('.navbar')

window.addEventListener("scroll", function() {
    if (window.scrollY > 25) {
        nav.style.backgroundColor = '#DADFDB';
    }
    else {
        nav.style.backgroundColor = 'transparent';
    }
},false);
