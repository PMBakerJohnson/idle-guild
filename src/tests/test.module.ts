import { NgModule } from '@angular/core';
import { MockResourcesService } from './mock-objects/resource-service';
import { MockBuildingsService } from './mock-objects/building-service';
import { ABuildingService } from 'src/app/services/abstracts/abuilding-service';
import { AResourceService } from 'src/app/services/abstracts/aresource-service';

@NgModule({
     providers: [
          { provide: AResourceService, useClass: MockResourcesService },
          { provide: ABuildingService, useClass: MockBuildingsService }
     ]
})
export class TestModule { }
