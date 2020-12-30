# Food Ordering API foor Automated Orders

This bot is on early early stage, but we still have some useful features. It mostly depends on and it's based on google's Puppeteer. The goal is to be able to order food via this bot, that should be able to provide a nice API for small food subscription businesses making many orders a day.

## Features

- Check for restaurants in your area:

```javascript
const foodOrdering = require('../index.js');
const bot = foodOrdering.launch('ubereats');

(async () => {
    const log = await bot.getOpenRestaurants('Burger', 'San Francisco');
    console.log(log);
})();
```

This will yield and Array containing links to the open restaurants in San Francisco
that server burgers:

```javascript
[
  'https://www.ubereats.com/mx-en/san-francisco/food-delivery/pastime-pastas/tJ_Il4p_QBKXZsyNuGNCoQ',
  'https://www.ubereats.com/mx-en/san-francisco/food-delivery/marios-italian-ristorante/l2HPox1aRhOXOcKI1weR7g',
  'https://www.ubereats.com/mx-en/san-francisco/food-delivery/italian-homemade-company-marina/KBcg9DAaT_uyDYDzN98C3w',
  'https://www.ubereats.com/mx-en/san-francisco/food-delivery/the-italian-homemade-company-hayes-valley/xlI1U2FaRX-XNZROZkP4sg',
  'https://www.ubereats.com/mx-en/san-francisco/food-delivery/the-pasta/Bb72lnM5Rh-LphjWF70fPQ',
  'https://www.ubereats.com/mx-en/san-francisco/food-delivery/endless-pastabilities/gx3QdycyR-C-fi4ksPcHlw',
  //...
]
```

## Planned features

* Order a specific dish to an specific address using a specific login.
* Support to other platforms:
    * Yelp
    * iFood
    * Many more!