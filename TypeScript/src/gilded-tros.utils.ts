import { Item } from "./item";

export const existsInArray = (array: string[], itemName: string): boolean => {
    return array.some(item => itemName === item);
}

export const normalizeQuality = (item: Item, maxQuality: number, legendaryQuality: number, legendaryItems: string[]): Item => {
    if (existsInArray(legendaryItems, item.name)) {
        return {
            ...item,
            quality: legendaryQuality
        };
    }

    if (item.quality > maxQuality) {
        return {
            ...item,
            quality: maxQuality
        }
    }

    if (item.quality < 0) {
        return {
            ...item,
            quality: 0
        }
    }

    return item;
}