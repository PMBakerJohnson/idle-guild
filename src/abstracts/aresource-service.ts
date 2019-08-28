import { Resource } from 'src/app/objects/resource';
import { BehaviorSubject } from 'rxjs';

export abstract class AResourceService {
     resourcesSubject$: BehaviorSubject<Resource[]>;
     spend: (amountToSpend: number
          , resourceToSpend: string) => boolean;
     updateIncome: (incomeSource: string
          , incomeAmount: number
          , resourceEarned: string) => void;
     updateResources: (newresources: any[]) => void;
}
