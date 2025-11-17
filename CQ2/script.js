document.addEventListener('DOMContentLoaded', ()=>{

// ===== LOGIN / REGISTER =====
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');

showRegister?.addEventListener('click', e=>{
    e.preventDefault();
    loginForm.style.display='none';
    registerForm.style.display='block';
});
showLogin?.addEventListener('click', e=>{
    e.preventDefault();
    loginForm.style.display='block';
    registerForm.style.display='none';
});

registerForm?.addEventListener('submit', e=>{
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const password = document.getElementById('regPassword').value;

    if(localStorage.getItem('user_'+email)){
        alert('Email sudah terdaftar!');
        return;
    }
    localStorage.setItem('user_'+email, JSON.stringify({name,email,password}));
    alert('Registrasi berhasil!');
    registerForm.reset();
    registerForm.style.display='none';
    loginForm.style.display='block';
});

loginForm?.addEventListener('submit', e=>{
    e.preventDefault();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    const userData = localStorage.getItem('user_'+email);
    if(!userData){ alert('User tidak ditemukan!'); return; }

    const user = JSON.parse(userData);
    if(user.password !== password){ alert('Password salah!'); return; }

    localStorage.setItem('loggedInUser', JSON.stringify(user));
    window.location.href='home.html';
});

// ===== HOME / PROFILE =====
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if((window.location.pathname.includes('home.html') || window.location.pathname.includes('profile.html')) && !loggedInUser){
    window.location.href='login.html';
}

// Tampilkan nama di home/profile
const userNameSpan = document.getElementById('userName');
const userEmailSpan = document.getElementById('userEmail');
if(loggedInUser){
    if(userNameSpan) userNameSpan.textContent = loggedInUser.name;
    if(userEmailSpan) userEmailSpan.textContent = loggedInUser.email;
}

// Logout
document.querySelectorAll('#logoutBtn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        localStorage.removeItem('loggedInUser');
        window.location.href='login.html';
    });
});

// ===== HOME MATERI =====
const materiData = [
    {title:'Apa itu Koding?',img:'assets/materi1.png',pdf:'#',video:'#',latihan:'#'},
    {title:'Apa itu Python?',img:'assets/materi2.png',pdf:'#',video:'#',latihan:'#'},
    {title:'Python di Dunia Nyata',img:'assets/materi3.png',pdf:'#',video:'#',latihan:'#'}
];

const materiContainer = document.getElementById('materiContainer');
if(materiContainer){
    materiData.forEach(m=>{
        const card = document.createElement('div');
        card.className='card scale-in';
        card.innerHTML=`
            <img src="${m.img}" class="card-img" alt="${m.title}">
            <h2>${m.title}</h2>
            <div class="card-buttons">
                <a href="${m.pdf}" class="btn small-btn" target="_blank">Materi PDF</a>
                <a href="${m.video}" class="btn small-btn" target="_blank">Materi Video</a>
                <a href="${m.latihan}" class="btn small-btn" target="_blank">Latihan</a>
            </div>
        `;
        materiContainer.appendChild(card);
    });
}

// ===== Fade-out untuk link (bukan form) =====
document.querySelectorAll('a[href]').forEach(link=>{
    if(!link.closest('form')){
        link.addEventListener('click', e=>{
            e.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(()=> window.location.href = link.href, 300);
        });
    }
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(reg => console.log("Service Worker registered:", reg))
      .catch(err => console.log("Service Worker registration failed:", err));
  });
}

});

});
