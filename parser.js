import nightmare from 'nightmare';

const url = 'https://www.amazon.co.uk/Samsung-MZ-V7E1T0BW-V-NAND-Express-Solid/dp/B07CGJNLBB';

const getItemByURL = async (url) => {
    return new Promise(resolve => {
        resolve(
            nightmare().goto(url).wait(`#priceblock_ourprice, #productTitle`).evaluate(() => {
                return {
                    title: document.getElementById(`productTitle`).innerText,
                    price: parseFloat(document.getElementById(`priceblock_ourprice`).innerText.replace('£', '')),
                    currency: document.getElementById(`priceblock_ourprice`).innerText.charAt(0)
                }
            }).end());
    });
}

const checkItemPrice = (item, threshold) => item.price < threshold ? console.log(`Item: ${item.title} is currently on sale for: ${item.price}`) : console.log(`Item: ${item.title} is not cheap enough at the moment.`);

getItemByURL(url).then((item) => {
    console.log(item);

    checkItemPrice(item, 200);
});