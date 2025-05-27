import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import type { AppDispatch } from '../../../store/store';
import { eliminarUsuario } from '../../../store/usuariosThunks';
import PrimaryButton from '../../PrimaryButton';

export default function BtnUpdateUser({ id }: { id: number | undefined}) {
    const dispatch = useDispatch<AppDispatch>();

    const handleDeleteUser = () => {
        if (!id) {
            toast.error("Por favor, elija un usuario");
            return;
        }
        dispatch(eliminarUsuario(id))
            .then(() => {
                toast.success('Usuario eliminado correctamente')
            })
            .catch((e) => {
                toast.error(e.response.data.message)
            })
    }
    return (
        <PrimaryButton functionClick={handleDeleteUser} title={"Modificar Usuario"} />
    )
}
