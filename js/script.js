document.addEventListener('DOMContentLoaded', () => {
    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });

            // スマホメニューが開いている場合は閉じる
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // ヘッダーの背景色変更 (スクロール時)
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
            header.style.boxShadow = '0 2px 15px rgba(0, 224, 255, 0.4)';
        } else {
            header.style.backgroundColor = 'rgba(26, 26, 26, 0.9)';
            header.style.boxShadow = '0 2px 10px rgba(0, 224, 255, 0.3)';
        }
    });

    // ハンバーガーメニューの開閉
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // スクロールアニメーション (フェードイン)
    const fadeInElements = document.querySelectorAll('.section-title, .profile-content, .video-item, .schedule-item, .contact-form-container');

    const observerOptions = {
        root: null, // ビューポートをルートとする
        rootMargin: '0px',
        threshold: 0.1 // 要素の10%が見えたら発火
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // 一度発火したら監視を停止
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => {
        observer.observe(el);
    });

    // お問い合わせフォームのダミー送信機能
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // ページの再読み込みを防ぐ
            alert('メッセージが送信されました（このフォームはダミーです。実際の送信機能はありません）。\nThank you for your message! (This form is for demonstration purposes only.)');
            contactForm.reset(); // フォームをリセット
        });
    }

    // OGP画像とファビコンのプレースホルダーを置き換えるメッセージ
    console.log("重要: HTMLファイル内のOGP画像 (og:image) とファビコン (link rel='icon') のURLを、実際の画像パスに置き換えてください。");
    console.log("Important: Please replace the placeholder URLs for OGP image (og:image) and favicon (link rel='icon') in the HTML file with your actual image paths.");
});