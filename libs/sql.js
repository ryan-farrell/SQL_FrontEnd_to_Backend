const mysql = require ('mysql')

/* The above module from NPM has been required so we can call the createConnection method below.*/

class SQL {
    constructor (host,user,password,database) {
        this.connection = mysql.createConnection({
            host:host,
            user: user,
            password: password,
            database: database,
        })

    }
    
    insert (name,email,telephone,password) {
        this.connection.query(`INSERT INTO user SELECT '${name}', '${email}', '${telephone}', '${password}';`, (error, results) => {
            if (error) throw error;
            });
        }

        /**********************Challenge**********************/

        insertOrder (name,orderNo,itemDesc) {
            this.connection.query(`INSERT INTO orders SELECT '${name}', '${orderNo}', '${itemDesc}';`, (error, results) => {
                if (error) throw error;
            });
        }
        /**********************Challenge**********************/
        
}

/* We have created a Class above 'SQL' so we can can more instances of this on each 'app.get' function in our main index.js which is 
invoked when a form is submitted. Using the constructor function we can blue print our connection details that SQL will need to connect to 
our database. 

We have also created a function in our class we can invoke called 'insert' which will template out the individual information inputted on the form each time
in a syntax that SQL undersatnds and will add to our database*/



module.exports = SQL

/* The above SQL is calling our local module which is our libs folder in our sql. IF I STORE THIS AS AN OBJECT
I would have to call my SQL class from the local module 'SQL.SQL'. */