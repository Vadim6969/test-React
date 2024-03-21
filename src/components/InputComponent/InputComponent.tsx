import React from "react";
import styles from './InputComponent.module.scss';




interface IProps {
    className?: string
    disabled?: boolean
    error?: string
    name: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    required?: boolean
    type: string
    value: string
    placeholder?: string
    readOnly?: boolean
    tabIndex?: number
    label?: string

}

export const InputComponent = ({
                                   className,
                                   disabled,
                                   name,
                                   label,
                                   onChange,
                                   placeholder,
                                   readOnly,
                                   type,
                                   error,
                                   value }: IProps) => {


    return (
        <div className={className}>
            <label className={styles.label} htmlFor={name}>{label}</label>
            <input
                className={styles.input}
                id={name}
                type={type}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                readOnly={readOnly}
            />
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
};
