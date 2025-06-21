import type { MovimientoDto } from '../../../types/movimiento.dto'

export default function TableMoves({ moves }: { moves: MovimientoDto[] }) {
    console.log(moves)
    return (
        <div>TableMoves</div>
    )
}
