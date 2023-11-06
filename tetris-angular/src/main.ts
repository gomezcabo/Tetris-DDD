import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './infrastructure/ui/app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
