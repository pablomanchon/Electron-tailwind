import { useCuentasCorrientes } from '../../hooks/useCc'
import CardCc from './CardCc';

export default function CardsCc() {
    const { cuentas, loading, error } = useCuentasCorrientes();

    if (loading) return <div>loading</div>

    if (error) return <div>error</div>

    return (
        <div className='flex flex-wrap justify-center gap-2 shadow-black shadow-inner p-2'>{cuentas.map(c => <CardCc key={c.id} cuenta={c} />)}</div>
    )
}
