import {Item} from '../src/item';
import {GildedTros} from '../src/gilded-tros';

describe('End of the day: SellIn - 1 & Quality - 1', () => {
    const items: Item[] = [new Item('item0', 1, 1), new Item('item1', 10, 1), new Item('item2', 5, 5)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    test('check first item object', () => {
        expect(app.items[0].name).toEqual('item0');
        expect(app.items[0].sellIn).toEqual(0);
        expect(app.items[0].quality).toEqual(0);
    });
    test('check second item object', () => {
        expect(app.items[1].name).toEqual('item1');
        expect(app.items[1].sellIn).toEqual(9);
        expect(app.items[1].quality).toEqual(0);
    });
    test('check third item object', () => {
        expect(app.items[2].name).toEqual('item2');
        expect(app.items[2].sellIn).toEqual(4);
        expect(app.items[2].quality).toEqual(4);
    });
});
