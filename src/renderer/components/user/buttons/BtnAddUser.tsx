import { useModal } from '../../../providers/ModalProvider';
import SecondaryBtn from '../../SecondaryButton';
import FormUser from '../FormUser';

export default function BtnAddUser() {
  const {openModal} = useModal();
return (
    <SecondaryBtn functionClick={
      () => {
        openModal(<FormUser />)
      }
    }
      title={"Crear Usuario"} />
  )
}
