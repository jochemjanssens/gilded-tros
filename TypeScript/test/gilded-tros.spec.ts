import {Item} from '../src/item';
import {GildedTros} from '../src/gilded-tros';

describe('At the end of each day our system lowers both values (SellIn & Quality) for every item', () => {
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

describe('Once the sell by date has passed, Quality degrades twice as fast', () => {
    const items: Item[] = [new Item('item0', -2, 10), new Item('item1', 0, 30), new Item('item2', -12, 40)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    test('check first item object', () => {
        expect(app.items[0].name).toEqual('item0');
        expect(app.items[0].sellIn).toEqual(-3);
        expect(app.items[0].quality).toEqual(8);
    });
    test('check second item object', () => {
        expect(app.items[1].name).toEqual('item1');
        expect(app.items[1].sellIn).toEqual(-1);
        expect(app.items[1].quality).toEqual(28);
    });
    test('check third item object', () => {
        expect(app.items[2].name).toEqual('item2');
        expect(app.items[2].sellIn).toEqual(-13);
        expect(app.items[2].quality).toEqual(38);
    });
});

describe('The Quality of an item is never negative', () => {
    const items: Item[] = [new Item('item0', -2, 1), new Item('item1', -4, 0), new Item('item2', 2, 0)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    test('check first item object', () => {
        expect(app.items[0].name).toEqual('item0');
        expect(app.items[0].sellIn).toEqual(-3);
        expect(app.items[0].quality).toEqual(0);
    });
    test('check second item object', () => {
        expect(app.items[1].name).toEqual('item1');
        expect(app.items[1].sellIn).toEqual(-5);
        expect(app.items[1].quality).toEqual(0);
    });
    test('check third item object', () => {
        expect(app.items[2].name).toEqual('item2');
        expect(app.items[2].sellIn).toEqual(1);
        expect(app.items[2].quality).toEqual(0);
    });
});