import { Resource } from '../../app/objects/resource';


export let copper: Resource = new Resource(
     'Copper'
     , 50
     , 1
     , [{ name: 'A source of income', amount: 1 }
          , { name: 'A different source of income', amount: 2 }]
);
export let silver: Resource = new Resource(
     'Silver'
     , 500
     , 1
     , [{ name: 'A source of income', amount: 10 }
          , { name: 'Different income', amount: 20 }]
);
export let gold: Resource = new Resource('Gold');
export let goldJson: any = JSON.parse(JSON.stringify(gold));

export let testResources: Resource[] = [copper, silver, gold];
export let testResourcesJson: any[] = JSON.parse(JSON.stringify(testResources));
