/* ─── Custom cursor ─── */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

if (window.matchMedia('(hover: hover)').matches) {
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
}

/* ─── Mobile hamburger ─── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
    });
});

/* ─── Scroll reveal ─── */
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.project-item').forEach(el => revealObserver.observe(el));

document.querySelectorAll('.service-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ${i * 0.1}s ease, transform 0.5s ${i * 0.1}s ease, border-color 0.2s, box-shadow 0.2s`;
});
const sObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.service-card').forEach(el => sObserver.observe(el));

/* ─── Iframe scroll buttons ─── */
