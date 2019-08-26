import React from 'react';
import PropTypes from 'prop-types';
import TextInput from 'common/TextInput';
import Button from 'common/Button';

const baseClass = 'checkout-form';
const baseError = 'Please enter a valid';
const fieldTypes = {
    firstName: 'first name',
    lastName: 'last name',
    email: 'email',
    phone: 'phone number'
};

export default class CheckoutForm extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            errors: {
                firstName: '',
                lastName: '',
                email: '',
                phone: ''
            },
            phoneIsValid: false
        };
        this._onUpdateValues = this._onUpdateValues.bind(this);
        this._onUpdatePhone = this._onUpdatePhone.bind(this);
        this._onBlurCheck = this._onBlurCheck.bind(this);
        this._onSubmitForm = this._onSubmitForm.bind(this);
    }

    _onUpdateValues(evt) {
        const field = evt.target.name;
        const value = evt.target.value;
        this.setState({ [field]: value });
    }

    _onBlurCheck(evt) {
        const field = evt.target.name;
        const value = evt.target.value;
        let errorText = '';
        if (!value.length) {
            errorText = `${baseError} ${fieldTypes[field]}`;
        }
        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                [field]: errorText
            }
        }));
    }

    _onUpdatePhone() {
        const nonNumeric = /[^0-9]/g;
        const numberPattern = /^(\d{3})(\d{3})(\d{4})/;
        const phoneFormat = /^(\({1})(\d{3})(\){1})(\s{1})(\d{3})(-{1})(\d{4})$/;
        this.setState(prevState => {
            let phoneErrorVal = '';
            const formatTel = prevState.phone
                .replace(nonNumeric, '')
                .substr(0, 10)
                .replace(numberPattern, '($1) $2-$3');

            if (!phoneFormat.test(formatTel) || !formatTel.length) {
                phoneErrorVal = `${baseError} ${fieldTypes.phone}`;
            }

            return {
                phone: formatTel,
                phoneIsValid: !phoneErrorVal.length,
                errors: {
                    ...prevState.errors,
                    phone: phoneErrorVal
                }
            };
        });
    }

    _onSubmitForm(evt) {
        evt.preventDefault();
        this.props.onSubmit(this.state.email);
    }

    render() {
        const {
            firstName,
            lastName,
            email,
            phone,
            errors,
            phoneIsValid
        } = this.state;
        const {
            _onSubmitForm,
            _onUpdateValues,
            _onUpdatePhone,
            _onBlurCheck
        } = this;

        const errorsExist = Boolean(errors.firstName) ||
            Boolean(errors.lastName) ||
            Boolean(errors.email) ||
            Boolean(errors.phone) ||
            !firstName ||
            !lastName ||
            !email ||
            !phone ||
            !phoneIsValid;

        return (
            <form
                className={baseClass}
                onSubmit={_onSubmitForm}
            >
                <TextInput
                    label="First Name"
                    name="firstName"
                    id="text-input-first-name"
                    value={firstName}
                    error={errors.firstName}
                    onChange={_onUpdateValues}
                    onBlur={_onBlurCheck}
                />
                <TextInput
                    label="Last Name"
                    name="lastName"
                    id="text-input-last-name"
                    value={lastName}
                    error={errors.lastName}
                    onChange={_onUpdateValues}
                    onBlur={_onBlurCheck}
                />
                <TextInput
                    label="Email"
                    name="email"
                    id="text-input-email"
                    type="email"
                    value={email}
                    error={errors.email}
                    onChange={_onUpdateValues}
                    onBlur={_onBlurCheck}
                />
                <TextInput
                    label="Phone Number"
                    name="phone"
                    id="text-input-phone"
                    type="tel"
                    maxLength="14"
                    value={phone}
                    error={errors.phone}
                    onChange={_onUpdateValues}
                    onBlur={_onUpdatePhone}
                />
                <Button
                    color="primary"
                    className={`${baseClass}__submit`}
                    disabled={errorsExist}
                    onClick={_onSubmitForm}
                >
                    Purchase
                </Button>
            </form>
        );
    }
}
