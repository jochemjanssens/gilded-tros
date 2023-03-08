import { existsInArray, normalizeQuality } from './gilded-tros.utils';
import { Item } from './item';

const LEGENDARY_ITEMS = ['B-DAWG Keychain'];
const BACKSTAGE_PASSES = ['Backstage passes for Re:Factor', 'Backstage passes for HAXX'];
const SMELLY_ITEMS = ["Duplicate Code", "Long Methods", "Ugly Variable Names"];
const INCREASING_ITEMS = ["Good Wine"];
const MAX_QUALITY = 50;
const LEGENDARY_QUALITY = 80;

export class GildedTros {
    constructor(public items: Array<Item>) {

    }

    private calculateItem = (item: Item): Item => {
        // Check if item is legendary
        if (existsInArray(LEGENDARY_ITEMS, item.name)) {
            return item;
        }

        item.sellIn = item.sellIn - 1;

        // Check if item is backstage pass
        if (existsInArray(BACKSTAGE_PASSES, item.name)) {
            if (item.sellIn < 0) {
                return {
                    ...item,
                    quality: 0
                }
            }

            if (item.sellIn < 6) {
                return {
                    ...item,
                    quality: item.quality + 3
                };
            }

            if (item.sellIn < 11) {
                return {
                    ...item,
                    quality: item.quality + 2
                };
            }

            return {
                ...item,
                quality: item.quality + 1
            };
        }
        
        // Check if item is a smelly item
        if (existsInArray(SMELLY_ITEMS, item.name)) {
            return {
                ...item,
                quality: item.sellIn < 0 ? item.quality - 4 : item.quality - 2
            };
        }

        // Check if item is increasing in value over time
        if (existsInArray(INCREASING_ITEMS, item.name)) {
            return {
                ...item,
                quality: item.quality + 1
            };
        }

        return {
            ...item,
            quality: item.sellIn < 0 ? item.quality - 2 : item.quality - 1
        };
    }

    private updateItem = (item: Item): Item => {
        const calculatedItem = this.calculateItem(item)
        return normalizeQuality(calculatedItem, MAX_QUALITY, LEGENDARY_QUALITY, LEGENDARY_ITEMS);
    } 

    public updateQuality(): void {
        this.items = this.items.map(item => this.updateItem(item));
    }
}

