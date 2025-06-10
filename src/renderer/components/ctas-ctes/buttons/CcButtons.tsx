import BtnAddUser from "./BtnAddUser";
import BtnDeleteUser from "./BtnDeleteUser";
import BtnUpdateUser from "./BtnUpdateUser";

export default function UsersButtons({ id }: { id: number | undefined }) {
    return (
        <>
            <BtnAddUser />
            <BtnUpdateUser id={id} />
            <BtnDeleteUser id={id} />
        </>
    )
}
