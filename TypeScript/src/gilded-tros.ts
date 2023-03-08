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

    // Backstage Passes:
    // - increases in Quality as its SellIn value approaches;
	// - Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
	// - Quality drops to 0 after the conference
    private handleBackstagePasses = (item: Item): Item => {
        if (item.sellIn < 0) {
            return {
                ...item,
                quality: 0
            }
        }

        if (item.sellIn <= 5) {
            return {
                ...item,
                quality: item.quality + 3
            };
        }

        if (item.sellIn <= 10) {
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

    // Smelly items: degrade in Quality twice as fast as normal items
    private handleSmellyItems = (item: Item): Item => {
        return {
            ...item,
            quality: item.sellIn < 0 ? item.quality - 4 : item.quality - 2
        };
    }

    // Increasing items: quality increasing the older it gets
    private handleIncreasingItems = (item: Item): Item => {
        return {
            ...item,
            quality: item.quality + 1
        };
    }

    private calculateItem = (item: Item): Item => {
        // Legendary Item: a legendary item, never has to be sold or decreases in Quality
        if (existsInArray(LEGENDARY_ITEMS, item.name)) {
            return item;
        }

        item.sellIn = item.sellIn - 1;

        if (existsInArray(BACKSTAGE_PASSES, item.name)) {
            return this.handleBackstagePasses(item);
        }
        
        if (existsInArray(SMELLY_ITEMS, item.name)) {
            return this.handleSmellyItems(item);
        }

        if (existsInArray(INCREASING_ITEMS, item.name)) {
            return this.handleIncreasingItems(item)
        }

        return {
            ...item,
            quality: item.sellIn < 0 ? item.quality - 2 : item.quality - 1
        };
    }

    private updateItem = (item: Item): Item => {
        const calculatedItem = this.calculateItem(item)
        const normalizedItem = normalizeQuality(calculatedItem, MAX_QUALITY, LEGENDARY_QUALITY, LEGENDARY_ITEMS);
        return new Item(normalizedItem.name, normalizedItem.sellIn, normalizedItem.quality);
    } 

    public updateQuality(): void {
        this.items = this.items.map(item => this.updateItem(item));
    }
}
