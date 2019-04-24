import { Resource } from '../objects/resource';
import { BehaviorSubject } from 'rxjs';

export class mockResourceService {

     static resources: Resource[];
     static setResources(resources: Resource[]): void {
          if (resources !== undefined) { mockResourceService.resources = resources }
     }
     
     constructor() {
          if (mockResourceService.resources !== undefined)
          {
               this.resources$ = new BehaviorSubject(mockResourceService.resources);
          } else {
               this.resources$ = new BehaviorSubject([]);
          }
     }
     public spend(): boolean { return true; }
     public updateIncome(): void {}
     public resources$: BehaviorSubject<Resource[]>;
     public updateResources(): void { }
}
