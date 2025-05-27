import BtnDeleteUser from './BtnDeleteUser'
import BtnOpenFormNewUser from './BtnOpenFormNewUser'
import BtnUpdateUser from './BtnUpdateUser'

export default function UsersButtons({ id }: { id: number | undefined }) {
    return (
        <>
            <BtnOpenFormNewUser/>
            <BtnUpdateUser id={id} />
            <BtnDeleteUser id={id} />
        </>
    )
}
