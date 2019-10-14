import nightmare from 'nightmare';

const acceptedWebsites = ['www.overclockers.co.uk', 'www.amazon.co.uk'];

const getAmazonItem = async (url) => {
    return new Promise(resolve => {
        resolve(
            nightmare().goto(url).wait(`#priceblock_ourprice, #productTitle`).evaluate(() => {
                return {
                    title: document.getElementById(`productTitle`).innerText,
                    price: parseFloat(document.getElementById(`priceblock_ourprice`).innerText.replace('£', '')),
                    currency: document.getElementById(`priceblock_ourprice`).innerText.charAt(0),
                }
            }).end()
        );
    });
}

const checkItemPrice = (link, item, threshold) => item.price < threshold ? console.log(`The item: ${item.title} is currently on sale for: ${item.currency}${item.price} over at: ${link}`) : console.log(`Item: ${item.title} is not cheap enough at the moment.`);

const getDomain = (url) => {
    return url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[1];
}

const getOcUKItem = async (url) => {
    return new Promise(resolve => {
        resolve(
            nightmare().goto(url).wait('.article_details_price2').evaluate(() => {

                return {
                    title: document.querySelector('#breadcrumb strong').innerText,
                    price: parseFloat(document.getElementsByClassName('article_details_price2')[0].children[1].innerText.replace('£', '').replace('*', '')), // ocuk has two tags for this class. We just want the first one
                    currency: document.getElementsByClassName('article_details_price2')[0].children[1].innerText.charAt(0),
                }
            }).end()
        );
    });
}

const getMyItem = (url, acceptedPrice) => {

    if (acceptedWebsites.some(acceptedWebsite => url.includes(acceptedWebsite))) { // probably needs changing in the future

        let domain = getDomain(url);

        switch (domain) {
            case 'www.overclockers.co.uk':
                getOcUKItem(url).then((item) => {
                    //console.log(item);
                    checkItemPrice(url, item, acceptedPrice);
                });
                break;
            case 'www.amazon.co.uk':
                getAmazonItem(url).then((item) => {
                    //console.log(item);
                    checkItemPrice(url, item, acceptedPrice);
                });
                break;
        }

    } else {
        console.log(`Sorry, ${url} is not currently supported.`);
    }

}


// our inputs
const amazonURL = 'https://www.amazon.co.uk/Samsung-MZ-V7E1T0BW-V-NAND-Express-Solid/dp/B07CGJNLBB';
const ocukURL = 'https://www.overclockers.co.uk/samsung-970-evo-polaris-1tb-m.2-2280-pci-e-3.0-x4-nvme-solid-state-drive-hd-23p-sa.html';
const acceptedPrice = 200;


getMyItem(amazonURL, acceptedPrice);
getMyItem(ocukURL, acceptedPrice);
// getMyItem('http://flix.industries', acceptedPrice);