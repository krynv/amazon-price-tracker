import nightmare from 'nightmare';

checkItem();

async function checkItem() {

    let item = await nightmare().goto(`https://www.amazon.co.uk/Samsung-MZ-V7E1T0BW-V-NAND-Express-Solid/dp/B07CGJNLBB`)
        .wait(`#priceblock_ourprice, #productTitle`)
        .evaluate(() => {
            return {
                title: document.getElementById(`productTitle`).innerText,
                price: parseFloat(document.getElementById(`priceblock_ourprice`).innerText.replace('£', '')),
                currency: document.getElementById(`priceblock_ourprice`).innerText.charAt(0)
            }
        })
        .end();

    if (item.price < 150) {
        console.log(`Item: ${item.title} is currently on sale for ${item.price}`);
    } else {
        console.log(`Not cheap at the moment`);
    }

    console.log(item);
}