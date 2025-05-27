import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import type { AppDispatch } from '../../../store/store';
import type { CreateUsuarioDto } from '../../../types/usuario.dto';
import { crearUsuario } from '../../../store/usuariosThunks';
import SecondaryBtn from '../../SecondaryButton';

export default function BtnAddUser({ nuevoUsuario }: { nuevoUsuario: CreateUsuarioDto }) {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddUser = async () => {
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
    <SecondaryBtn functionClick={handleAddUser} title={"Crear Usuario"} />
  )
}
