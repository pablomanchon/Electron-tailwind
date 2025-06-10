import { useModal } from '../../../providers/ModalProvider';
import SecondaryBtn from '../../SecondaryButton';
import FormMovimiento from '../forms/FormMovimiento';

export default function BtnAddCc() {
  const { openModal } = useModal();
  return (
    <SecondaryBtn functionClick={
      () => {
        openModal(<FormMovimiento />)
      }
    }
      title={"Crear Movimiento"} />
  )
}
