import {Item} from './item';

const LEGENDARY_ITEMS = ['B-DAWG Keychain'];
const BACKSTAGE_PASSES = ['Backstage passes for Re:Factor', 'Backstage passes for HAXX'];
const SMELLY_ITEMS = ["Duplicate Code", "Long Methods", "Ugly Variable Names"];
const MAX_QUALITY = 50;
const LEGENDARY_QUALITY = 80;

export class GildedTros {

    constructor(public items: Array<Item>) {

    }

    private isBackstagePass = (itemName: string): boolean => {
        return BACKSTAGE_PASSES.some(BACKSTAGE_PASS => itemName === BACKSTAGE_PASS);
    }

    private isLegendary = (itemName: string): boolean => {
        return LEGENDARY_ITEMS.some(LEGENDARY_ITEM => itemName === LEGENDARY_ITEM);
    }

    private isSmellyItem = (itemName: string): boolean => {
        return SMELLY_ITEMS.some(SMELLY_ITEM => itemName === SMELLY_ITEM);
    }

    private normalizeQuality = (item: Item): Item => {
        if (item.quality > MAX_QUALITY) {
            return {
                ...item,
                quality: MAX_QUALITY
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

    private updateItemQuality = (item: Item): Item => {
        if (this.isLegendary(item.name)) {
            return {
                ...item,
                quality: LEGENDARY_QUALITY
            };
        }

        if (this.isBackstagePass(item.name)) {
            item.quality = item.quality + 1;

            if (item.sellIn < 11) {
                item.quality = item.quality + 1;
            }

            if (item.sellIn < 6) {
                item.quality = item.quality + 1;
            }

            item.sellIn = item.sellIn - 1;

            if (item.sellIn < 0) {
                item.quality = 0;
            }
    
            return this.normalizeQuality(item);
        }
        
        if (this.isSmellyItem(item.name)) {
            item.quality = item.quality - 2;
            item.sellIn = item.sellIn - 1;

            if (item.sellIn < 0) {
                item.quality = item.quality - 2;
            }
            
            return this.normalizeQuality(item);
        }

        if (item.name === 'Good Wine') {
            item.quality = item.quality + 1;
            item.sellIn = item.sellIn - 1;
            
            return this.normalizeQuality(item);
        }

        item.quality = item.quality - 1;
        item.sellIn = item.sellIn - 1;

        if (item.sellIn < 0) {
            item.quality = item.quality - 1;
        }

        return this.normalizeQuality(item);
    }

    public updateQuality(): void {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i] = this.updateItemQuality(this.items[i]);
        }
    }
}

