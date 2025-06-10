import PrimaryButton from '../../PrimaryButton';
import { useModal } from '../../../providers/ModalProvider';
import { toast } from 'react-toastify';
import FormMovimientoEdit from '../forms/FormMovimientoEdit';

export default function BtnUpdateCc({ id }: { id: number | undefined }) {
    const { openModal } = useModal();

    const handleClick = () => {
        if (!id) {
            toast.info("Selecciona un usuario");
            return
        }
        openModal(<FormMovimientoEdit id={id} />)
    }

    return (
        <PrimaryButton functionClick={handleClick} title={"Editar usuario"} />
    )
}
