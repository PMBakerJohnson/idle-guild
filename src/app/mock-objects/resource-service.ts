import { Resource } from '../objects/resource';
import { BehaviorSubject } from 'rxjs';

export class mockResourceService {
     constructor(resources: Resource[] = undefined) {
          if (resources !== undefined) { this.resources$ = new BehaviorSubject(resources); };
     }
     public spend(): boolean { return true; }
     public updateIncome(): void {}
     public resources$: BehaviorSubject<Resource[]>;
     public updateResources(): void { }
}
