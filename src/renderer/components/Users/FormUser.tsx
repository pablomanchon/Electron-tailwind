import { useDispatch } from "react-redux";
import DynamicForm from "../../layout/DynamicForm";
import type { AppDispatch } from "../../store/store";
import { crearUsuario } from "../../store/usuariosThunks";
import { toast } from "react-toastify";
import type { CreateUsuarioDto } from "../../types/usuario.dto";
import Title from "../../layout/Title";

export default function FormUser() {
    const dispatch = useDispatch<AppDispatch>()
    const handleAddUser = async (nuevoUsuario: CreateUsuarioDto) => {
        try {
            dispatch(crearUsuario(nuevoUsuario))
                .then(() => {
                    toast.success('Usuario creado correctamente')
                })
                .catch((e) => {
                    console.log(e.response.data)
                    toast.error(e.response.data.message)
                })
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div>
            <Title>Nuevo Usuario</Title>
            <DynamicForm
                inputs={[
                    { name: 'nombre', label: 'Nombre', type: 'text', required: true },
                    { name: 'edad', label: 'Edad', type: 'number', required: true },
                    { name: 'email', label: 'Email', type: 'email', required: true },
                    {
                        name: 'tipo', label: 'Rol', type: 'select', required: true, options: [
                            { label: '-', value: '' },
                            { label: 'Admin', value: 'admin' },
                            { label: 'Usuario', value: 'usuario' }
                        ]
                    },
                    { name: 'activo', label: 'Activo', type: 'checkbox', value: true },
                ]}
                onSubmit={(values: any) => handleAddUser(values)}
            />

        </div>

    )
}
