let books = [];
let movies = [];
let series = [];

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(sec => {
    sec.classList.remove('active');
  });
  document.querySelectorAll('.nav-links button').forEach(btn => {
    btn.classList.remove('active');
  });

  if (sectionId !== 'searchResults') {
    document.getElementById('searchInput').value = '';
    document.getElementById('searchList').innerHTML = '';
  }

  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.add('active');
    if (sectionId !== 'searchResults') {
      document.querySelector(`.nav-links button[onclick*='${sectionId}']`)?.classList.add('active');
    }
  }

  document.querySelector('.fab').style.display =
    (sectionId === 'home' || sectionId === 'searchResults') ? 'none' : 'block';
}

async function addBook() {
  const title = document.getElementById('bookTitle').value;
  const author = document.getElementById('bookAuthor').value;
  const genre = document.getElementById('bookGenre').value;
  const chapters = document.getElementById('bookChapters').value;
  const portugueseChapters = document.getElementById('bookPortugueseChapters').value;
  const pages = document.getElementById('bookPages').value;
  const platforms = Array.from(document.getElementById('bookPlatforms').selectedOptions)
    .map(option => option.text);
  const imageFile = document.getElementById('bookImage').files[0];

  const image = imageFile ? await readFileAsDataURL(imageFile) : null;

  books.push({ title, author, genre, chapters, portugueseChapters, pages, platforms, image });
  renderList('bookList', books, 'book');
  clearForm('books');
}

async function addMovie() {
  const title = document.getElementById('movieTitle').value;
  const director = document.getElementById('movieDirector').value;
  const genre = document.getElementById('movieGenre').value;
  const year = document.getElementById('movieYear').value;
  const dubbing = Array.from(document.getElementById('movieDubbing').selectedOptions)
    .map(option => option.text);
  const platforms = Array.from(document.getElementById('moviePlatforms').selectedOptions)
    .map(option => option.text);
  const imageFile = document.getElementById('movieImage').files[0];

  const image = imageFile ? await readFileAsDataURL(imageFile) : null;

  movies.push({ title, director, genre, year, dubbing, platforms, image });
  renderList('movieList', movies, 'movie');
  clearForm('movies');
}

async function addSerie() {
  const title = document.getElementById('serieTitle').value;
  const creator = document.getElementById('serieCreator').value;
  const genre = document.getElementById('serieGenre').value;
  const seasons = document.getElementById('serieSeasons').value;
  const chapters = document.getElementById('serieChapters').value;
  const portugueseChapters = document.getElementById('seriePortugueseChapters').value;
  const dubbing = Array.from(document.getElementById('serieDubbing').selectedOptions)
    .map(option => option.text);
  const platforms = Array.from(document.getElementById('seriePlatforms').selectedOptions)
    .map(option => option.text);
  const imageFile = document.getElementById('serieImage').files[0];

  const image = imageFile ? await readFileAsDataURL(imageFile) : null;

  series.push({ title, creator, genre, seasons, chapters, portugueseChapters, dubbing, platforms, image });
  renderList('serieList', series, 'serie');
  clearForm('series');
}

function renderList(listId, items, type) {
  const list = document.getElementById(listId);
  list.innerHTML = '';

  items.forEach(item => {
    const li = document.createElement('li');
    li.className = `item-card ${type}`;

    let imageHtml = '';
    if (item.image) {
      imageHtml = `<img src="${item.image}" class="item-image">`;
    }

    let content = `
            ${imageHtml}
            <div class="item-content">
                <strong>${item.title}</strong>
        `;

    if (type === 'book') {
      content += `
                <br>Autor: ${item.author}
                <br>Gênero: ${item.genre}
                <br>Capítulos: ${item.chapters} (PT: ${item.portugueseChapters})
                <br>Páginas: ${item.pages}
                <br>Plataformas: ${item.platforms.join(', ')}
            `;
    } else if (type === 'movie') {
      content += `
                <br>Diretor: ${item.director}
                <br>Ano: ${item.year}
                <br>Dublagem: ${item.dubbing.join(', ')}
                <br>Plataformas: ${item.platforms.join(', ')}
            `;
    } else if (type === 'serie') {
      content += `
                <br>Criador: ${item.creator}
                <br>Temporadas: ${item.seasons}
                <br>Capítulos: ${item.chapters} (PT: ${item.portugueseChapters})
                <br>Dublagem: ${item.dubbing.join(', ')}
                <br>Plataformas: ${item.platforms.join(', ')}
            `;
    }

    content += '</div>';
    li.innerHTML = content;
    list.appendChild(li);
  });
}

function clearForm(sectionId) {
  const form = document.querySelector(`#${sectionId} .form-container`);
  form.reset();
}

function searchItems() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const results = [];

  books.forEach(book => {
    if (book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm)) {
      results.push({ ...book, type: 'book' });
    }
  });

  movies.forEach(movie => {
    if (movie.title.toLowerCase().includes(searchTerm) ||
      movie.director.toLowerCase().includes(searchTerm)) {
      results.push({ ...movie, type: 'movie' });
    }
  });

  series.forEach(serie => {
    if (serie.title.toLowerCase().includes(searchTerm) ||
      serie.creator.toLowerCase().includes(searchTerm)) {
      results.push({ ...serie, type: 'serie' });
    }
  });

  if (searchTerm) {
    showSection('searchResults');
    renderSearchResults(results);
  }
}

function renderSearchResults(results) {
  const list = document.getElementById('searchList');
  list.innerHTML = '';

  results.forEach(item => {
    const li = document.createElement('li');
    li.className = `item-card ${item.type}`;

    const imageHtml = item.image ?
      `<img src="${item.image}" class="item-image">` :
      '<div class="item-image placeholder"></div>';

    let content = `
            ${imageHtml}
            <div class="item-content">
                <strong>${item.title}</strong>
        `;

    if (item.type === 'book') {
      content += `<br>Autor: ${item.author}`;
    } else if (item.type === 'movie') {
      content += `<br>Diretor: ${item.director}`;
    } else if (item.type === 'serie') {
      content += `<br>Criador: ${item.creator}`;
    }

    content += '</div>';
    li.innerHTML = content;
    list.appendChild(li);
  });
}

function scrollToForm() {
  const activeSection = document.querySelector('.section.active');
  if (activeSection) {
    const form = activeSection.querySelector('.form-container');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const featuredImages = document.querySelectorAll('.lazy');
  featuredImages.forEach(img => {
    const type = img.getAttribute('data-src');
    const items = window[`${type}s`];
    if (items.length > 0) {
      img.src = items[0].image || 'placeholder.jpg';
    }
  });
});
