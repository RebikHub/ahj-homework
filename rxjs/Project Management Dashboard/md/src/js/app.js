import Dashboard from './dashboard';
import Store from './store';

console.log('app started');

const store = new Store();
const dash = new Dashboard(store);

dash.init();
store.state$.subscribe((s) => {
  const arrProj = s.state.filter((w) => w.name === s.project);
  const arrTask = arrProj[0].tasks.filter((m) => m.name === s.task);
  arrTask[0].done = s.done;
  return arrTask[0].done;
});
