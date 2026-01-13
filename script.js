/* ========================================
   MYS.Jp Discord Server - JavaScript
   遊び心・エンタメ重視版
======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // Navigation
    // ========================================
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu on link click
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ========================================
    // Scroll Animations (Intersection Observer)
    // ========================================
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));

    // ========================================
    // Button Ripple Effect
    // ========================================
    const joinButtons = document.querySelectorAll('.btn-join');

    joinButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            this.classList.remove('ripple');
            void this.offsetWidth; // Trigger reflow
            this.classList.add('ripple');
        });
    });

    // ========================================
    // Quiz Game
    // ========================================
    const quizButtons = document.querySelectorAll('.btn-quiz');
    const quizResult = document.getElementById('quiz-result');
    const quizQuestion = document.getElementById('quiz-question');

    const quizData = [
        {
            question: 'Q: 深夜に突然通話したくなることがある？',
            yes: '完璧！君はこのサーバー向きだ！🎉',
            no: '大丈夫、ここにいたら変わるよ😏'
        },
        {
            question: 'Q: ゲームで負けても「楽しかった！」って言える？',
            yes: '最高！一緒にゲームしよう！🎮',
            no: 'それもまた良し。修行しよう💪'
        },
        {
            question: 'Q: 無言でいることに耐えられない？',
            yes: 'ここは賑やかだから安心して！🔥',
            no: '静かなチャンネルもあるよ🤫'
        }
    ];

    let currentQuiz = 0;

    function showQuiz() {
        quizQuestion.textContent = quizData[currentQuiz].question;
        quizResult.textContent = '';
        quizResult.className = 'quiz-result';
    }

    quizButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const answer = btn.dataset.answer;
            const quiz = quizData[currentQuiz];
            
            if (answer === 'yes') {
                quizResult.textContent = quiz.yes;
                quizResult.classList.add('positive');
            } else {
                quizResult.textContent = quiz.no;
                quizResult.classList.add('negative');
            }

            // Move to next quiz after delay
            setTimeout(() => {
                currentQuiz = (currentQuiz + 1) % quizData.length;
                showQuiz();
            }, 2500);
        });
    });

    // ========================================
    // Click Counter Game
    // ========================================
    const clickTarget = document.getElementById('click-target');
    const clickCount = document.getElementById('click-count');
    const clickTimer = document.getElementById('click-timer');
    const clickReset = document.getElementById('click-reset');

    let count = 0;
    let timeLeft = 10;
    let gameActive = false;
    let timerInterval = null;

    clickTarget.addEventListener('click', () => {
        if (!gameActive) {
            // Start game
            gameActive = true;
            count = 0;
            timeLeft = 10;
            clickCount.textContent = count;
            clickTimer.textContent = timeLeft;

            timerInterval = setInterval(() => {
                timeLeft--;
                clickTimer.textContent = timeLeft;

                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    gameActive = false;
                    clickTarget.disabled = true;
                    
                    // Show result
                    let message = '';
                    if (count >= 100) {
                        message = '神！🏆';
                    } else if (count >= 70) {
                        message = 'すごい！💪';
                    } else if (count >= 50) {
                        message = 'なかなか！👍';
                    } else {
                        message = 'がんばれ！😅';
                    }
                    
                    clickTarget.textContent = `${count}回 ${message}`;
                }
            }, 1000);
        }

        if (gameActive) {
            count++;
            clickCount.textContent = count;
            
            // Visual feedback
            clickTarget.style.transform = 'scale(0.9)';
            setTimeout(() => {
                clickTarget.style.transform = 'scale(1)';
            }, 50);
        }
    });

    clickReset.addEventListener('click', () => {
        clearInterval(timerInterval);
        gameActive = false;
        count = 0;
        timeLeft = 10;
        clickCount.textContent = count;
        clickTimer.textContent = timeLeft;
        clickTarget.disabled = false;
        clickTarget.textContent = 'クリック！';
    });

    // ========================================
    // Random Message
    // ========================================
    const randomBtn = document.getElementById('random-btn');
    const randomText = document.getElementById('random-text');

    const messages = [
        '今日も頑張ったね、えらい！✨',
        'このサーバー、最高だと思わない？',
        '深夜のテンションは正義',
        'そろそろ寝た方がいいんじゃない？',
        '一緒にゲームしようぜ！🎮',
        '雑談したい？じゃあ来な',
        '君、面白いね',
        'ここが君の居場所かも',
        '明日も来てね！',
        'コーヒーブレイクしよう☕',
        '今何時？...気にするな',
        'エナドリ飲む？🥤',
        '推しの話聞かせて',
        'BGM流しながら作業しよ',
        '新メンバー歓迎！🎉'
    ];

    randomBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * messages.length);
        randomText.textContent = messages[randomIndex];
        
        // Animation
        randomText.style.transform = 'scale(0.8)';
        randomText.style.opacity = '0';
        
        setTimeout(() => {
            randomText.style.transform = 'scale(1)';
            randomText.style.opacity = '1';
        }, 100);
    });

    // Apply transition to random text
    randomText.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

    // ========================================
    // Smooth Scroll for Navigation
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Navbar Background on Scroll
    // ========================================
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 17, 23, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 17, 23, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });

    // ========================================
    // Card Glow Effect on Mouse Move
    // ========================================
    const cards = document.querySelectorAll('.card, .staff-card, .fun-box');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ========================================
    // Easter Egg: Konami Code
    // ========================================
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Easter egg activated!
                document.body.style.animation = 'rainbow 2s linear infinite';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 5000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Add rainbow keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});
