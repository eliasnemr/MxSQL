import { MinimaService } from './services/minima.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  $nodeStatus: Subscription;
  constructor(private minimaService: MinimaService, private route: Router) {}

  ngOnInit() {
    /**
     * Subscribe to Minima Node Status Changes
     */
    this.$nodeStatus =
    this.minimaService.$nodeStatus.subscribe((state: boolean) => {
      if (!state) {
        this.route.navigate(['offline']);
      } else {
        this.route.navigate(['home']);
      }
    });
  }
  ngOnDestroy() {
    this.$nodeStatus.unsubscribe();
  }
}
