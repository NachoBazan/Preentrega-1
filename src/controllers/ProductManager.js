import { promises as fs } from "fs"
import  {nanoid } from "nanoid"


class ProductManager{
    constructor() {
        this.path = "./src/models/productos.json"
    }

    readProducts = async () => {
        let products = await fs.readFile(this.path, "utf-8")
        return JSON.parse(products)
    }

    writeProducts = async (product) => {
        fs.writeFile(this.path, JSON.stringify(product))
    }

    existe = async (id) => {
        let products = await this.readProducts()
        return products.find(prod => prod.id === id)
        }



    addProducts = async (product) => {
        let productOld = await this.readProducts()
        product.id = nanoid(2)
        let todosproductos = [...productOld, product]
        await this.writeProducts(todosproductos)
        return "Producto agregado."
    }

    getProducts = async() => {
        return await this.readProducts()
    }

    getProductsById = async(id) => {
        let productID = await this.existe(id)
        if (!productID) return "Producto no encontrado."
        return productID
    }

    updateProducts = async (id, product) => {
        let productID = await this.existe(id)
        if (!productID) return "Producto no encontrado."
        await this.deleteProducts(id)
        let productOld = await this.readProducts()
        let products = [{...product, id : id}, ...productOld]
        await this.writeProducts(products)
        return "Producto actualizado."
    }


    deleteProducts = async (id) => {
        let products = await this.readProducts()
        let existeProducto = products.some(prod => prod.id === id)
        if (existeProducto){
        let filterProducts = products.filter(prod => prod.id != id)
        await this.writeProducts(filterProducts)
        return "Producto eliminado."
    } 
    return "El producto a eliminar no existe!"
    }

}

export default ProductManager


