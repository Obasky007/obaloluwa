
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animateCursor() {
    cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
})();
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => { ring.style.width = '52px'; ring.style.height = '52px'; ring.style.opacity = '0.3'; });
    el.addEventListener('mouseleave', () => { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.opacity = '0.5'; });
});

// Scroll reveal for project items
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.project-item, .service-card').forEach(el => observer.observe(el));

// Service cards fade in
document.querySelectorAll('.service-card').forEach((el, i) => {
    el.style.opacity = '0'; el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ${i * 0.1}s ease, transform 0.5s ${i * 0.1}s ease, border-color 0.2s, box-shadow 0.2s`;
});
const sObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; } });
}, { threshold: 0.1 });

// Scroll button functionality
document.querySelectorAll('.scroll-btn').forEach(btn => {
    let scrollInterval = null;

    btn.addEventListener('mousedown', () => {
        const iframe = btn.closest('.project-preview').querySelector('iframe');
        if (!iframe) return;

        scrollInterval = setInterval(() => {
            iframe.contentWindow.scrollBy(0, 40);
        }, 50);
    });

    btn.addEventListener('mouseup', () => {
        if (scrollInterval) clearInterval(scrollInterval);
    });

    btn.addEventListener('mouseleave', () => {
        if (scrollInterval) clearInterval(scrollInterval);
    });
});