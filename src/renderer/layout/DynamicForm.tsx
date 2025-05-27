import { useState, type ReactNode } from 'react'
import PrimaryButton from '../components/PrimaryButton'

interface InputDef {
    name: string
    label?: string
    type: 'text' | 'number' | 'email' | 'date' | 'password' | 'checkbox' | 'select'
    value?: any
    options?: { label: string; value: string }[]
    required?: boolean
}


interface DynamicFormProps {
    inputs: InputDef[]
    onSubmit: (formValues: Record<string, any>) => void
    typeBtn?: 'primary' | 'secondary' | 'danger'
    customButton?: ReactNode
}

export default function DynamicForm({ inputs, onSubmit, typeBtn = 'primary', customButton }: DynamicFormProps) {
    const [formValues, setFormValues] = useState(() =>
        inputs.reduce((acc, input) => {
            acc[input.name] = input.value ?? (input.type === 'checkbox' ? false : null)
            return acc
        }, {} as Record<string, any>)
    )

    const handleChange = (name: string, value: any) => {
        setFormValues(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formValues)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
            {inputs.map(input => (
                <div key={input.name} className="flex flex-col text-black">
                    {input.label && <label className="text-sm font-semibold mb-1 text-white">{input.label}</label>}
                    {input.type === 'select' ? (
                        <select
                            required={input.required}
                            value={formValues[input.name]}
                            onChange={e => handleChange(input.name, e.target.value)}
                            className="border rounded px-2 py-1 outline-none shadow-inner shadow-black border-black"
                        >
                            {input.options?.map(opt => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    ) : input.type === 'checkbox' ? (
                        <input
                            required={input.required}
                            type="checkbox"
                            checked={formValues[input.name]}
                            onChange={e => handleChange(input.name, e.target.checked)}
                            className="h-5 w-5 outline-none shadow-inner shadow-black border-black"
                        />
                    ) : (
                        <input
                            required={input.required}
                            type={input.type}
                            value={formValues[input.name]}
                            onChange={e => handleChange(input.name, e.target.value)}
                            className="border rounded px-2 py-1 outline-none shadow-inner shadow-black border-black"
                        />
                    )}
                </div>
            ))}

            {typeBtn === 'primary' && <PrimaryButton functionClick={null} title={'Crear Usuario'} />
            }
        </form>
    )
}
