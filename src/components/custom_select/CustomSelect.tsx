import React from 'react';
import Select from "react-select";


const customStyles = {
    dropdownIndicator: () => {
        return {
            display: "none"
        }
    },
    valueContainer: (provided) => {
        return {
            ...provided,
            paddingLeft: "15px"
        }
    },
    singleValue: (provided) => {
        return {
            ...provided,
            color: "black"
        }
    },
    control: (provider, state) => {
        return {
            height: "45px",
            border: "1px solid #44566673",
            borderRadius: "8px",
            alignItems: "center",
            display: "flex",
            ...(state.selectProps.selectProps.error && {border:"1px solid #FC4483"})
        }
    },

    menu: (provided) => {
        return {
            ...provided,
            background: "#E8F4FF",
        }
    },

    option: (provided, state) => {
        return {
            ...provided,
            color: "#878787",
            ...(state.isSelected && {
                color: "#0187FC",
                background: "transparent"
            }),
            ":hover": {
                color: "#0187FC"
            },
            ...(state.data.disabled && {
                color: "#87878780",
                ":hover": {
                    color: "#87878780"
                },
            })
        }
    }
}

interface IOption {
    value: string | number,
    label: string,
    disabled?: boolean
}


interface ICustomSelect {
    className?: string,
    options: IOption[],
    onSelect: (val) => void,
    onMenuOpen?: () => void,
    error?: boolean,
    value: any,
    placeholder: string
}

const CustomSelect: React.FC<ICustomSelect> = ({className, options, onSelect, onMenuOpen, error=false, value, placeholder}) => {

    return (
        <Select
            className={className}
            onMenuOpen={onMenuOpen}
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            //@ts-ignore
            selectProps={{ error }}
            isOptionDisabled={(option) => option.disabled}
            formatOptionLabel={(option, { context })=>{
                if (context=="value"){
                    if (option.sublable){
                        return option.label + option.sublable
                    }
                    return option.label
                }
                return option.label
            }}
            placeholder={placeholder}
            onChange={onSelect}
            value={value}
            styles={customStyles}
            noOptionsMessage={() => "Нет данных"}
            options={options}
        />
    );
};

export default CustomSelect;