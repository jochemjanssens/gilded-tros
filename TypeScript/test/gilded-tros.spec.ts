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

describe('"Good Wine" actually increases in Quality the older it gets', () => {
    const items: Item[] = [new Item('Good Wine', 5, 1), new Item('Good Wine', -5, 4), new Item('GoodWine', -5, 4)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    test('check for a positive SellIn value', () => {
        expect(app.items[0].name).toEqual('Good Wine');
        expect(app.items[0].sellIn).toEqual(4);
        expect(app.items[0].quality).toEqual(2);
    });
    test('check for a negative SellIn value', () => {
        expect(app.items[1].name).toEqual('Good Wine');
        expect(app.items[1].sellIn).toEqual(-6);
        expect(app.items[1].quality).toEqual(5);
    });
    test('check baseline with a wrongly spelled word', () => {
        expect(app.items[2].name).toEqual('GoodWine');
        expect(app.items[2].sellIn).toEqual(-6);
        expect(app.items[2].quality).toEqual(2);
    });
});

describe('The Quality of an item is never more than 50', () => {
    const items: Item[] = [new Item('Good Wine', 20, 50)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    test('check if quality of "Good Wine" is capped to 50', () => {
        expect(app.items[0].name).toEqual('Good Wine');
        expect(app.items[0].sellIn).toEqual(19);
        expect(app.items[0].quality).toEqual(50);
    });
});

describe('"B-DAWG Keychain", being a legendary item, never has to be sold or decreases in Quality', () => {
    const items: Item[] = [new Item("B-DAWG Keychain", -2, 1), new Item("B-DAWG Keychain", -4, 0), new Item("B-DAWG Keychain", 2, 0)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    test('check first item object', () => {
        expect(app.items[0].name).toEqual('B-DAWG Keychain');
        expect(app.items[0].sellIn).toEqual(-2);
        expect(app.items[0].quality).toEqual(1);
    });
    test('check second item object', () => {
        expect(app.items[1].name).toEqual('B-DAWG Keychain');
        expect(app.items[1].sellIn).toEqual(-4);
        expect(app.items[1].quality).toEqual(0);
    });
    test('check third item object', () => {
        expect(app.items[2].name).toEqual('B-DAWG Keychain');
        expect(app.items[2].sellIn).toEqual(2);
        expect(app.items[2].quality).toEqual(0);
    });
});
