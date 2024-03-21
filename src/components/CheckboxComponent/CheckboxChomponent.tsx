import React from "react";
import style from './CheckboxComponent.module.scss';


interface IProps {
    label: string | JSX.Element,
    checked: boolean,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    name: string,
    className?: string,
    error?: string
}
const CheckboxComponent = ({ label, checked, onChange, name, className, error, ...props }: IProps) => {

    return (
        <div className={className}>
            <label className={style.label}>
                <input
                    name={name}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className={checked ? style.checked : ''}
                    {...props}
                />
                <span className={style.label + " " + error ? style.error : ''}>{label}</span>
            </label>
        </div>
    );
};
export default CheckboxComponent;
