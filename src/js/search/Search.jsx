import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import {updateSelected} from 'spot/spot-actions';
import SpotList from './spot-list/SpotList';
import DetailsModal from '../modal/DetailsModal';

const Search = ({
    selectedSpot,
    spots,
    setSpot,
    pushTo
}) => {
    const showModal = selectedSpot !== null;

    function goToConfirm(selected) {
        pushTo(`/checkout`, selected);
    }

    return (
        <div className="Search">
            <SpotList
                spots={spots}
                selectedSpot={selectedSpot}
                setSpot={setSpot}
            />
            <div className="Search-content">
                <DetailsModal
                    spotDetails={selectedSpot}
                    shown={showModal}
                    onButtonClick={goToConfirm}
                    onModalClose={setSpot}
                />
            </div>
        </div>
    );
};

Search.propTypes = {
    selectedSpot: PropTypes.object,
    spots: PropTypes.arrayOf(PropTypes.object).isRequired,
    setSpot: PropTypes.func.isRequired,
    pushTo: PropTypes.func
};

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
    setSpot: updateSelected,
    pushTo: push
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
