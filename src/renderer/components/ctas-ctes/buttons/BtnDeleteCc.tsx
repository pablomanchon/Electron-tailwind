import { toast } from "react-toastify";
import DangerBtn from "../../DangerButton";
import { useModal } from "../../../providers/ModalProvider";
import Confirmation from "../../../layout/Confirmation";

export default function BtnDeleteCc({ id }: { id: number | undefined }) {
 /*  const { deleteMovimiento } = useCc();
  const { openModal } = useModal();

  const handleDeleteUser = () => {
    if (!id) {
      toast.error("Selecciona un usuario");
      return;
    }
    openModal(<Confirmation mensaje={`Seguro que desea eliminar al usuario con id ${id}?`} onConfirm={() => deleteMovimiento(id)} />)
  }

  return (
    <DangerBtn functionClick={handleDeleteUser} title={"Eliminar Usuario"} />
  ) */
}
