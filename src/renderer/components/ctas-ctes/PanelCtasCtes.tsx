import { useState } from 'react'
import Glass from '../../layout/Glass'
import Steel from '../../layout/Steel'
import Title from '../../layout/Title'
import BtnAddCc from './buttons/BtnAddCc'
import BtnUpdateCc from './buttons/BtnUpdateCc'
import BtnDeleteCc from './buttons/BtnDeleteCc'
import CardsCc from './CardsCc'

export default function PanelCtasCtes() {
    const [id, setId] = useState<number>()
    return (
        <div className='w-full flex flex-col justify-between h-full overflow-y-auto'>
            <Glass styles='sticky top-0'>
                <Title>Cuentas Corrientes</Title>
            </Glass>
            <CardsCc/>
            <Steel styles='flex gap-2 shadow-inner shadow-black border-black border-2 rounded  mt-2 bg-gradient-to-r sticky bottom-0'>
                <BtnAddCc />
                <BtnUpdateCc id={id} />
                <BtnDeleteCc id={id} />
            </Steel>
        </div>
    )
}
