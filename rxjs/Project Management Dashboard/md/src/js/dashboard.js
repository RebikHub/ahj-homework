import { fromEvent } from 'rxjs';

export default class Dashboard {
  constructor(store) {
    this.store = store;
    this.currentProject = document.querySelector('.project-name');
    this.projectsList = document.querySelector('.projects');
    this.projectNames = document.querySelectorAll('.p-name');
    this.statsProject = document.querySelector('.stats-projects');
    this.tasksProject = document.querySelector('.tasks-projects');
  }

  init() {
    this.renderStats(this.store.state);
    this.renderTasks(this.store.state);
    this.changeProject();
  }

  changeProject() {
    fromEvent(this.currentProject, 'click').subscribe(() => {
      if (this.projectsList.classList.contains('none')) {
        this.projectsList.classList.remove('none');
      }
    });
    fromEvent(this.projectNames, 'click').subscribe((ev) => {
      this.store.state.current = ev.target.textContent;
      this.projectsList.classList.add('none');
      this.tasksProject.textContent = '';
      this.renderTasks(this.store.state);
    });
  }

  checkDone(elements) {
    fromEvent(elements, 'click').subscribe(
      (ev) => {
        const nameProject = document.querySelector('.project-name').textContent;
        const nameTask = ev.target.nextSibling.textContent;
        if (!ev.target.classList.contains('check')) {
          ev.target.classList.add('check');
          this.store.done(nameProject, nameTask);
        } else {
          ev.target.classList.remove('check');
          this.store.unDone(nameProject, nameTask);
        }

        Dashboard.changeOpen(this.store.state);
      },
    );
  }

  renderStats(project) {
    project.state.forEach((elem) => {
      let numDone = 0;
      elem.tasks.forEach((item) => {
        if (!item.done) {
          numDone += 1;
        }
      });
      const baseDiv = document.createElement('div');
      const nameDiv = document.createElement('div');
      const openDiv = document.createElement('div');
      baseDiv.className = 'stats-count';
      nameDiv.className = 'count-name';
      openDiv.className = 'count-number';
      nameDiv.textContent = elem.name;
      openDiv.textContent = numDone;
      baseDiv.append(nameDiv, openDiv);
      baseDiv.append(openDiv);
      this.statsProject.append(baseDiv);
    });
  }

  renderTasks(project) {
    this.currentProject.textContent = project.current;
    project.state.forEach((elem) => {
      if (project.current === elem.name) {
        elem.tasks.forEach((el) => {
          const baseDiv = document.createElement('div');
          const checkDiv = document.createElement('div');
          const taskDiv = document.createElement('div');
          baseDiv.className = 'tasks-project-status';
          checkDiv.className = 'task-status';
          taskDiv.className = 'task-name';
          if (el.done) {
            checkDiv.classList.add('check');
          }
          taskDiv.textContent = el.name;
          baseDiv.append(checkDiv, taskDiv);
          this.tasksProject.append(baseDiv);
        });
      }
    });
    this.checkDone(document.querySelectorAll('.task-status'));
  }

  static changeOpen(project) {
    let numDone = 0;
    const projectList = document.querySelectorAll('.count-name');
    project.state.forEach((elem) => {
      if (elem.name === project.current) {
        elem.tasks.forEach((item) => {
          if (!item.done) {
            numDone += 1;
          }
        });
      }
    });

    for (const i of projectList) {
      if (i.textContent === project.current) {
        i.nextSibling.textContent = numDone;
      }
    }
  }
}
