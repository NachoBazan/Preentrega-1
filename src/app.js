import express from "express"

import ProductRouter from "./router/product.js"
import CartRouter from "./router/carts.js"

import {engine} from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js"
import ProductManager from "./controllers/ProductManager.js"


const product = new ProductManager

const app = express()
const port = 8080


app.use(express.json())
app.use(express.urlencoded ({extended : true}))


//Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))


//Archivos estatic
app.use("/", express.static(__dirname + "/public"))

app.get("/", async (req, res) => {
    let allProducts = await product.getProducts()
    res.render("home", {
        title: "Express Avanzado | Handlebars",
        products: allProducts
    })
})

app.get("/:id", async (req, res) => {
    let prod = await product.getProductsById(req.params.id)
    res.render("prod", {
        title: "Express Avanzado | Handlebars",
        products: prod
    })
})


app.use("/api/products", ProductRouter)
app.use("/api/carts", CartRouter)



app.listen(port, () => {
    console.log(`Servidor Express Puerto ${port}`)
}) 