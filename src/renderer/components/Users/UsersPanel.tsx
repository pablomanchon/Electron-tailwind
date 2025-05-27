import { useState } from 'react'
import Steel from '../../layout/Steel'
import UsersButtons from './buttons/UsersButtons'
import UsersTable from './UsersTable'
import Title from '../../layout/Title';
import Glass from '../../layout/Glass';

export default function UsersPanel() {
    const [id, setId] = useState<number>();
    return (
        <>
            <Glass styles='w-full sticky top-0'>
                <Title>Usuarios</Title>
            </Glass>
            <div className='block w-full p-2'>
                <UsersTable onSelectFile={(id) => setId(id)} />
            </div>
            <Steel styles={'flex gap-2 w-full shadow-inner shadow-black border-black border-2 rounded sticky bottom-0 mt-2'}>
                <UsersButtons id={id} />
            </Steel>
        </>
    )
}
