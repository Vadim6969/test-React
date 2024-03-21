import { useState, useEffect, useRef } from "react";
import type { MouseEventHandler } from "react";
import styles from "./select.module.scss";

type Option = {
    title: string;
    value: string;
};
type OptionProps = {
    option: Option;
    onClick: (value: Option["value"]) => void;
};
const OptionEl = (props: OptionProps) => {
    const {
        option: { value, title },
        onClick
    } = props;
    const optionRef = useRef<HTMLLIElement>(null);

    const handleClick = (
        clickedValue: Option["value"]
    ): MouseEventHandler<HTMLLIElement> => () => {
        onClick(clickedValue);
    };

    useEffect(() => {
        const option = optionRef.current;
        if (!option) return;
        const handleEnterKeyDown = (event: KeyboardEvent) => {
            if (document.activeElement === option && event.key === "Enter") {
                onClick(value);
            }
        };

        option.addEventListener("keydown", handleEnterKeyDown);
        return () => {
            option.removeEventListener("keydown", handleEnterKeyDown);
        };
    }, [value, onClick]);

    return (
        <li
            className={styles.option}
            value={value}
            onClick={handleClick(value)}
            tabIndex={0}
            data-testid={`select-option-${value}`}
            ref={optionRef}
        >
            {title}
        </li>
    );
};

type SelectProps = {
    selected: Option | null;
    label?: string;
    options: Option[];
    placeholder?: string;
    status?: "default" | "invalid";
    onChange?: (selected: Option["value"]) => void;
    onClose?: () => void;
};

const Select = (props: SelectProps) => {
    const {
        options,
        placeholder,
        status = "default",
        selected,
        onChange,
        onClose,
        label
    } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const { target } = event;
            if (target instanceof Node && !rootRef.current?.contains(target)) {
                isOpen && onClose?.();
                setIsOpen(false);
            }
        };

        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, [onClose]);

    useEffect(() => {
        const placeholderEl = placeholderRef.current;
        if (!placeholderEl) return;

        const handleEnterKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                setIsOpen((prev) => !prev);
            }
        };
        placeholderEl.addEventListener("keydown", handleEnterKeyDown);

        return () => {
            placeholderEl.removeEventListener("keydown", handleEnterKeyDown);
        };
    }, []);

    const handleOptionClick = (value: Option["value"]) => {
        setIsOpen(false);
        onChange?.(value);
    };
    const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div
            className={styles.selectWrapper}
            ref={rootRef}
            data-is-active={isOpen}
            data-testid="selectWrapper"
        >
            <span className={styles.label}>{label}</span>
            <div className={styles.arrow}>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0.5L5 5.5L10 0.5" fill="black"/>
                </svg>
            </div>
            <div
                className={styles.placeholder}
                data-status={status}
                data-selected={!!selected?.value}
                onClick={handlePlaceHolderClick}
                role="button"
                tabIndex={0}
                ref={placeholderRef}
            >
                {selected?.title || placeholder}
            </div>
            {isOpen && (
                <ul className={styles.select} data-testid="selectDropdown">
                    {options.map((option) => (
                        <OptionEl
                            key={option.value}
                            option={option}
                            onClick={handleOptionClick}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Select;
