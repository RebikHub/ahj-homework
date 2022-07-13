import imdb from './imdb.json';

console.log('app started');

let count = 0;
const arrowUp = '\u{1F815}';
const arrowDown = '\u{1F817}';
const html = `
<tr>
  <td>id</td>
  <td>title</td>
  <td>year</td>
  <td>imdb</td>
</tr>
`;
const imdbList = document.getElementById('imdb-list');

imdbList.firstElementChild.innerHTML = html;

const rowElement = imdbList.firstElementChild.firstElementChild;

for (let i = 0; i < imdb.length; i += 1) {
  const cloneTr = rowElement.cloneNode();
  cloneTr.dataset.id = imdb[i].id;
  cloneTr.dataset.title = imdb[i].title;
  cloneTr.dataset.year = imdb[i].year;
  cloneTr.dataset.imdb = `imdb: ${imdb[i].imdb.toFixed(2)}`;
  cloneTr.classList.add('with-data');
  imdbList.firstElementChild.appendChild(cloneTr);
}

const list = Array.from(document.querySelectorAll('.with-data'));

list.forEach((elem) => {
  const cloneTdId = rowElement.firstElementChild.cloneNode();
  const cloneTdTitle = rowElement.firstElementChild.cloneNode();
  const cloneTdYear = rowElement.firstElementChild.cloneNode();
  const cloneTdImdb = rowElement.firstElementChild.cloneNode();
  cloneTdId.textContent = elem.dataset.id;
  elem.appendChild(cloneTdId);
  cloneTdTitle.textContent = elem.dataset.title;
  elem.appendChild(cloneTdTitle);
  cloneTdYear.textContent = elem.dataset.year;
  elem.appendChild(cloneTdYear);
  cloneTdImdb.textContent = elem.dataset.imdb;
  elem.appendChild(cloneTdImdb);
});

function getSortImdb(listTr) {
  const tbody = document.querySelector('tbody');
  let listId = null;
  if (count === 0) {
    rowElement.children[0].textContent = `id ${arrowDown}`;
    listId = listTr.sort((a, b) => a.dataset.id - b.dataset.id);
    count += 1;
  } else if (count === 1) {
    rowElement.children[0].textContent = 'id';
    rowElement.children[0].textContent = `id ${arrowUp}`;
    listId = listTr.sort((a, b) => b.dataset.id - a.dataset.id);
    count += 1;
  } else if (count === 2) {
    rowElement.children[0].textContent = 'id';
    rowElement.children[1].textContent = `title ${arrowDown}`;
    listId = listTr.sort((a, b) => {
      if (a.dataset.title < b.dataset.title) {
        return -1;
      }
      if (a.dataset.title > b.dataset.title) {
        return 1;
      }
      return 0;
    });
    count += 1;
  } else if (count === 3) {
    rowElement.children[1].textContent = 'title';
    rowElement.children[1].textContent = `title ${arrowUp}`;
    listId = listTr.sort((a, b) => {
      if (a.dataset.title < b.dataset.title) {
        return 1;
      }
      if (a.dataset.title > b.dataset.title) {
        return -1;
      }
      return 0;
    });
    count += 1;
  } else if (count === 4) {
    rowElement.children[1].textContent = 'title';
    rowElement.children[2].textContent = `year ${arrowDown}`;
    listId = listTr.sort((a, b) => a.dataset.year - b.dataset.year);
    count += 1;
  } else if (count === 5) {
    rowElement.children[2].textContent = 'year';
    rowElement.children[2].textContent = `year ${arrowUp}`;
    listId = listTr.sort((a, b) => b.dataset.year - a.dataset.year);
    count += 1;
  } else if (count === 6) {
    rowElement.children[2].textContent = 'year';
    rowElement.children[3].textContent = `imdb ${arrowDown}`;
    listId = listTr.sort((a, b) => {
      if (a.dataset.imdb < b.dataset.imdb) {
        return -1;
      }
      if (a.dataset.imdb > b.dataset.imdb) {
        return 1;
      }
      return 0;
    });
    count += 1;
  } else if (count === 7) {
    rowElement.children[3].textContent = 'imdb';
    rowElement.children[3].textContent = `imdb ${arrowUp}`;
    listId = listTr.sort((a, b) => {
      if (a.dataset.imdb < b.dataset.imdb) {
        return 1;
      }
      if (a.dataset.imdb > b.dataset.imdb) {
        return -1;
      }
      return 0;
    });
    count += 1;
  } else {
    rowElement.children[3].textContent = 'imdb';
    count = 0;
  }
  for (let i = 0; i < listId.length; i += 1) {
    tbody.removeChild(tbody.lastElementChild);
  }
  for (let i = 0; i < listId.length; i += 1) {
    tbody.appendChild(listId[i]);
  }
}

setInterval(() => {
  getSortImdb(list);
}, 2000);
