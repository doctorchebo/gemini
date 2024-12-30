import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  constructor(private observer: BreakpointObserver) {}

  isBelowSm(): Observable<BreakpointState> {
    return this.observer.observe(['(max-width: 575px)']);
  }
  isBelowMd(): Observable<BreakpointState> {
    return this.observer.observe(['(max-width: 767px)']);
  }

  isBelowLg(): Observable<BreakpointState> {
    return this.observer.observe(['(max-width:991px)']);
  }

  isBelowXL(): Observable<BreakpointState> {
    return this.observer.observe(['(max-width: 1199px)']);
  }
}
