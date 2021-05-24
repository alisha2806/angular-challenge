import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

  private loading = new BehaviorSubject(false);
  loading$ = this.loading.asObservable();

  constructor() { }

  change(loading: boolean) {
    this.loading.next(loading);
  }
}