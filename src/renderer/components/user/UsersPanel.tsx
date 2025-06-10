import { useState } from 'react'
import Steel from '../../layout/Steel'
import Title from '../../layout/Title';
import Glass from '../../layout/Glass';
import UsersTable from './UsersTable';
import UsersButtons from './buttons/UsersButtons';

export default function UsersPanel() {
    const [id, setId] = useState<number>();
    return (
        <div className='w-full flex flex-col justify-between h-full overflow-y-auto'>
            <Glass styles='sticky top-0'>
                <Title>Usuarios</Title>
            </Glass>

            <UsersTable onSelectFile={(id) => setId(id)} search={true} />

            <Steel styles={'flex gap-2 shadow-inner shadow-black border-black border-2 rounded  mt-2 bg-gradient-to-r sticky bottom-0'}>
                <UsersButtons id={id} />
            </Steel>
        </div>
    )
}
