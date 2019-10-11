import nightmare from 'nightmare';

checkItem();

async function checkItem() {

    let item = await nightmare().goto(`https://www.amazon.co.uk/Samsung-MZ-V7E1T0BW-V-NAND-Express-Solid/dp/B07CGJNLBB`)
        .wait(`#priceblock_ourprice`)
        .evaluate(() => {
            return {
                title: document.getElementById(`productTitle`).innerText,
                price: document.getElementById(`priceblock_ourprice`).innerText,
            }
        })
        .end();

    console.log(item);
}