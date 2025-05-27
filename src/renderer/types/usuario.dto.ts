// create-usuario.dto.ts
export class CreateUsuarioDto {
  nombre!: string;
  tipo?: string;
  telefono?: string;
  email?: string;
}

// update-usuario.dto.ts
export class UpdateUsuarioDto {
  nombre?: string;
  tipo?: string;
  telefono?: string;
  email?: string;
}

export class UsuarioDto {
  id!: number;
  nombre!: string;
  tipo?: string;
  telefono?: string;
  email?: string;
}
