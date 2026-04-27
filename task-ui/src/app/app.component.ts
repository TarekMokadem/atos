import { Component, inject } from '@angular/core';
import { showDemoChrome } from '../environments/demo-settings';
import { ServerKeepAliveService } from './services/server-keep-alive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'flexy-angular';
  /** Découplé de environment.prod.ts (souvent réécrit en CI) : voir demo-settings.ts */
  readonly demoMode = showDemoChrome;

  private readonly keepAlive = inject(ServerKeepAliveService);

  constructor() {
    this.keepAlive.start();
  }
}
