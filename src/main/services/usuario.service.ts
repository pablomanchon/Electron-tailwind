import { Usuario } from "../database/entities/Usuario";
import { CreateUsuarioDto, UpdateUsuarioDto, UsuarioDto } from "../dtos/usuario.dto";
import { UsuarioRepository } from "../repositories/usuario.repository";
import { verifyUser } from "../utils/VerifyUsers";

export class UsuarioService {
    private usuarioRepo = new UsuarioRepository();

    async crearUsuario(data: CreateUsuarioDto): Promise<Usuario> {
        const usuario = new Usuario();
        verifyUser(data as UsuarioDto)
        const user = await this.usuarioRepo.findByEmail(usuario.email);

        Object.assign(usuario, data);
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
        const resultado = await this.usuarioRepo.delete(id);
        return resultado.affected !== 0;
    }

}
