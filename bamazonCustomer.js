// Bamazon.com
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_DB"
});
// Validation functions
function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole number.';
	}
}

function promptPurchase(){
inquirer
.prompt([
    {
        type: "input",
        name: "item_id",
        message: 'Please enter the Item ID which you would like to purchase.',
        validate: validateInput,
        filter: Number
    },
    {
        type:"input",
        name:"quantity",
        message:"How many do you need?",
        validate: validateInput,
        filter: Number
    }
]).then(function(input){
    var item = input.item_id;
    var quantity = input.quantity;

//Query to access DB
    var queryStr = 'SELECT * FROM products WHERE ?';
    connection.query(queryStr, {item_id: item}, function(err, data) {
        if (err) throw err;

        if (data.length === 0) {
            console.log('ERROR : Please enter a valid Item ID.');
            displayInventory();

        } else {
            var productData = data[0];
        if (quantity <= productData.stock_quantity) {
            console.log('Placing order...');

            // Update inventory query 
            var updateQuery = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;


            connection.query(updateQuery, function(err, data) {
                if (err) throw err;

                console.log('Your order has been placed! Your total is $' + productData.price * quantity);
                console.log("\n---------------------------------------------------------------------\n");


                connection.end();
            })
        } else {
            console.log('Insufficient quantity!');
            console.log("\n---------------------------------------------------------------------\n");

            displayInventory();
        }
    }
});
});
}
//Function to display to current inventory from the database 

function displayInventory() {

// Construct the db query string
queryStr = 'SELECT * FROM products';


connection.query(queryStr, function(err, data) {
if (err) throw err;

console.log('Current Inventory: ');
console.log('-----------------\n');

var newInventory = '';

for (var i = 0; i < data.length; i++) {
    newInventory = '';
    newInventory += 'Item ID: ' + data[i].item_id + '  ||  ';
    newInventory += 'Product Name: ' + data[i].product_name + '  ||  ';
    newInventory += 'Department: ' + data[i].department_name + '  ||  ';
    newInventory += 'Price: $' + data[i].price + ' || ';
    newInventory += 'Quantity in stock :' + data[i].stock_quantity +'\n';

    console.log(newInventory);
}

console.log("---------------------------------------------------------------------\n");


promptPurchase();
})
}
function bamazonStart() {
    console.log("Welcome to Bamazon!")
    // show user the table data of current inventory.
    displayInventory();
}
bamazonStart();
