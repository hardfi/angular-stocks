import { Injectable, OnDestroy } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MobileService implements OnDestroy {
  isMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLandscape$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isMobileLandscape$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private mobileService: DeviceDetectorService) {
    this.updateDeviceInfo();
    window.addEventListener('orientationchange', (event) => this.updateDeviceInfo(event));
  }

  updateDeviceInfo(event?): void {
    const isMobile = this.mobileService.isMobile();
    let isLandscape;
    if (event) {
      isLandscape = [90, 180].includes(event.currentTarget.orientation);
    } else {
      isLandscape = this.mobileService.orientation === 'landscape';
    }
    this.isLandscape$.next(isLandscape);
    this.isMobile$.next(isMobile);
    this.isMobileLandscape$.next(isMobile && isLandscape);
  }

  ngOnDestroy(): void {
    window.removeEventListener('orientationchange', (event) => this.updateDeviceInfo(event));
  }
}
