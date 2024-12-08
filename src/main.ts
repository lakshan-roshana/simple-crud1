import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppComponent } from './app/app.component';
//import { provideAnimations } from '@angular/platform-browser/animations';

const appConfig = {
  providers: [
    provideHttpClient(withFetch()), // Enable fetch
    //provideAnimations()
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
