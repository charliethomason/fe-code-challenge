import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import Button from 'common/Button';
import Image from 'common/Image';

class Confirmation extends PureComponent {
    static propTypes = {
        location: PropTypes.object,
        selectedSpot: PropTypes.object,
        pushTo: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const {
            selectedSpot,
            pushTo
        } = props;

        // if you refresh on conirmation and there isn't a selectedSpot, make sure to go back to search and render nothing here
        if (!selectedSpot) {
            pushTo('/');
        }
    }

    _onPurchaseAnotherClick = evt => {
        const {
            pushTo,
        } = this.props;

        pushTo('/');
    }

    render() {
        const {
            location,
            selectedSpot
        } = this.props;

        console.log(location);

        if (!selectedSpot || !location.state || !location.state.email) {
            return null;
        }

        const { email } = location.state;

        return (
            <div className="Confirmation">
                <h1>Park it like its hot!</h1>
                <p>You successfully purchased parking at <strong>{selectedSpot.title}</strong> for <strong>${(selectedSpot.price / 100).toFixed(2)}</strong>.</p>
                <Image src={selectedSpot.image} />
                <p>We emailed a receipt to <a href={`mailto:${email}`}>{email}</a>.</p>
                <Button
                    color="primary"
                    onClick={this._onPurchaseAnotherClick}
                >
                    Purchase Another Spot!
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        spot: {
            selected: selectedSpot
        }
    } = state;

    return {
        selectedSpot
    };
};

const mapDispatchToProps = {
    pushTo: push,
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
