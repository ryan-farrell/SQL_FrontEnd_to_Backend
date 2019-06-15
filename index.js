const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const express = require('express');
/* All the above are module dependecies from NPM we will need for this project and have 
now been required for use.*/


const app = express();
/* Express method has been asigned to the app variable. This is a standardised process used after requiring express so we can 
 can call in further methods from the express() library/module below with 'app.' */

const SQL = require('./libs/sql')

/* The above SQL varilable is assigned to our local module with our SQL class as there is only one thing to require from our sql.js in our libs folder. 
IF I STORED MORE THAN ONE METHOD IN MY OBJECT {} I would have to call my SQL class from the local module 'SQL.SQL'. */


app.engine('.hbs', exphbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));

/* The above needs more explaining, but for now its letting express know that our 'engine' will be using handlebars (hbs)
templating and we are stating what the template/layout will be by referring to our layout.hbs file in our layout folder. */

app.set('view engine', '.hbs');

/* The above needs more explaining. */

app.use(express.static(__dirname + '/views'));

/* Sets the absolute path. In this case its 'C:\Users\ryanf\Documents\Challenges\SQLFrontEnd' + \views'.
This defines the folder to find our static file in and use which in our case is index.hbs */


/*******************************************************************************************/

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
/*  We use the two above methods for taking the details entered into our form from the index page and returning us the details 
in a JSON object so we can use pull values from keys using dot or bracket notation below in our post method */

/*******************************************************************************************/


app.get('/', (req, res) => {
    res.render('index');
});

/*  When browser sends a get request we render the index page wwe setup in the root folder. index.html or index.hbs dependent 
on use this time it was a .hbs */



let connectOptions = [
    'localhost',
    'root',
    'password',
    'test_schema'
    
]
/* We are creating an array called 'connectOptions' which we will now use in all our new class instances below when a post 
is submitted in our form on our main index page. */

let sql = new SQL (...connectOptions);

/* Using the 'connectOptions' array above we have now saved all the SQL database connection requirements in a variable called 'sql'. 
We will later call the 'insert' method from the sql library required at the top to save the data into the our SQL database. */




/*******************************************APP.POST****************************************/
/*******************************************************************************************/

app.post('/insert',(req,res) => {
    
    let name = req.body.name
    let email = req.body.email
    let telephone = req.body.phoneNo
    let password = req.body.password
    
    /* We are assigning the above variables from our JSON object created from our submitted form to 4 variables ready 
    to be 'sent'to our SQL database */
    
    sql.insert(name,email,telephone,password)
    
    /* The above 'sql.insert' is now sending the data to our database using the 'insert' method within our sql class 
    with the correct connect options 'sql' with our form input saved in our latest four variables as in the code line above. */
    
    res.render('index')
    
    /* After the request the response is to render the intial index page, essentially refreshing for the next form 
    input should it be required.  */
    
    
})

/*******************************************************************************************/
/*******************************************************************************************/



/*******************************************APP.POST//Challenge \Order/*********************/
/*******************************************************************************************/

app.post('/order',(req,res) => {
    
    let name = req.body.nameUser
    let orderNo = req.body.orderNo
    let itemDesc = req.body.itemDesc
    
    /* We are assigning the above variables from our JSON object created from our submitted form to 3 variables ready 
    to be 'sent'to our SQL database */
    
    sql.insertOrder(name,orderNo,itemDesc)
    
    /* The above 'sql.insertOrder' is now sending the data to our database using the 'insertOrder' method within our sql class 
    with the correct connect options 'sql' with our form input saved in our latest four variables as in the code line above. */
    
    res.render('index')
    
    /* After the request the response is to render the intial index page, essentially refreshing for the next form 
    input should it be required.  */
    
    
})

/*******************************************************************************************/
/*******************************************************************************************/


app.listen(1337, () => {
    console.log("listening on port 1337")

})

/* The listen method called from the express library allows us to setup a local host in this project/case,
so we can view in our browser through 'localhost:1337' */