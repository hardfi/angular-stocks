import { Injectable, OnDestroy } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceService implements OnDestroy {
  private isMobile: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isLandscape: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isMobileLandscape: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readonly isMobile$ = this.isMobile.asObservable();
  public readonly isLandscape$ = this.isLandscape.asObservable();
  public readonly isMobileLandscape$ = this.isMobileLandscape.asObservable();

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
    this.isLandscape.next(isLandscape);
    this.isMobile.next(isMobile);
    this.isMobileLandscape.next(isMobile && isLandscape);
  }

  ngOnDestroy(): void {
    window.removeEventListener('orientationchange', (event) => this.updateDeviceInfo(event));
  }
}
