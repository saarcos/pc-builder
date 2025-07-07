export type Item = {
  _id: string,
  code: string,
  componentType: string,
  image: string,
  lastUpdated: string,
  link: string,
  name: string,
  price: number,
}
export type Component = {
  name: string,
  componentType: string,
}
export type LockedComponents = {
  processors?: Item;
  "video-cards"?: Item;
  memory?: Item;
  "hard-drives"?: Item;
  motherboards?: Item;
  "power-supplies"?:Item
};
type ComponentType = {
  type: string,
  componentId: string,
  name: string,
  image: string,
  price: number,
  link: string
}
export type Build = {
  _id: string;
  name: string;
  usage: string;
  budget: number;
  totalPrice: number;
  components: ComponentType[];
};
type ComponentSchema = {
  id: string,
  name: string,
}
export type BuildAI = {
  processor: ComponentSchema,
  motherboard: ComponentSchema,
  videoCard?: ComponentSchema,
  memory: ComponentSchema,
  storage: ComponentSchema,
  psu: ComponentSchema,
  cooler?: ComponentSchema
}