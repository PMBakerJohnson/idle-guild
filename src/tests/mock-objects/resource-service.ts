import { Resource } from '../../app/objects/resource';
import { BehaviorSubject } from 'rxjs';
import { AResourceService } from 'src/abstracts/aresource-service';

export class MockResourcesService implements AResourceService {
     constructor() { }
     resourcesSubject$: BehaviorSubject<Resource[]> = new BehaviorSubject<Resource[]>([]);
     spend(_amountToSpend: number, _resourceToSpend: string) {
          return true;
     }
     updateIncome(_incomeSource: string, _incomeAmount: number, _resourceEarned: string) {}
     updateResources(_newResources: any[]) {}
}
