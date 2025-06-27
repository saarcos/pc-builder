export type Item = {
    _id: string,
    code: string,
    componentType: string,
    image: string,
    lastUpdated: string,
    link: string,
    name: string,
    price: string,
}
export type Component = {
    name: string,
    componentType: string,
}
export type LockedComponents = {
    cpu?: Item;
    gpu?: Item;
    ram?: Item;
    storage?: Item;
    motherboard?: Item;
};