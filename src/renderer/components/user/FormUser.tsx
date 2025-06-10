import { useUsers } from '../../hooks/useUsers'
import DynamicForm from '../../layout/DynamicForm'
import Title from '../../layout/Title'

export default function FormUser() {
    const { addUser } = useUsers()
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
                onSubmit={(values: any) => addUser(values)} titleBtn={'Agregar Usuario'} />
        </div>
    )
}
