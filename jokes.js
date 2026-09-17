(() => {
  const endpoint = 'https://v2.jokeapi.dev/joke/Any?type=single,twopart&safe-mode';
  const button = document.querySelector('#new-joke');
  const copyButton = document.querySelector('#copy-joke');
  const status = document.querySelector('#joke-loading');
  const setup = document.querySelector('#joke-setup');
  const delivery = document.querySelector('#joke-delivery');
  const error = document.querySelector('#joke-error');
  let currentJoke = '';

  const setLoading = (loading) => {
    button.disabled = loading;
    button.setAttribute('aria-busy', String(loading));
    status.textContent = loading ? 'Finding a fresh joke…' : '';
  };

  const loadJoke = async () => {
    setLoading(true);
    error.textContent = '';
    setup.textContent = '';
    delivery.textContent = '';
    copyButton.disabled = true;
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('The joke service is unavailable.');
      const joke = await response.json();
      if (joke.error) throw new Error(joke.message || 'Unable to load a joke.');
      currentJoke = joke.type === 'single' ? joke.joke : `${joke.setup}\n${joke.delivery}`;
      if (joke.type === 'single') {
        setup.textContent = joke.joke;
      } else {
        setup.textContent = joke.setup;
        delivery.textContent = joke.delivery;
      }
      copyButton.disabled = false;
    } catch (err) {
      status.textContent = '';
      error.textContent = `${err.message} Please try again.`;
    } finally {
      setLoading(false);
    }
  };

  button.addEventListener('click', loadJoke);
  copyButton.addEventListener('click', async () => {
    if (!currentJoke) return;
    try {
      await navigator.clipboard.writeText(currentJoke);
      copyButton.textContent = 'Copied ✓';
      window.setTimeout(() => { copyButton.textContent = 'Copy joke'; }, 1400);
    } catch {
      error.textContent = 'Copy failed. Please select the joke text manually.';
    }
  });
})();
