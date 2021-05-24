import {
  Component,
  OnDestroy,
  OnInit
 } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private $destroy = new Subject<boolean>();

  title = 'ig-frontend-challenge';
  loading = false;

  constructor(
    private router: Router,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit(): void {
    this.router.events.pipe(takeUntil(this.$destroy)).subscribe((e: RouterEvent) => {            
      if (e instanceof NavigationStart) {
        this.loadingService.change(true);
      } else if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
        this.loadingService.change(false);
      }
    });
    this.loadingService.loading$.pipe(takeUntil(this.$destroy)).subscribe((state: boolean) => {
      this.loading = state
    });
  }
  
  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.unsubscribe();
  }
}
