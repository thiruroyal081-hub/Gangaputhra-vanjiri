(() => {
  'use strict';

  const now = new Date();
  const dateFormatter = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
  });
  const shortDateFormatter = new Intl.DateTimeFormat('en-IN', {
    day: '2-digit', month: 'short'
  });
  const monthFormatter = new Intl.DateTimeFormat('en-IN', { month: 'short' });

  const dateAt = (offset) => {
    const date = new Date(now);
    date.setDate(date.getDate() + offset);
    return date;
  };

  const announcement = document.createElement('aside');
  announcement.className = 'daily-news';
  announcement.setAttribute('aria-label', "Today's temple news");
  announcement.innerHTML = `
    <span class="daily-news-badge">Today's news</span>
    <strong>🪔 Evening Harathi &amp; Puja today</strong>
    <time datetime="${now.toISOString().slice(0, 10)}">${dateFormatter.format(now)} · 6:30 PM</time>
  `;
  const hero = document.querySelector('.hero');
  const countdown = document.querySelector('.countdown');
  if (hero && countdown) hero.insertBefore(announcement, countdown);

  // Keep the festival header accurate without requiring a new deployment each day.
  const kicker = document.querySelector('.hero-copy .kicker');
  if (kicker) kicker.textContent = `Today · ${dateFormatter.format(now)}`;

  // Convert the existing event cards into a rolling schedule. The first card is always today's live announcement.
  const events = [...document.querySelectorAll('.event-list article')];
  const eventNames = [
    ['Evening Harathi & Puja', 'Daily prayer, blessings, and community aarti'],
    ['Morning Abhishekam', 'Begin the day with temple prayers'],
    ['Bhajan & Prasad Seva', 'Devotional music and shared prasad'],
    ['Community Darshan', 'Gather together for evening darshan']
  ];
  events.forEach((event, index) => {
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

  // Replace the static countdown with a live countdown to today's 6:30 PM, then tomorrow's service.
  const updateCountdown = () => {
    const target = new Date(now);
    target.setHours(18, 30, 0, 0);
    const current = new Date();
    if (current >= target) target.setDate(target.getDate() + 1);
    const remaining = Math.max(0, target - current);
    const hours = Math.floor(remaining / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    const set = (id, value) => {
      const node = document.getElementById(id);
      if (node) node.textContent = String(value).padStart(2, '0');
    };
    set('days', Math.floor(remaining / 86400000));
    set('hours', hours % 24);
    set('minutes', minutes);
    set('seconds', seconds);
    const label = document.querySelector('.countdown > p');
    if (label) label.textContent = current >= target ? "Next evening harathi begins in" : "Today's evening harathi begins in";
  };
  updateCountdown();
  window.setInterval(updateCountdown, 1000);
})();
