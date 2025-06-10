import { UsuarioDto } from "./usuario.dto";

export interface CuentaCorrienteDto {
    id: number;
    saldo: number;
    usuario: UsuarioDto;
}