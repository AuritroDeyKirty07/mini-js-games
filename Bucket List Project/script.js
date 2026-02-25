document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage('placesList', 'places');
    loadFromLocalStorage('tasksList', 'tasks');
  });

  function addItem(inputId, listId, key) {
    const input = document.getElementById(inputId);
    const list = document.getElementById(listId);
    const value = input.value.trim();
    if (!value) return;

    const li = createListItem(value);
    list.appendChild(li);

    playSound();
    input.value = '';

    saveToLocalStorage(listId, key);
  }

  function createListItem(value) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const span = document.createElement('span');
    span.textContent = value;

    checkbox.addEventListener('change', () => saveAll());

    li.appendChild(checkbox);
    li.appendChild(span);
    return li;
  }

  function saveToLocalStorage(listId, key) {
    const list = document.getElementById(listId);
    const items = [];
    list.querySelectorAll('li').forEach(li => {
      items.push({
        text: li.querySelector('span').textContent,
        checked: li.querySelector('input').checked
      });
    });
    localStorage.setItem(key, JSON.stringify(items));
  }

  function loadFromLocalStorage(listId, key) {
    const list = document.getElementById(listId);
    const items = JSON.parse(localStorage.getItem(key) || '[]');
    items.forEach(item => {
      const li = createListItem(item.text);
      li.querySelector('input').checked = item.checked;
      list.appendChild(li);
    });
  }

  function saveAll() {
    saveToLocalStorage('placesList', 'places');
    saveToLocalStorage('tasksList', 'tasks');
  }

  function toggleTheme() {
    document.body.classList.toggle('dark-mode');
  }

  function playSound() {
    const audio = document.getElementById('addSound');
    audio.currentTime = 0;
    audio.play();
  }