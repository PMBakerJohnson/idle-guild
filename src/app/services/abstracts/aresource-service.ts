import { Resource } from 'src/app/objects/resource';
import { BehaviorSubject } from 'rxjs';

export abstract class AResourceService {
     public resourcesSubject$: BehaviorSubject<Resource[]>;
     public spend: (amountToSpend: number
          , resourceToSpend: string) => boolean;
     public updateIncome: (incomeSource: string
          , incomeAmount: number
          , resourceEarned: string) => void;
     public updateResources: (newresources: any[]) => void;
}
