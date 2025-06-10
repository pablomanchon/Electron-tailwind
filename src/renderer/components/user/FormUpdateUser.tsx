import { useEffect } from "react"
import DynamicForm from "../../layout/DynamicForm"
import Title from "../../layout/Title"
import { useUsers } from "../../hooks/useUsers"

interface Props {
    id: number
}

export default function FormUserEdit({ id }: Props) {
    const { getById, editUser, refresh } = useUsers()

    const user = getById(id)

    useEffect(() => {
        if (!user) refresh()
    }, [user])

    if (!user) {
        return <p className="text-center py-4">Cargando usuario...</p>
    }

    return (
        <div>
            <Title>Editar Usuario</Title>
            <DynamicForm
                inputs={[
                    { name: "nombre", label: "Nombre", type: "text", required: true, value: user.nombre },
                    { name: "email", label: "Email", type: "email", required: true, value: user.email },
                    {
                        name: "tipo", label: "Rol", type: "select", required: true, value: user.tipo, options: [
                            { label: "-", value: "" },
                            { label: "Admin", value: "admin" },
                            { label: "Usuario", value: "usuario" },
                        ],
                    }
                ]}
                onSubmit={(data: any) => editUser(id, data)}
                titleBtn="Guardar cambios"
            />
        </div>
    )
}
