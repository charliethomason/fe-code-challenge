import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const baseClass = 'text-field';

const TextInput = ({
    label,
    name,
    id,
    type,
    value,
    maxLength,
    error,
    onChange,
    onBlur,
}) => {
    const fieldClass = classNames(
        `${baseClass}`,
        { [`${baseClass}--error`]: error }
    );
    const inputAttrs = {
        className: `${baseClass}__input`,
        onChange: onChangeHandler,
        onBlur: onBlurHandler,
        type,
        name,
        id,
        value,
        maxLength
    };

    function getError() {
        if (!error) {
            return null;
        }

        return <div className={`${baseClass}__error`}>{error}</div>;
    }

    function onChangeHandler(evt) {
        const textVal = evt.target.value;
        const validTel = /^[\d \-()]+$/gm;
        if (type === 'tel' && Boolean(textVal) && !validTel.test(textVal)) {
            return;
        }
        onChange(evt);
    }

    function onBlurHandler(evt) {
        if (!onBlur) {
            return;
        }
        onBlur(evt);
    }

    return (
        <div className={fieldClass}>
            <label
                htmlFor={id}
                className={`${baseClass}__label`}
            >
                {label}
            </label>
            <input {...inputAttrs} />
            {getError()}
        </div>
    );
};

TextInput.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    maxLength: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
};

TextInput.defaultProps = {
    type: 'text'
};

export default TextInput;
