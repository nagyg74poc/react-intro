import React, {useState} from 'react';

export const useDropdown = (label, defaultState, options) => {
    const [state, setState] = useState(defaultState);
    const id = `use-state-${label.replace(' ', '').toLowerCase()}`;

    const Dropdown = () => {
        return (
            <label htmlFor={id}>
                {label}
                <select
                    name={id}
                    id={id}
                    value={state}
                    disabled={!options.length}
                    onChange={event => setState(event.target.value)}
                    onBlur={event => setState(event.target.value)}>
                    <option>All</option>
                    {options.map(item => (
                        <option value={item} key={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </label>
        )
    };
    return [state, Dropdown, setState];
};

export default useDropdown;
