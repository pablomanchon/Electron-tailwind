import { AppDataSource } from "../database/data-source";
import { Producto } from "../database/entities/Producto";

export class ProductoService {
  static async obtenerTodos(): Promise<Producto[]> {
    const productoRepo = AppDataSource.getRepository(Producto);
    return await productoRepo.find();
  }

  static async crearProducto(data: any): Promise<Producto> {
    const productoRepo = AppDataSource.getRepository(Producto);
    const producto = productoRepo.create(data);
    return await productoRepo.save(producto);
  }

  static async actualizarProducto(id: number, data: any): Promise<Producto | null> {
    const productoRepo = AppDataSource.getRepository(Producto);
    const producto = await productoRepo.findOneBy({ id });
    if (!producto) return null;

    productoRepo.merge(producto, data);
    return await productoRepo.save(producto);
  }

  static async eliminarProducto(id: number): Promise<Producto | null> {
    const productoRepo = AppDataSource.getRepository(Producto);
    const producto = await productoRepo.findOneBy({ id });
    if (!producto) return null;

    producto.isDeleted = true;
    return await productoRepo.save(producto);
  }
}
