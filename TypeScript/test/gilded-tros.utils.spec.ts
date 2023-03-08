import { existsInArray, normalizeQuality } from '../src/gilded-tros.utils';
import { Item } from '../src/item';

describe('Test existsInArray', () => {
    test('Return false when there are no items in array', () => {
        const response = existsInArray([], "backstage")
        expect(response).toEqual(false);
    });
    
    test('Return true when there are a matching item in array', () => {
        const response = existsInArray(["test", "backstage", "bckstg"], "backstage")
        expect(response).toEqual(true);
    });

    test('Return false when there is no matching item in array', () => {
        const response = existsInArray(["test", "bckstg"], "backstage")
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