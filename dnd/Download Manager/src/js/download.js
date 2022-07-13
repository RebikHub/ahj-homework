import arrayLinks from './libLink';

export default class Download {
  constructor() {
    this.tBody = document.querySelector('.table-body');
    this.size = document.querySelector('.download-size');
    this.sumSize = null;
  }

  events() {
    this.createTable(arrayLinks);
  }

  createTable(array) {
    array.forEach((elem) => {
      const tr = document.createElement('tr');
      const tdName = document.createElement('td');
      const tdSize = document.createElement('td');
      const tdLink = document.createElement('td');
      const tdLinkSrc = document.createElement('a');
      tdName.textContent = elem.name;
      tdSize.textContent = elem.size;
      tdLinkSrc.textContent = 'Download';
      tdLinkSrc.href = elem.link;
      tdLinkSrc.setAttribute('download', `${elem.name}`);
      tdLink.appendChild(tdLinkSrc);
      tr.appendChild(tdName);
      tr.appendChild(tdSize);
      tr.appendChild(tdLink);
      this.tBody.appendChild(tr);
    });
    this.clickTodownload();
  }

  clickTodownload() {
    const links = document.querySelectorAll('td > a');
    for (const i of links) {
      i.addEventListener('click', (ev) => {
        const file = ev.target.href;
        this.sumSize += atob(file.split(',')[1]).length;
        if (!this.size.classList.contains('none')) {
          this.size.textContent = null;
        }
        this.size.classList.remove('none');
        this.size.textContent = `You've already downloaded: ${Number((this.sumSize / 1048576).toFixed(2))} Mb`;
      });
    }
  }

  static inputAndConvert() {
    const input = document.querySelector('.input-pdf');
    input.addEventListener('change', () => {
      const selectedFile = input.files;
      const fileToLoad = selectedFile[0];
      const fileReader = new FileReader();
      fileReader.onload = (fileLoadedEvent) => {
        const base64 = fileLoadedEvent.target.result;
        console.log(base64);
      };
      fileReader.readAsDataURL(fileToLoad);
    });
  }
}
