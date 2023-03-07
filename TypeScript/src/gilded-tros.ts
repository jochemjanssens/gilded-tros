import {Item} from './item';

const LEGENDARY_ITEMS = ['B-DAWG Keychain'];
const BACKSTAGE_PASSES = ['Backstage passes for Re:Factor', 'Backstage passes for HAXX'];
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

    private updateItemQuality = (item: Item): Item => {
        if (this.isLegendary(item.name)) {
            return {
                ...item,
                quality: LEGENDARY_QUALITY
            };
        }

        if (item.name != 'Good Wine' && !this.isBackstagePass(item.name)) {
            if (item.quality > 0) {
                item.quality = item.quality - 1;
            }
        } else {
            if (item.quality < 50) {
                item.quality = item.quality + 1;

                if (this.isBackstagePass(item.name)) {
                    if (item.sellIn < 11) {
                        item.quality = item.quality + 1;
                    }

                    if (item.sellIn < 6) {
                        item.quality = item.quality + 1;
                    }
                }
            }
        }

        item.sellIn = item.sellIn - 1;

        if (item.sellIn < 0) {
            if (item.name != 'Good Wine') {
                if (!this.isBackstagePass(item.name)) {
                    if (item.quality > 0) {
                        item.quality = item.quality - 1;
                    }
                } else {
                    item.quality = item.quality - item.quality;
                }
            }
        }

        if (item.quality > MAX_QUALITY) {
            item.quality = MAX_QUALITY;
        }

        return item;
    }

    public updateQuality(): void {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i] = this.updateItemQuality(this.items[i]);
        }
    }
}

