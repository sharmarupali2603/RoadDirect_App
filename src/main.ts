import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (true === environment?.ignoresSsl) {
  console.warn('main.ts: running with SSL Certificate Checking disabled because environment.ignoresSsl is true.');
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
