import { useModal } from '../../../providers/ModalProvider'
import PrimaryButton from '../../PrimaryButton';
import FormUser from '../FormUser';

export default function BtnOpenFormNewUser() {
  const { openModal } = useModal();
  return (
    <PrimaryButton functionClick={
      () => {
        openModal(<FormUser />)
      }
    }
      title={"Crear Usuario"} />
  )
}
