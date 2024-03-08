import { Router } from "express";

import CartManager from "../controllers/CartManager.js"

const CartRouter = Router()
const cart = new CartManager


CartRouter.post("/", async (req, res) => {
    res.send(await cart.addCarts())
})

CartRouter.get("/", async (req, res) => {
    res.send(await cart.readCarts())
})

CartRouter.get("/:cid", async (req, res) => {
    res.send(await cart.getCartsById(req.params.cid))
})

CartRouter.post("/:cid/products/:pid", async (req, res) => {
    let cartId = req.params.cid
    let productId = req.params.pid
    res.send(await cart.addProductInCart(cartId, productId))
})



export default CartRouter