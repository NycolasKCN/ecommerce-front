import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-4wq5lzep6uchx7cs.us.auth0.com',
      clientId: 'cj79lLv7H5ZkUNF0L5cKQzBviik46IMT',
      authorizationParams: {
        redirect_uri: 'http://localhost:4200/login/callback',
      },
    }),
  ],
};
