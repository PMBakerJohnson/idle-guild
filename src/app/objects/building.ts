// import { SaveableObject } from './saveable-object';

const BUILDINGNAMES: string[] = [
     'The Warehouser & The Cartographer Tavern',
     'The Broad Guardsman',
     'The Chubby Falcon & The Weretiger Inn',
     'The Gnome Tavern',
     'The Druid',
     'Nervous Boar Inn',
     'The Frog & The Viscount Inn',
     'The Peasant',
     'The Otyugh Inn',
     'The Bowman',
     'The Ancient Wizard Arms',
     'The Slime Inn',
     'Ugly Spore Inn',
     'The Priestess',
     'The Prelate',
     'The Charming Storeroom',
     'Young Baboon Arms',
     'The Basilisk Inn',
     'The Tawdry Soldier',
     'The Barbarian Pub',
     'The Mastodon',
     'The Eunuch Inn',
     'The Viper Tavern',
     'The Pretty Granger',
     'The Cross Inn',
     'Small Blacksmith Pub',
     'The Vine',
     'The Centipede & The Leopard Tavern',
     'The Mortician Inn',
     'Rampant Wyvern Tavern',
     'The Hippogriff',
     'The Nurse Tavern',
     'The Merfolk',
     'The Tiler Inn',
     'The Tart Almoner Arms',
     'The Dragon',
     'The Magpie & Snake',
     'The Ceramic Pantler',
     'Shaking Lady & Handsome Artisan',
     'The Tiger Tavern',
     'Thin Crier Inn',
     'Bronze Horn Inn',
     'The Earth & The Bear Pub',
     'The Astrologer Tavern',
     'The Fresh Earless Inn',
     'The Vulgar Barber Inn',
     'The Triton',
     'The Turquoise Woodcarver',
     'Healthy Alchemist Inn',
     'The Rakshasa Tavern'
];

export class Building {
     public type: string;
     public name: string;
     public cost: number;
     public purchaseWith: string;
     public production: number;
     public productionType: string;
     constructor(type: string = 'Guild Hall'
          , name = ''
          , cost: number = Math.floor(Math.random() * (400 - 300 + 1) + 300)
          , purchaseWith = 'gold'
          , production: number = Math.floor(Math.random() * (10 - 1 + 1) + 1)
          , productionType = 'gold') {
          // Sets the name. If none specified, generates a new one.
          if (name !== '') {
               this.name = name;
          } else {
               this.name = BUILDINGNAMES[Math.floor(Math.random() * BUILDINGNAMES.length)];
          }
          this.type = type;
          this.cost = cost;
          this.purchaseWith = purchaseWith;
          this.production = production;
          this.productionType = productionType;
     }
}

// export class SaveableBuilding implements SaveableObject {
//      public id: number;
//      public name: string;
//      public cost: number;
//      public purchaseWith: string;
//      public deserialize: (objectAsJson: any) => SaveableObject;
// }
