import { TestBed } from '@angular/core/testing';

import { TickerService } from './ticker.service';

describe('TickerService', () => {
     let timerCallback: jasmine.Spy, service: TickerService;

     beforeEach(() => {
          TestBed.configureTestingModule({});
          service = TestBed.get(TickerService);
     });

     it('should be created', () => {
          expect(service).toBeTruthy();
     });

     it('should emit values over time', () => {
          jasmine.clock().install();
          timerCallback = jasmine.createSpy('timerCallback');
          service.tickObservable.subscribe(() => {
               timerCallback();
          });
          jasmine.clock().tick(1001);
          expect(timerCallback).toHaveBeenCalled();
     });
});
