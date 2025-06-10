import React from 'react'
import PrimaryButton from './PrimaryButton'
import SecondaryBtn from './SecondaryButton'
import DangerBtn from './DangerButton'

export default function Buttons({ addFnc, updateFnc, deleteFnc, extraButtons }) {
    return (
        <>
            <PrimaryButton functionClick={addFnc} title={"Crear"} />
            <SecondaryBtn functionClick={updateFnc} title={"Modificar"} />
            <DangerBtn functionClick={deleteFnc} title={"Eliminar"} />
            {extraButtons?.map(button => button)}
        </>
    )
}
