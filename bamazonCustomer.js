var mysql = require("mysql");
var inquirer = require("inquirer");

var myItems;


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "dk112358",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

connection.query("select * from products", function (err, response) {
    myItems = response;
    for (var i = 0; i < response.length; i++) {
        console.log(response[i].item_id + " | " + response[i].product_name + " | " + response[i].department_name + " | " + response[i].price + " | " + response[i].stock_quantity)
    };
    console.log("--------------");
    // console.log(response);
    startFunction();
});


var startFunction = function () {
    // console.log(myItems);
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to buy?",
            choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            name: "choice"
        },
        {
            type: "input",
            message: "How Many units would you like to buy?",
            name: "howMany"
        }
    ]).then(function (user) {
        updateStock(user);
    });
};


var updateStock = function(user) {
    var userChoice;
    for (var i = 0; i < myItems.length; i++) {
        if (user.choice == myItems[i].item_id) {
            userChoice = myItems[i];
        }
    }
    if (user.howMany <= userChoice.stock_quantity) {
        var newQuantity = (userChoice.stock_quantity - user.howMany);
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: newQuantity
            }, {
                item_id: user.choice
            }], function (err, res) {
                console.log("Purchase successful! You bought " + user.howMany + " " + userChoice.product_name) 
                connection.end();
            });

        } else {
            console.log("NOT ENOUGH STOCK. sorry...");
            connection.end();
        }
};




