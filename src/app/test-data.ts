import { Resource } from './objects/resource';
import { Building } from './objects/building';

export let copper: Resource = new Resource(
     'Copper'
     , 50
     , 1
     , [ { name: 'A source of income' , amount: 1}
     , { name: 'A different source of income', amount: 2}]
);
export let silver: Resource = new Resource(
     'Silver'
     , 500
     , 1
     , [ { name: 'A source of income' , amount: 10}
     , { name: 'Different income'   , amount: 20}]
);
export let gold: Resource = new Resource('Gold');

export var testResources: Resource[] = [copper, silver, gold];
export var testResourcesJson: any[] = [
     { 'earnings'   :    [
          { 'name'       :    'A source of income'
          , 'amount'     :    1 }
          , { 'name'     :    'A different source of income'
          , 'amount'     :    2 }
     ] , 'name'     :    'Copper'
     , 'quantity'   :    50
     , 'multiplier' :    1
     , 'perTick'    :    3 }

     , { 'earnings' :    [
          { 'name'       :    'A source of income'
          , 'amount'     :    10 }
          , { 'name'     :    'Different income'
          , 'amount'     :    20 }
     ] , 'name'     :    'Silver'
     , 'quantity'   :    500
     , 'multiplier' :    1
     , 'perTick'    :    30 }

     , { 'earnings' :    []
     , 'name'       :    'Gold'
     , 'quantity'   :    0
     , 'multiplier' :    1
     , 'perTick'    :    0
}];

export let theLocalPub: Building = new Building('Pub', 'Local Pub', 300, 'gold', 10, 'gold');
export let theTownHall: Building = new Building('Longhouse', 'Town Hall', 500, 'gold', -3, 'gold');
export let aNiceHouse: Building = new Building('House', 'Nice Cottage', 100, 'gold', -1, 'gold');
export let anOuthouse: Building = new Building('Utility', 'The wash', 20, 'gold', 0, 'gold');

export let someBuildings: Building[] = [theLocalPub, theTownHall, aNiceHouse, anOuthouse];

[{"name":"The Prelate","type":"Guild Hall","cost":324,"purchaseWith":"gold","production":2,"productionType":"gold"},{"name":"The Mastodon","type":"Guild Hall","cost":392,"purchaseWith":"gold","production":8,"productionType":"gold"},{"name":"The Vulgar Barber Inn","type":"Guild Hall","cost":319,"purchaseWith":"gold","production":1,"productionType":"gold"},{"name":"Nervous Boar Inn","type":"Guild Hall","cost":397,"purchaseWith":"gold","production":7,"productionType":"gold"},{"name":"Small Blacksmith Pub","type":"Guild Hall","cost":343,"purchaseWith":"gold","production":6,"productionType":"gold"}]
