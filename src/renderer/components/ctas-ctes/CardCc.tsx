import Title from '../../layout/Title'
import { useModal } from '../../providers/ModalProvider'
import type { CuentaCorrienteDto } from '../../types/cta.cte.dto'
import DangerBtn from '../DangerButton'
import PrimaryButton from '../PrimaryButton'
import SecondaryBtn from '../SecondaryButton'
import FormMovimiento from './forms/FormMovimiento'

export default function CardCc({ cuenta }: { cuenta: CuentaCorrienteDto }) {
  const {openModal} = useModal();
  return (
    <div className=' p-2 rounded min-w-72 flex flex-col items-center gap-2 bg-gradient-to-t to-emerald-800 from-emerald-950 shadow-inner shadow-black border-black border-2'>
      <Title>{cuenta.usuario.nombre}</Title>
      <ul className='flex flex-col'>
        <li className='font-bold'>Saldo: {cuenta.saldo}</li>
      </ul>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row gap-2'>
          <PrimaryButton functionClick={() =>openModal(<FormMovimiento cuentaId={cuenta.id} />)} title={"Pagar Deuda"} />
          <DangerBtn functionClick={() => console.log("asd")} title={"Ingresar deuda"} />
        </div>
        <SecondaryBtn functionClick={() => console.log("asd")} title={"Ver Movimientos"} />
      </div>
    </div>
  )
}
