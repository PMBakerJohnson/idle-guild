import { TestBed } from '@angular/core/testing';
import * as testResources from './mock-objects/resources';

import { HelperService } from '../app/helper.service';
import { Resource } from 'src/app/objects/resource';

describe('HelperService', () => {
     let service: HelperService;
     beforeEach(() => {
          TestBed.configureTestingModule({}).compileComponents();
          service = TestBed.get(HelperService);
     });

     it('should be created', () => {
          expect(service).toBeTruthy();
     });

     it('should cast JSON to resource', () => {
          expect(service.fromJSON(new Resource('noname'), testResources.gold))
     });
});
