import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import { eliminarUsuario } from "../../../store/usuariosThunks";
import { toast } from "react-toastify";
import DangerBtn from "../../DangerButton";

export default function BtnDeleteUser({ id }: { id: number | undefined }) {
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
    <DangerBtn functionClick={handleDeleteUser} title={"Eliminar Usuario"} />
  )
}
