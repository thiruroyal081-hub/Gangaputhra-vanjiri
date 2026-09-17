(() => {
  'use strict';

  const dateFormatter = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
  });
  const monthFormatter = new Intl.DateTimeFormat('en-IN', { month: 'short' });

  const today = () => new Date();
  const dateAt = (offset) => {
    const date = today();
    date.setDate(date.getDate() + offset);
    return date;
  };

  const renderDailyContent = () => {
    const now = today();
    const announcement = document.querySelector('.daily-news') || document.createElement('aside');
    announcement.className = 'daily-news';
    announcement.setAttribute('aria-label', "Today's temple news");
    announcement.innerHTML = `
      <span class="daily-news-badge">Today's news</span>
      <strong>🪔 Evening Harathi &amp; Puja today</strong>
      <time datetime="${now.toISOString().slice(0, 10)}">${dateFormatter.format(now)} · 6:30 PM</time>
    `;
    const hero = document.querySelector('.hero');
    const countdown = document.querySelector('.countdown');
    if (hero && countdown && !announcement.parentElement) hero.insertBefore(announcement, countdown);

    const kicker = document.querySelector('.hero-copy .kicker');
    if (kicker) kicker.textContent = `Today · ${dateFormatter.format(now)}`;

    const eventNames = [
      ['Evening Harathi & Puja', 'Daily prayer, blessings, and community aarti'],
      ['Morning Abhishekam', 'Begin the day with temple prayers'],
      ['Bhajan & Prasad Seva', 'Devotional music and shared prasad'],
      ['Community Darshan', 'Gather together for evening darshan']
    ];
    document.querySelectorAll('.event-list article').forEach((event, index) => {
      const date = dateAt(index);
      const time = event.querySelector('time');
      const title = event.querySelector('h3');
      const description = event.querySelector('div span');
      const meta = event.querySelector('div p');
      if (time) {
        time.dateTime = date.toISOString().slice(0, 10);
        time.dataset.liveDate = 'true';
        time.innerHTML = `<b>${String(date.getDate()).padStart(2, '0')}</b><span>${monthFormatter.format(date).toUpperCase()}</span>`;
      }
      if (title) title.textContent = eventNames[index]?.[0] || title.textContent;
      if (description) description.textContent = eventNames[index]?.[1] || description.textContent;
      if (meta) meta.textContent = `${dateFormatter.format(date)} · ${index === 0 ? '6:30 PM' : '7:00 PM'}`;
    });
  };

  const updateCountdown = () => {
    const current = today();
    const target = new Date(current);
    target.setHours(18, 30, 0, 0);
    if (current >= target) target.setDate(target.getDate() + 1);
    const remaining = Math.max(0, target - current);
    const set = (id, value) => {
      const node = document.getElementById(id);
      if (node) node.textContent = String(value).padStart(2, '0');
    };
    set('days', Math.floor(remaining / 86400000));
    set('hours', Math.floor(remaining / 3600000) % 24);
    set('minutes', Math.floor(remaining / 60000) % 60);
    set('seconds', Math.floor(remaining / 1000) % 60);
    const label = document.querySelector('.countdown > p');
    if (label) label.textContent = current.getHours() >= 18 && current.getMinutes() >= 30
      ? 'Next evening harathi begins in'
      : "Today's evening harathi begins in";
  };

  renderDailyContent();
  updateCountdown();
  window.setInterval(() => {
    updateCountdown();
    renderDailyContent();
  }, 1000);
})();
