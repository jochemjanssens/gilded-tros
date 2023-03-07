# Gilded Tros Refactoring Kata

This Kata is based on the Gilded Rose Kata, originally created by Terry Hughes (http://twitter.com/TerryHughes). It is already on GitHub [here](https://github.com/NotMyself/GildedRose). See also [Bobby Johnson's description of the kata](http://iamnotmyself.com/2011/02/13/refactor-this-the-gilded-rose-kata/) and [this version with multiple languages](https://github.com/emilybache/GildedRose-Refactoring-Kata).
It was slightly rebranded by Axxes IT Consultancy, and renamed to Gilded Tros (with a wink to a local bar near the Axxes HQ ;)).

## How to use this Kata

The simplest way is to just clone the code and start hacking away improving the design. 
Instructions can be found in the GildedTrosRequirements document.


Have fun and good luck!

## Rules
- End of the day: SellIn-1 & Quality-1

### Exceptions
- SellIn <0  Quality - *2
- Quality always >=0
- Good Wine Quality +1
- Quality always <=50 (Except legendary = 80)
- "B-DAWG Keychain" fixed SellIn and Quality
- "Backstage passes": Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
- "Backstage passes": Quality drops to 0 after the conference
- Smelly items ("Duplicate Code", "Long Methods", "Ugly Variable Names") degrade in Quality twice as fast as normal items

