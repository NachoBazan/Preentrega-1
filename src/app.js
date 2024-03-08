import express from "express"

import ProductRouter from "./router/product.js"
import CartRouter from "./router/carts.js"

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded ({extended : true}))

app.use("/api/products", ProductRouter)
app.use("/api/carts", CartRouter)

app.listen(port, () => {
    console.log(`Servidor Express Puerto ${port}`)
}) 