import imdb from './imdb.json';

console.log('app started');

let count = null;
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

function render(data, countArg, arrow) {
  for (let i = 0; i < data.length; i += 1) {
    const cloneTr = rowElement.cloneNode();
    cloneTr.dataset.id = data[i].id;
    cloneTr.dataset.title = data[i].title;
    cloneTr.dataset.year = data[i].year;
    cloneTr.dataset.imdb = `imdb: ${data[i].imdb.toFixed(2)}`;
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

  if (count === 0) {
    rowElement.children[3].textContent = 'imdb';
    rowElement.children[0].textContent = `id ${arrow}`;
  } else if (count === 1) {
    rowElement.children[0].textContent = 'id';
    rowElement.children[0].textContent = `id ${arrow}`;
  } else if (count === 2) {
    rowElement.children[0].textContent = 'id';
    rowElement.children[1].textContent = `title ${arrow}`;
  } else if (count === 3) {
    rowElement.children[1].textContent = 'title';
    rowElement.children[1].textContent = `title ${arrow}`;
  } else if (count === 4) {
    rowElement.children[1].textContent = 'title';
    rowElement.children[2].textContent = `year ${arrow}`;
  } else if (count === 5) {
    rowElement.children[2].textContent = 'year';
    rowElement.children[2].textContent = `year ${arrow}`;
  } else if (count === 6) {
    rowElement.children[2].textContent = 'year';
    rowElement.children[3].textContent = `imdb ${arrow}`;
  } else if (count === 7) {
    rowElement.children[3].textContent = 'imdb';
    rowElement.children[3].textContent = `imdb ${arrow}`;
  }
}

function removeRender() {
  const tbody = document.querySelector('tbody');
  const list = Array.from(document.querySelectorAll('.with-data'));
  for (let i = 0; i < list.length; i += 1) {
    tbody.removeChild(tbody.lastElementChild);
  }
}

function getSortImdb(objList) {
  if (count === 0) {
    objList.sort((a, b) => a.id - b.id);
    removeRender();
    render(objList, count, arrowDown);
    count += 1;
  } else if (count === 1) {
    objList.sort((a, b) => b.id - a.id);
    removeRender();
    render(objList, count, arrowUp);
    count += 1;
  } else if (count === 2) {
    objList.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
    removeRender();
    render(objList, count, arrowDown);
    count += 1;
  } else if (count === 3) {
    objList.sort((a, b) => {
      if (a.title < b.title) {
        return 1;
      }
      if (a.title > b.title) {
        return -1;
      }
      return 0;
    });
    removeRender();
    render(objList, count, arrowUp);
    count += 1;
  } else if (count === 4) {
    objList.sort((a, b) => a.year - b.year);
    removeRender();
    render(objList, count, arrowDown);
    count += 1;
  } else if (count === 5) {
    objList.sort((a, b) => b.year - a.year);
    removeRender();
    render(objList, count, arrowUp);
    count += 1;
  } else if (count === 6) {
    objList.sort((a, b) => a.imdb - b.imdb);
    removeRender();
    render(objList, count, arrowDown);
    count += 1;
  } else if (count === 7) {
    objList.sort((a, b) => b.imdb - a.imdb);
    removeRender();
    render(objList, count, arrowUp);
    count += 1;
  } else {
    count = 0;
  }
}

render(imdb);

setInterval(() => {
  getSortImdb(imdb);
}, 2000);
