import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import Image from 'common/Image';
import TextButton from 'common/TextButton';
import CheckoutForm from './CheckoutForm';

const baseClass = 'checkout';

const Checkout = ({
    location,
    pushTo
}) => {
    function getSpotInfo(property) {
        if (!location.state || !location.state[property]) {
            pushTo('/');

            return null;
        }

        return location.state[property];
    }
    function goBackToSearch() {
        pushTo('/');
    }
    function onSubmit(email) {
        pushTo('/confirmation', { email });
    }

    return (
        <div className={baseClass}>
            <div className={`${baseClass}__nav`}>
                <TextButton onClick={goBackToSearch}>&lt; Back to Search</TextButton>
            </div>
            <div className={`${baseClass}__info`}>
                <Image src={getSpotInfo('image')} />
                <h1>{getSpotInfo('title')}</h1>
                <p className={`${baseClass}__info__distance`}>{getSpotInfo('distance')}</p>
            </div>
            <CheckoutForm onSubmit={onSubmit} />
        </div>
    );
};

Checkout.propTypes = {
    location: PropTypes.object,
    pushTo: PropTypes.func
};

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = {
    pushTo: push
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
