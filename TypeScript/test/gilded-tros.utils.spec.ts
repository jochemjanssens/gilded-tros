import { isBackstagePass, isLegendary, isSmellyItem, normalizeQuality } from '../src/gilded-tros.utils';
import { Item } from '../src/item';

describe('Test isBackstagePass', () => {
    test('Return false when there are no backstage passes', () => {
        const response = isBackstagePass([], "backstage")
        expect(response).toEqual(false);
    });
    
    test('Return true when there are a matching backstage pass', () => {
        const response = isBackstagePass(["test", "backstage", "bckstg"], "backstage")
        expect(response).toEqual(true);
    });

    test('Return false when there are no a matching backstage passes', () => {
        const response = isBackstagePass(["test", "bckstg"], "backstage")
        expect(response).toEqual(false);
    });
});

describe('Test isLegendary', () => {
    test('Return false when there are no legendary items', () => {
        const response = isLegendary([], "legendary")
        expect(response).toEqual(false);
    });
    
    test('Return true when there are a matching legendary item', () => {
        const response = isLegendary(["gold", "legendary", "almost legendary"], "legendary")
        expect(response).toEqual(true);
    });

    test('Return false when there are is no matching legendary items', () => {
        const response = isLegendary(["gold", "almost legendary"], "legendary")
        expect(response).toEqual(false);
    });
});

describe('Test isSmellyItem', () => {
    test('Return false when there are no smelly items', () => {
        const response = isSmellyItem([], "smelly")
        expect(response).toEqual(false);
    });
    
    test('Return true when there are a matching smelly item', () => {
        const response = isLegendary(["garbage", "smelly", "almost smelly"], "smelly")
        expect(response).toEqual(true);
    });

    test('Return false when there are is no matching smelly items', () => {
        const response = isLegendary(["gold", "almost smelly"], "smelly")
        expect(response).toEqual(false);
    });
});

describe('Test normalizeQuality', () => {
    const maxQuality = 50;
    const legendaryQuality = 80;
    const legendaryItems = ["Legendary"];
    test('Return 0 when the quality is negative', () => {
        const item: Item = new Item("Negative Item", -2, -2);
        const response = normalizeQuality(item, maxQuality, legendaryQuality, legendaryItems);
        expect(response.quality).toEqual(0);

    });
    test('Return the maxQuality when the quality is higher than the max quality', () => {
        const item: Item = new Item("Max Item", -2, 100);
        const response = normalizeQuality(item, maxQuality, legendaryQuality, legendaryItems);
        expect(response.quality).toEqual(maxQuality);
    });
    test('Return the legendary quality when the item is legendary', () => {
        const item: Item = new Item("Legendary", -2, 100);
        const response1 = normalizeQuality(item, maxQuality, legendaryQuality, legendaryItems);
        expect(response1.quality).toEqual(legendaryQuality);

        item.quality = -10;
        const response2 = normalizeQuality(item, maxQuality, legendaryQuality, legendaryItems);
        expect(response2.quality).toEqual(legendaryQuality);
    });
    test('Return the quality when the quality is inside the bounds', () => {
        const item: Item = new Item("Basic", -2, 10);
        const response = normalizeQuality(item, maxQuality, legendaryQuality, legendaryItems);
        expect(response.quality).toEqual(10);
    });
});