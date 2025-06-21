import { CuentaCorriente } from "../database/entities/CuentaCorriente";
import { Usuario } from "../database/entities/Usuario";
import { CreateUsuarioDto, UpdateUsuarioDto, UsuarioDto } from "../dtos/usuario.dto";
import { CuentaCorrienteRepository } from "../repositories/cuentaCorriente.repository";
import { UsuarioRepository } from "../repositories/usuario.repository";
import { verifyUser } from "../utils/VerifyUsers";
import { CuentaCorrienteService } from "./cuentaCorriente.service";

export class UsuarioService {
    private usuarioRepo = new UsuarioRepository();

    private ccService = new CuentaCorrienteService(new CuentaCorrienteRepository());

    async crearUsuario(data: CreateUsuarioDto): Promise<Usuario> {
        const usuario = new Usuario();

        Object.assign(usuario, data);

        verifyUser(data as UsuarioDto);

        // Verificás si ya existe un usuario con ese email
        const existingUser = await this.usuarioRepo.findByEmail(usuario.email);
        if (existingUser) {
            throw new Error("Ya existe un usuario con ese email");
        }

        const ccDto = await this.ccService.crearCuenta(new CuentaCorriente());


        // Relación bidireccional
        usuario.cuentaCorriente = await this.ccService.obtenerEntidadPorId(ccDto.id);

        // Guardar usuario con su cuenta corriente
        return this.usuarioRepo.save(usuario);
    }

    async actualizarUsuario(id: number, data: UpdateUsuarioDto): Promise<Usuario> {
        const usuario = await this.usuarioRepo.findById(id);
        if (!usuario) throw new Error("Usuario no encontrado");

        Object.assign(usuario, data);
        return this.usuarioRepo.save(usuario);
    }

    async obtenerUsuarios(): Promise<Usuario[]> {
        return this.usuarioRepo.findAll();
    }

    async obtenerUsuarioPorId(id: number): Promise<Usuario | null> {
        return this.usuarioRepo.findById(id);
    }

    async eliminarUsuario(id: number): Promise<boolean> {
        const user = await this.obtenerUsuarioPorId(id);

        const resultado = await this.usuarioRepo.delete(id);
        console.log(user)
        if (resultado.affected !== 0)
            this.ccService.eliminar(user.cuentaCorriente.id);

        return true;
    }

}
