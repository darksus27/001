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
  document.getElementById(sectionId).classList.add('active');
  event.target.classList.add('active');
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
