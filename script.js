// STATE MANAGEMENT
let loveIndicator = 30;
let curPhoto = 0;
const photos = ["foto1.JPEG", "foto2.JPEG", "foto3.JPEG", "foto4.JPEG", "foto5.JPEG"];

// 1. PARTICLES & EFFECTS
function createParticle(e) {
    const emojis = ['✨','❤️','🌸','🌟'];
    for(let i=0; i<6; i++) {
        const p = document.createElement('div');
        p.innerHTML = emojis[Math.floor(Math.random()*emojis.length)];
        p.style.position = 'fixed';
        p.style.left = e.clientX + 'px';
        p.style.top = e.clientY + 'px';
        p.style.pointerEvents = 'none';
        p.style.transition = '0.8s ease-out';
        p.style.zIndex = '9999';
        document.body.appendChild(p);
        
        const tx = (Math.random() - 0.5) * 150;
        const ty = (Math.random() - 0.5) * 150;
        
        setTimeout(() => {
            p.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
            p.style.opacity = '0';
        }, 10);
        setTimeout(() => p.remove(), 800);
    }
}

function createHearts() {
    setInterval(() => {
        const h = document.createElement('div');
        h.className = 'floating-heart'; h.innerHTML = '❤️';
        h.style.left = Math.random() * 100 + 'vw';
        h.style.fontSize = (Math.random() * 20 + 10) + 'px';
        document.getElementById('heart-container').appendChild(h);
        setTimeout(() => h.remove(), 6000);
    }, 800);
}

// 2. NAVIGATION
function startApp() {
    const audio = document.getElementById('myAudio');
    audio.play().catch(() => console.log("Audio waiting for interaction"));
    createHearts();
    nextScreen('screen-intro');
}

function nextScreen(id) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(s => {
        s.classList.remove('active');
        setTimeout(() => { if(!s.classList.contains('active')) s.style.display = 'none'; }, 500);
    });
    const target = document.getElementById(id);
    target.style.display = 'flex';
    setTimeout(() => target.classList.add('active'), 50);
    if(id === 'screen-intro' || id === 'screen-dashboard') initTimers();
}

// 3. LOGIC & TIMERS
function initTimers() {
    const update = () => {
        const now = new Date();
        const start = new Date("March 14, 2026"); 
        const diff = Math.floor((now - start) / (1000*60*60*24));
        const counterEl = document.getElementById('day-counter');
        if(counterEl) counterEl.innerText = `${diff} Day and still counting ✨`;
        
        const clockEl = document.getElementById('live-clock');
        if(clockEl) clockEl.innerText = now.toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'});
    };
    update();
    setInterval(update, 1000);
}

function handleEnvelope() {
    const env = document.getElementById('envelope');
    env.classList.add('open');
    setTimeout(() => {
        document.getElementById('envelope-wrapper').classList.add('hidden');
        document.getElementById('letter-frame').classList.remove('hidden');
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }, 1200);
}

// 4. DASHBOARD POPUPS
function openPopup(type) {
    const content = document.getElementById('popup-content');
    document.getElementById('popup-overlay').style.display = 'flex';

    switch(type) {
        case 'reasons':
            const r = ["YANG PENTING KAMU MAU BERUBAH","Suka Marah wkwk","Senyummu candu","Pikiran DEWASA wkwk","Sangat penyayang","Tulus apa adanya","Cantik luar dalam","Pendengar hebat","Pintar","Mandiri","LEMBUT tutur kata wkwk","Sangat perhatian ? wkwk","Selalu jujur ? wkwk","Berani","Unik","Inspiratif","Selalu ada","Setia luar biasa","Humoris","Penuh semangat","Kamu adalah Zulfa"];
            content.innerHTML = `<h2 class="playfair gold-text">21 Reasons</h2><div style="text-align:left; max-height:350px; overflow-y:auto; padding-right:10px; margin-top:15px;">${r.map((x,i)=>`<div style="padding:10px; border-bottom:1px solid #f0f0f0;"><b>${i+1}.</b> ${x}</div>`).join('')}</div>`;
            break;
        case 'quiz':
            startQuiz(1);
            break;
        case 'meaning':
            content.innerHTML = `<div style="font-size:3rem; margin-bottom:10px;">🎶</div><h2 class="playfair gold-text">Our Song</h2><div style="text-align:justify; line-height:1.7; font-size:0.85rem; margin-top:15px; background:#fff9fa; padding:15px; border-radius:15px; border:1px solid #ffe4e8;">Lagu <b>"Here, There and Everywhere"</b> ini adalah janji aku buat kamu, Zulfa. Persis seperti liriknya, aku ingin selalu ada di setiap sudut hidupmu—baik saat kamu lagi bahagia (here), saat kamu lagi berjuang (there), dan di mana pun takdir bawa kita nanti. Bagiku, kamu adalah melodi yang bikin hidupku lebih berwarna.</div>`;
            break;
        case 'gallery':
            content.innerHTML = `<h2 class="playfair">Memories</h2><div style="margin:15px 0; border-radius:15px; overflow:hidden; background:#eee; height:240px;"><img src="${photos[curPhoto]}" id="gal-img" style="width:100%; height:100%; object-fit:contain;"></div><div style="display:flex; gap:10px;"><button class="next-btn-gold" style="flex:1; margin-top:0;" onclick="changePhoto(-1)">⬅️</button><button class="next-btn-gold" style="flex:1; margin-top:0;" onclick="changePhoto(1)">➡️</button></div>`;
            break;
        case 'trip':
            content.innerHTML = `<div style="font-size:3rem;">🚂</div><h2 class="playfair">Jogja Trip</h2><p style="margin-top:15px;">10 - 13 Juli 2026.<br>Siap-siap ya Zulfa! ❤️</p>`;
            break;
        case 'promises':
            content.innerHTML = `<h2 class="playfair">My Promises</h2><div style="text-align:left; margin-top:15px;"><p>✨ Menjadi pendengarmu.</p><p>✨ Menjagamu selalu.</p><p>✨ Selalu ada untukmu.</p></div>`;
            break;
        case 'voucher':
            content.innerHTML = `<h2 class="playfair">Special Gift</h2><div style="background:#fff9e6; border:2px dashed var(--gold); padding:20px; border-radius:15px; margin-top:20px;" onclick="claim(this)">🎟️ Satu Hari Full Bareng Joy</div>`;
            break;
        case 'support':
            content.innerHTML = `<div style="font-size:3rem;">🫂</div><h2 class="playfair">Deep Hug</h2><p style="margin-top:15px;">Apapun yang terjadi hari ini, kamu sudah melakukan yang terbaik. Istirahat ya, aku bangga banget sama kamu.</p>`;
            break;
    }
}

// 5. QUIZ LOGIC (4 OPTIONS)
function startQuiz(step) {
    const c = document.getElementById('popup-content');
    if(step === 1) {
        c.innerHTML = `
            <h2 class="playfair">Quiz 1/3</h2>
            <p style="margin:10px 0; font-size:0.9rem;">Kapan Joy lahir?</p>
            <button class="quiz-opt-btn" onclick="startQuiz(2)">A. 26 September 2002</button>
            <button class="quiz-opt-btn" onclick="alert('Dikit lagi!')">B. 26 Agustus 2002</button>
            <button class="quiz-opt-btn" onclick="alert('Jauh banget!')">C. 14 Maret 2002</button>
            <button class="quiz-opt-btn" onclick="alert('Coba lagi sayang!')">D. 26 September 2001</button>
        `;
    } else if(step === 2) {
        updateLove(10);
        c.innerHTML = `
            <h2 class="playfair">Quiz 2/3</h2>
            <p style="margin:10px 0; font-size:0.9rem;">Siapa yang paling kamu sayang? ❤️</p>
            <button class="quiz-opt-btn" onclick="alert('Masa Kahar sih?')">A. Kahar</button>
            <button class="quiz-opt-btn" onclick="startQuiz(3)">B. Joy</button>
            <button class="quiz-opt-btn" onclick="alert('Kok malah Tata?')">C. Tata</button>
            <button class="quiz-opt-btn" onclick="alert('Salah ih!')">D. Akmal</button>
        `;
    } else if(step === 3) {
        updateLove(10);
        c.innerHTML = `
            <h2 class="playfair">Quiz 3/3</h2>
            <p style="margin:10px 0; font-size:0.9rem;">Rencana trip kita kemana?</p>
            <button class="quiz-opt-btn" onclick="alert('Salah fokus!')">A. Ke Bali</button>
            <button class="quiz-opt-btn" onclick="alert('Ke pelaminan nanti ya!')">B. Ke Pelaminan</button>
            <button class="quiz-opt-btn" onclick="finishQuiz()">C. Ke Jogja</button>
            <button class="quiz-opt-btn" onclick="alert('Belum saatnya!')">D. Ke Luar Negeri</button>
        `;
    }
}

function finishQuiz() {
    updateLove(20);
    document.getElementById('popup-content').innerHTML = `<div style="font-size:3rem;">🎉</div><h2 class="playfair">Perfect!</h2><p style="margin-top:15px;">Kamu emang paling tau tentang kita. Joy makin sayang! ❤️</p>`;
    confetti();
}

// 6. MOOD & FEEDBACK
function checkMood(m) {
    const c = document.getElementById('popup-content');
    document.getElementById('popup-overlay').style.display = 'flex';
    
    if(m === 'happy') {
        c.innerHTML = `<div style="font-size:3rem;">☀️</div><h2 class="playfair">Yayy!</h2><p style="margin-top:15px;">Seneng banget dengernya! Semoga harimu terus penuh senyum kayak gini ya. ❤️</p>`;
        updateLove(5);
    } else {
        c.innerHTML = `<div style="font-size:3rem;">🫂</div><h2 class="playfair">It's Okay</h2><p style="margin-top:15px; text-align:center;">Aku tau kadang harinya terasa berat. Gapapa buat ngerasa sedih, tapi inget ya, ada Joy di sini yang selalu dukung dan siap dengerin kamu. Semangat Zulfa!</p>`;
        updateLove(10);
    }
}

// 7. UTILITIES
function changePhoto(d) {
    curPhoto = (curPhoto + d + photos.length) % photos.length;
    document.getElementById('gal-img').src = photos[curPhoto];
}

function updateLove(v) {
    loveIndicator = Math.min(loveIndicator + v, 100);
    document.getElementById('meter-fill').style.width = loveIndicator + "%";
    document.getElementById('love-percent').innerText = loveIndicator + "%";
}

function claim(e) { e.style.opacity = '0.5'; e.innerText = "CLAIMED!"; confetti(); }
function closePopup() { document.getElementById('popup-overlay').style.display = 'none'; }
function sendWA() { window.open(`https://wa.me/6285157560322?text=Halo Joy! Love Level aku buat kamu udah ${loveIndicator}% nih! ❤️`); }