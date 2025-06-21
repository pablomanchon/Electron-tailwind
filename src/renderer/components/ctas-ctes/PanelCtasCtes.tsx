import Glass from '../../layout/Glass'
import Title from '../../layout/Title'
import CardsCc from './CardsCc'

export default function PanelCtasCtes() {
    return (
        <div className='w-full flex flex-col justify-between h-full overflow-y-auto'>
            <Glass styles='sticky top-0'>
                <Title>Cuentas Corrientes</Title>
            </Glass>
            <CardsCc/>
        </div>
    )
}
