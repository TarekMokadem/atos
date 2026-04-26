import { Component } from '@angular/core';
import { showDemoChrome } from '../environments/demo-settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'flexy-angular';
  /** Découplé de environment.prod.ts (souvent réécrit en CI) : voir demo-settings.ts */
  readonly demoMode = showDemoChrome;
}
