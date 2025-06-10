import PrimaryButton from '../../PrimaryButton';
import { useModal } from '../../../providers/ModalProvider';
import FormUserEdit from '../FormUpdateUser';
import { toast } from 'react-toastify';

export default function BtnUpdateUser({ id }: { id: number | undefined }) {
    const { openModal } = useModal();

    const handleClick = () => {
        if (!id) {
            toast.info("Selecciona un usuario");
            return
        }
        openModal(<FormUserEdit id={id} />)
    }

    return (
        <PrimaryButton functionClick={handleClick} title={"Editar usuario"} />
    )
}
