
var faker = require("faker");

for (i=0; i<10; i++){
    console.log(faker.commerce.productName() + 
                ":  " + faker.finance.currencySymbol() + 
                faker.commerce.price());
};
