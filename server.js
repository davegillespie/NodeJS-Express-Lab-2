const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const pg = require("pg");
const pool = new pg.Pool({
    user: "postgres",
    password: "Yeti2019",
    host: "localhost",
    port: 5432,
    database: "ExpressShopDB",
    ssl: false
});


// const addRoom = (newRoom) => {
//     return $http({
//         url: "/api/items",
//         method: "POST",
//         name: "Room Name",
//         capacity: 14,
//         availability: true
//     }).then((response) => {
//         return response.data;
//     }

app.post("/cart-items", (req, res) => {
    let data = req.body[0];
    let id = data.id;
    console.log(data);

    pool.query(
        "INSERT INTO shoppingcart (id, product, price, quantity) values($1::int, $2::text, $3::int, $4::int)", 
        [data.id, data.product, data.price, data.quantity]
    )
    .then( () => {
        res.status(201); // Created
        res.send('Successfully added item!');
    })
  });



app.put("/cart-items/:id", (req, res) => {
    let id = req.params.id;

    // req.params, req.body, req.query
   // let name = data.name;

    let data = req.body;
        pool.query(
            "UPDATE shoppingcart SET quantity=$2::int WHERE id=$1::int", 
            [req.params.id, data.quantity]
        )
        .then( () => {
            res.status(201); // Created
            res.send('Successfully updated an item!');
        })
        .catch( (err) => {
            console.log('error');
        })

});



app.get("/cart-items", (req, res) => {
    pool.query("SELECT * FROM shoppingcart;")
    .then( (result) => {
        res.send(result.rows);
    })
  });


 // accept DELETE request at URI: /cartItems
 app.delete('/cart-items/:id', (req, res) => {
    console.log(req.body); // <-- this is the data that has been extracted from the request
    res.send('Deleting cartItems..');

    pool.query(
        "DELETE FROM shoppingcart WHERE id = $1::int", [req.params.id])
    .then( () => {
        res.status(202); // Deleted
        res.send('Successfully deleted item!');
    })
});



app.listen(4000, () => {
    console.log("JSON Server is running on 4000"); // localhost:4000/shoppingcart
});