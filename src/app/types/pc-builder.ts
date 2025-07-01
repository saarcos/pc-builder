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
};