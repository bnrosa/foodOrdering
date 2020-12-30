const foodOrdering ={
    launch: (type) => {
        if(type === 'ubereats'){
            return new UbereatsBot;
        }
    }
}  

class UbereatsBot{
    /**
     * 
     * @param {String} foodType 
     * @param {String} address
     * 
     * @returns {Array(String)} links to open restaurants of food type sected nerby the address
     */
    async getOpenRestaurants(foodType, address){
        const puppeteer = require('puppeteer');
        const ubereats = 'https://www.ubereats.com/mx-en';
        
        //Selectors
        const locationSelector = '#location-typeahead-home-input';
        const foodSelector = '#search-suggestions-typeahead-input';
        

        //Page creation
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.setViewport({ width: 1400, height: 700 });

        //Go to page
        await page.goto(ubereats, {waitUntil: 'domcontentloaded'});   

        //Type address
        await page.waitForSelector(locationSelector);
        await page.type(locationSelector, address);
        await page.waitForSelector('#location-typeahead-home-item-0');
        await page.keyboard.press('Enter');
        
        //Type food type
        await page.waitForSelector(foodSelector);
        await page.type(foodSelector, foodType);
        try {
            await page.waitForSelector('#search-suggestions-typeahead-item-0', {timeout: 100}); 
        } catch (error) {
        }
        await page.keyboard.press('Enter');

        await page.waitForSelector('figure > a');

        //Get restaurant links, filter closed ones
        const restaurantList = await page.evaluate(() => {
            const unavailableLike = RegExp('opens at|unavailable', 'i');
            let restaurants = document.querySelectorAll("#main-content > div > div > div > div > div > div");
            let restaurantsArr = [...restaurants];
            console.log(restaurantsArr);
            let restAvailable = restaurantsArr.filter(({innerHTML}) => !unavailableLike.test(innerHTML));
            console.log(restAvailable);
            let restLinks = restAvailable.map((rest, index) =>{
                let restLink = rest.querySelector('figure > a');
                if(restLink != null){
                    console.log(restLink.href)
                    return restLink.href;
                }
                return null;
            });
            return restLinks.filter((el) => el!=null);
        });

        browser.close();
        return restaurantList;
    }
}

module.exports = foodOrdering;