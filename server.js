const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("/public"));

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


app.post("/shoppingcart", (req, res) => {
    let data = req.body;
    let id = data.id;

    pool.query(
        "INSERT INTO shoppingcart (id, product, price, quantity) values($1::int, $2::text, $3::int, $4::int)", 
        [data.id, data.product, data.price, data.quantity]
    )
    .then( () => {
        res.status(201); // Created
        res.send('Successfully added item!');
    })
  });

app.put("/shoppingcart/:id", (req, res) => {
    let id = req.params.id;
    let data = req.body;

    // req.params, req.body, req.query
    let name = data.name;
});

app.get("/shoppingcart", (req, res) => {
    pool.query("SELECT * FROM shoppingcart;")
    .then( (result) => {
        res.send(result.rows);
    })
  });

app.listen(4000, () => {
    console.log("JSON Server is running on 4000"); // localhost:4000/shoppingcart
});