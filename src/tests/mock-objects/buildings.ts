import { Building } from '../../app/objects/building';


export let theLocalPub:  Building = new Building('Pub',          'Local Pub',        300, 'Gold',   10,  'Gold');
export let theTownHall:  Building = new Building('Longhouse',    'Town Hall',        500, 'Gold',   -3,  'Gold');
export let aNiceHouse:   Building = new Building('House',        'Nice Cottage',     100, 'Silver', -1,  'Silver');
export let theWash:      Building = new Building('Utility',      'The wash',         20,  'Copper', 0,   'Copper');

export let testBuildings: Building[] = [theLocalPub, theTownHall, aNiceHouse, theWash];
export let testBuildingsJson: any[] = [
     {
          'name':             'Local Pub'
          , 'type':           'Pub'
          , 'cost':           300
          , 'purchaseWith':   'Gold'
          , 'production':     10
          , 'productionType': 'Gold'
     }, {
          'name':             'Town Hall'
          , 'type':           'Longhouse'
          , 'cost':           500
          , 'purchaseWith':   'Gold'
          , 'production':     -3
          , 'productionType': 'Gold'
     }, {
          'name':             'Nice Cottage'
          , 'type':           'House'
          , 'cost':           100
          , 'purchaseWith':   'Silver'
          , 'production':     -1
          , 'productionType': 'Silver'
     }, {
          'name':             'The wash'
          , 'type':           'Utility'
          , 'cost':           20
          , 'purchaseWith':   'Copper'
          , 'production':     0
          , 'productionType': 'Copper'
     }
];

export let theLocalBar:  Building = new Building('Bar',          'A Local Bar',      300, 'Gold',   10,  'Gold');
export let theMageGuild: Building = new Building('Guild Hall',   'The Mage Guild',   500, 'Gold',   2,   'Silver');
export let aShabbyCabin: Building = new Building('House',        'A Shabby Cabin',   100, 'Silver', -1,  'Silver');
export let anOuthouse:   Building = new Building('Utility',      'An Outhouse',      20,  'Copper', 0,   'Copper');

export let testOtherBuildings: Building[] = [theLocalBar, theMageGuild, aShabbyCabin, anOuthouse];
export let testOtherBuildingsJson: any[] = [
     {
          'name':             'A Local Bar'
          , 'type':           'Bar'
          , 'cost':           300
          , 'purchaseWith':   'Gold'
          , 'production':     10
          , 'productionType': 'Gold'
     }, {
          'name':             'The Mage Guild'
          , 'type':           'Guild Hall'
          , 'cost':           500
          , 'purchaseWith':   'Gold'
          , 'production':     2
          , 'productionType': 'Silver'
     }, {
          'name':             'A Shabby Cabin'
          , 'type':           'House'
          , 'cost':           100
          , 'purchaseWith':   'Silver'
          , 'production':     -1
          , 'productionType': 'Silver'
     }, {
          'name':             'An Outhouse'
          , 'type':           'Utility'
          , 'cost':           20
          , 'purchaseWith':   'Copper'
          , 'production':     0
          , 'productionType': 'Copper'
     }
];
