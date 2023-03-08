import { Item } from "./item";

export const isBackstagePass = (backstagePasses: string[], itemName: string): boolean => {
    return backstagePasses.some(backstagePass => itemName === backstagePass);
}

export const isLegendary = (legendaryItems: string[], itemName: string): boolean => {
    return legendaryItems.some(legendaryItem => itemName === legendaryItem);
}

export const isSmellyItem = (smellyItems: string[], itemName: string): boolean => {
    return smellyItems.some(smellyItem => itemName === smellyItem);
}

export const normalizeQuality = (item: Item, maxQuality: number, legendaryQuality: number, legendaryItems: string[]): Item => {
    if (isLegendary(legendaryItems, item.name)) {
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