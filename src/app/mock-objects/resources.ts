import { Resource } from '../objects/resource';


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
     , [ { name: 'A source of income'   , amount: 10}
     , { name: 'Different income'       , amount: 20}]
);
export let gold: Resource = new Resource('Gold');

export var testResources: Resource[] = [copper, silver, gold];
export var testResourcesJson: any[] = [
     {
          'earnings':
          [{
               'name':        'A source of income'
               , 'amount':    1
          }, {
               'name':        'A different source of income'
               , 'amount':    2
          }]
          , 'name':    'Copper'
          , 'quantity':  50
          , 'multiplier':1
          , 'perTick':   3
     }, {
          'earnings':
          [{
               'name':        'A source of income'
               , 'amount':    10
          }, {
               'name':        'Different income'
               , 'amount':    20
          }]
          , 'name':      'Silver'
          , 'quantity':  500
          , 'multiplier':1
          , 'perTick':   30
     }, {
          'earnings':    []
          , 'name':      'Gold'
          , 'quantity':  0
          , 'multiplier':1
          , 'perTick':   0
     }
];
