import './instrument';
import { MoocBackendApp } from './AlertBackendApp';

try {
  new MoocBackendApp().start();
} catch (e) {
  console.log(e);
  process.exit(1);
}

process.on('uncaughtException', (err) => {
  console.log('uncaughtException', err);
  process.exit(1);
});
