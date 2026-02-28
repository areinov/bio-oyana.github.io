document.addEventListener('DOMContentLoaded', function() {
    console.log('Скрипт загружен');
    
    // ===== ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ =====
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (themeToggle) {
        // Загружаем сохраненную тему
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            body.classList.add('light-theme');
        }
        
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            body.classList.toggle('light-theme');
            
            if (body.classList.contains('light-theme')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        });
    }
    
    // ===== ЧАСТИЦЫ НА ФОНЕ =====
    const particlesContainer = document.getElementById('particles');
    
    function createParticles() {
        if (!particlesContainer) return;
        
        particlesContainer.innerHTML = '';
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 4 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${body.classList.contains('light-theme') ? '#6d5fb8' : '#8774e1'};
                border-radius: 50%;
                left: ${posX}%;
                top: ${posY}%;
                opacity: ${Math.random() * 0.2 + 0.1};
                filter: blur(${Math.random() * 2}px);
                animation: floatParticle ${duration}s infinite ease-in-out;
                animation-delay: -${delay}s;
                pointer-events: none;
            `;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Добавляем анимацию для частиц
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(10px, -10px); }
            50% { transform: translate(-10px, 10px); }
            75% { transform: translate(10px, 10px); }
        }
    `;
    document.head.appendChild(style);
    
    createParticles();
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            setTimeout(createParticles, 10);
        });
    }
    
    // ===== ТОЛЬКО ДЛЯ DISCORD (копирование) =====
    window.copyDiscord = function(username) {
        navigator.clipboard.writeText(username).then(() => {
            showNotification('📋 Discord скопирован: ' + username);
        });
        return false;
    };
    
    // ===== УВЕДОМЛЕНИЯ (только для некликабельных элементов) =====
    
    // Клик по тегам (игры/сериалы) - просто уведомление, не ссылка
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.stopPropagation(); // Не мешаем другим событиям
            showNotification(`🔥 ${this.textContent}`);
        });
    });
    
    // Клик по трекам - уведомление
    const tracks = document.querySelectorAll('.track');
    tracks.forEach(track => {
        track.addEventListener('click', function(e) {
            e.stopPropagation();
            const name = this.querySelector('.track-name')?.textContent || 'трек';
            const artist = this.querySelector('.track-artist')?.textContent || '';
            showNotification(`🎵 ${name} — ${artist}`);
        });
    });
    
    // Клик по now-item (активности)
    const nowItems = document.querySelectorAll('.now-item');
    nowItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            const text = this.querySelector('span')?.textContent || '';
            showNotification(`⚡ сейчас: ${text}`);
        });
    });
    
    // ===== ФУНКЦИЯ УВЕДОМЛЕНИЯ =====
    function showNotification(message) {
        const notif = document.createElement('div');
        notif.textContent = message;
        
        notif.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(0);
            background: var(--card-bg);
            color: var(--text);
            padding: 12px 25px;
            border-radius: 50px;
            font-size: 0.9rem;
            z-index: 10000;
            box-shadow: 0 10px 30px var(--shadow);
            backdrop-filter: blur(10px);
            border: 1px solid var(--card-border);
            animation: notificationFade 2s forwards;
            pointer-events: none;
        `;
        
        document.body.appendChild(notif);
        
        setTimeout(() => {
            notif.remove();
        }, 2000);
    }
    
    // Стили для уведомлений
    const notifStyle = document.createElement('style');
    notifStyle.textContent = `
        @keyframes notificationFade {
            0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
            10% { opacity: 1; transform: translateX(-50%) translateY(0); }
            90% { opacity: 1; transform: translateX(-50%) translateY(0); }
            100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        }
    `;
    document.head.appendChild(notifStyle);
    
    // ===== ДИНАМИЧЕСКИЕ СТАТУСЫ =====
    const nowSpans = document.querySelectorAll('.now-item span');
    const statusSets = [
        ['в доте', 'слушает фонк', 'пьет кофе'],
        ['смотрит ютуб', 'ест шаурму', 'скролит тикток'],
        ['спит', 'играет в кс', 'пьет чай'],
        ['в универе', 'делает дз', 'чиллит']
    ];
    
    setInterval(() => {
        const randomSet = statusSets[Math.floor(Math.random() * statusSets.length)];
        nowSpans.forEach((span, index) => {
            if (randomSet[index] && span) {
                span.style.opacity = '0';
                setTimeout(() => {
                    span.textContent = randomSet[index];
                    span.style.opacity = '1';
                }, 200);
            }
        });
    }, 8000);
    
    console.log('✅ Скрипт загружен, ссылки должны работать');
});
// Кнопка Telegram
const contactBtn = document.getElementById('contactBtn');
if (contactBtn) {
    contactBtn.addEventListener('click', function() {
        const url = this.dataset.url || 'https://t.me/areinov'; // замени на свой
        window.open(url, '_blank');
    });
}