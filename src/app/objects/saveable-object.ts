export interface SaveableObject {
     id: number;
     deserialize: (objectAsJson: any) => SaveableObject;
}
