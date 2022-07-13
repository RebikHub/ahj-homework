import { Subject } from 'rxjs';
import projects from './projects';

export default class Store {
  constructor() {
    this.state$ = new Subject();
    this.state = projects;
  }

  done(project, task) {
    this.state$.next({
      state: this.state.state,
      done: true,
      project,
      task,
    });
  }

  unDone(project, task) {
    this.state$.next({
      state: this.state.state,
      done: false,
      project,
      task,
    });
  }
}
