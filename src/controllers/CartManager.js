import { promises as fs } from "fs"
import  {nanoid } from "nanoid"
import ProductManager from "./ProductManager.js"


const productALL = new ProductManager


class CartManager {
    constructor() {
        this.path = "./src/models/carrito.json"
    }

    readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts)
    }

    writeCarts = async (carts) => {
        fs.writeFile(this.path, JSON.stringify(carts))
    }

    existe = async (id) => {
        let carts = await this.readCarts()
        return carts.find(cart => cart.id === id)
        }


    addCarts = async () => {
        let cartsOld = await this.readCarts()
        let id = nanoid(2)
        let cartsConcat = [{id : id, products : []}, ...cartsOld]
        await this.writeCarts(cartsConcat)
        return "Carrito agregado."
    }

    getCartsById = async(id) => {
        let cartID = await this.existe(id)
        if (!cartID) return "Carrito no encontrado."
        return cartID
    }

    addProductInCart = async (cartId, productId) => {
        let cartID = await this.existe(cartId)
        if (!cartID) return "Carrito no encontrado."
        let productById = await productALL.existe(productId)
        if (!productById) return "Producto no encontrado."

        let cartAll = await this.readCarts()
        let cartFilter = cartAll.filter(cart => cart.id != cartId)

        if (cartID.products.some(prod => prod.id === productId)){
            let productInCart = cartID.products.find(prod => prod.id === productId)
            productInCart.quantity++
            let cartsConcat = [cartID, ...cartFilter]
            await this.writeCarts(cartsConcat)
            return "Producto sumado al carrito"
        }else{
        cartID.products.push({id : productById.id, quantity: 1})

        let cartConcat = [cartID, ...cartFilter]
        await this.writeCarts(cartConcat)
        return "Producto agregado al carrito"}}
    

}



export default CartManager