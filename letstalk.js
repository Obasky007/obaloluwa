const totalSteps = 3;

const state = {
    step: 1,
    serviceOption: 'Business Website',
    addons: [],
    timeline: 'Normal (1-2 weeks)',
    budget: '₦80,000 — ₦200,000'
};

const budgetMap = {
    'Flexible (2-3 weeks)': { amt: '₦50,000 — ₦120,000', tier: 'Starter' },
    'Normal (1-2 weeks)': { amt: '₦80,000 — ₦200,000', tier: 'Professional' },
    'Urgent (3-7 days)': { amt: '₦120,000 — ₦300,000', tier: 'Priority' },
    'Rush (24-72 hrs)': { amt: '₦180,000 — ₦400,000', tier: 'Express' }
};

function goStep(n) {
    if (n < 1 || n > totalSteps) return;
    state.step = n;
    document.querySelectorAll('.step-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('step-' + n).classList.add('active');
    updateProgress();
    updateSummary();
    updateReview();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgress() {
    for (let i = 1; i <= totalSteps; i++) {
        const circle = document.getElementById('sn' + i);
        const stepEl = document.getElementById('ps' + i);
        circle.classList.remove('active', 'done');
        if (i < state.step) {
            circle.classList.add('done');
            circle.innerHTML = '<i class="fa-solid fa-check" style="font-size:0.6rem"></i>';
        } else if (i === state.step) {
            circle.classList.add('active');
            circle.textContent = i;
        } else {
            circle.textContent = i;
        }
        if (stepEl) stepEl.classList.toggle('locked', i > state.step);
    }
    for (let i = 1; i < totalSteps; i++) {
        const pl = document.getElementById('pl' + i);
        if (pl) pl.classList.toggle('done', i < state.step);
    }
}

function updateSummary() {
    document.getElementById('sService').textContent = state.serviceOption;
    document.getElementById('sTimeline').textContent = state.timeline;
    document.getElementById('sBudget').textContent = state.budget;
}

function updateReview() {
    const name = document.getElementById('clientName')?.value.trim() || '—';
    const email = document.getElementById('clientEmail')?.value.trim() || '—';
    const phone = document.getElementById('clientPhone')?.value.trim() || '—';
    const country = document.getElementById('clientCountry')?.value || '—';
    const source = document.getElementById('clientSource')?.value || '—';
    const desc = document.getElementById('projectDesc')?.value.trim() || 'No description provided.';
    const addons = state.addons.length ? state.addons.join(', ') : 'None';
    const rows = [
        ['Service', state.serviceOption],
        ['Add-ons', addons],
        ['Timeline', state.timeline],
        ['Budget', state.budget],
        ['Name', name],
        ['Email', email],
        ['Phone', phone],
        ['Country', country],
        ['Found via', source],
        ['Brief', desc]
    ];
    document.getElementById('reviewRows').innerHTML = rows
        .map(([k, v]) => `<div class="review-row"><span class="r-key">${k}</span><span class="r-val">${v}</span></div>`)
        .join('');
}

// Interactions

document.querySelectorAll('#serviceOptions .list-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('#serviceOptions .list-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        state.serviceOption = item.dataset.value;
        updateReview();
    });
});

document.querySelectorAll('#addonsList .addon-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('selected');
        const v = card.dataset.value;
        const idx = state.addons.indexOf(v);
        if (idx === -1) state.addons.push(v);
        else state.addons.splice(idx, 1);
        updateReview();
    });
});

document.querySelectorAll('#timelineOptions .timeline-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('#timelineOptions .timeline-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.timeline = btn.dataset.value;
        const { amt, tier } = budgetMap[state.timeline];
        state.budget = amt;
        document.getElementById('budgetAmt').textContent = amt;
        document.getElementById('budgetTier').textContent = tier;
        updateReview();
    });
});

function submitWA() {
    const name = document.getElementById('clientName').value.trim();
    const email = document.getElementById('clientEmail').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    if (!name || !email || !phone) {
        alert('Please fill in your name, email and phone before sending.');
        return;
    }
    const country = document.getElementById('clientCountry').value;
    const source = document.getElementById('clientSource').value || 'Not specified';
    const desc = document.getElementById('projectDesc').value.trim() || 'No additional details.';
    const addons = state.addons.length ? state.addons.join(', ') : 'None';
    const msg = encodeURIComponent(
        `Hi Obaloluwa! I'd like a quote for my project.\n\n` +
        `Service: ${state.serviceOption}\n` +
        `Add-ons: ${addons}\n` +
        `Timeline: ${state.timeline}\n` +
        `Budget estimate: ${state.budget}\n\n` +
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCountry: ${country}\nFound via: ${source}\n\n` +
        `Project brief:\n${desc}`
    );
    window.open(`https://wa.me/2347075255079?text=${msg}`, '_blank');
}

updateProgress();
updateReview();