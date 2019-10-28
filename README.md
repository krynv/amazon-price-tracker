# amazon-price-tracker
 A basic example of a web scraper using Nightmare.js

WIP.

Provide a link into the parser function.

Run by:

    npm start

Head to http://localhost:1337/details/?url=https://www.amazon.co.uk/Samsung-MZ-V7E1T0BW-V-NAND-Express-Solid/dp/B07CGJNLBB

Expect to see the following JSON response:

```javascript
{
    "currency": "£",
    "price": 164.98,
    "title": "Samsung MZ-V7E1T0BW 970 EVO 1 TB V-NAND M.2 PCI Express Solid State Drive, Black"
}
```