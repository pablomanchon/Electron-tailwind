import { AppDataSource } from "../database/data-source";
import { Producto } from "../database/entities/Producto";
import { ProductoDTO } from "../dtos/ProductoDTO";

export class ProductoService {
  static async obtenerTodos(): Promise<Producto[]> {
    const productoRepo = AppDataSource.getRepository(Producto);
    return await productoRepo.find();
  }

  static async obtenerPorId(id:number) {
    const productoRepo = AppDataSource.getRepository(Producto);
    return await productoRepo.findOneByOrFail({id});
  }

  static async crearProducto(data: ProductoDTO): Promise<Producto> {
    const productoRepo = AppDataSource.getRepository(Producto);
    const producto = productoRepo.create({ ...data, isDeleted: false });
    return await productoRepo.save(producto);
  }

  static async actualizarProducto(id: number, data: any): Promise<Producto | null> {
    const productoRepo = AppDataSource.getRepository(Producto);
    const producto = await productoRepo.findOneBy({ id });
    if (!producto) throw Error;

    productoRepo.merge(producto, data);
    return await productoRepo.save(producto);
  }

  static async eliminarProducto(id: number): Promise<Producto | null> {
    const productoRepo = AppDataSource.getRepository(Producto);
    const producto = await productoRepo.findOneBy({ id });
    if (!producto) throw Error;

    producto.isDeleted = true;
    return await productoRepo.save(producto);
  }
}
