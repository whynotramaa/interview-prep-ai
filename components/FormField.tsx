import React from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>
    name: Path<T>
    label: string
    placeholder: string
    type?: 'text' | 'email' | 'password' | 'file'
}

const CustomFormField = <T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    type = "text"
}: FormFieldProps<T>) => (
    <Controller name={name} control={control} render={({ field }) => (
        <FormItem>
            <FormLabel className='label'>{label}</FormLabel>
            <FormControl>
                <Input className='input' placeholder={placeholder} type={type} {...field} />
            </FormControl>

            <FormMessage />
        </FormItem>
    )}

    />

)

export default CustomFormField