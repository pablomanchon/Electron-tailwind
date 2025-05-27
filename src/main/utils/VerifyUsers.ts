import { UsuarioDto } from "../dtos/usuario.dto";

export const verifyUser = (user: UsuarioDto) => {
    if (user.email === '' || !user.email)
        throw Error("Debe ingresar el email")
    if (user.nombre === '' || !user.nombre)
        throw Error("Debe ingresar el nombre")
    if (user.tipo === '' || !user.tipo)
        throw Error("Debe ingresar el rol")
}