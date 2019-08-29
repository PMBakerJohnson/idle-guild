import { NgModule } from '@angular/core';
import { MockResourcesService } from './mock-objects/resource-service';
import { AResourceService } from 'src/abstracts/aresource-service';
import { ABuildingService } from 'src/abstracts/abuilding-service';
import { MockBuildingsService } from './mock-objects/building-service';

@NgModule({
     providers: [
          { provide: AResourceService, useClass: MockResourcesService },
          { provide: ABuildingService, useClass: MockBuildingsService }
     ]
})
export class TestModule { }
