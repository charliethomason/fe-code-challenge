import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'common/Button';

const baseClass = 'modal-wrapper';

export default class DetailsModal extends PureComponent {
    static propTypes = {
        spotDetails: PropTypes.object,
        shown: PropTypes.bool,
        onButtonClick: PropTypes.func,
        onModalClose: PropTypes.func
    };

    _onButtonClick = () => {
        const {
            spotDetails,
            onButtonClick
        } = this.props;

        onButtonClick(spotDetails);
    };

    _onModalClose = () => {
        const {
            onModalClose
        } = this.props;

        onModalClose(null);
    }

    render() {
        const {
            spotDetails,
            shown
        } = this.props;
        const modalClasses = classNames(
            `${baseClass}`,
            { [`${baseClass}--shown`]: shown }
        );

        function getInfo(property) {
            if (!spotDetails || !spotDetails[property]) {
                return null;
            }

            return spotDetails[property];
        }

        function getPrice() {
            if (!spotDetails || !spotDetails.price) {
                return null;
            }

            const price = spotDetails.price.toString();
            const strLength = price.length;

            return `$${price.substr(0, strLength - 2)}.${price.substr(strLength - 2, strLength)}`;
        }

        return (
            <div className={modalClasses}>
                <Button
                    color="icon"
                    onClick={this._onModalClose}
                >
                    <svg
                        className="Icon"
                        viewBox="0 0 1024 1024"
                        width="20px"
                        height="20px"
                    >
                        <path
                            d="M622.7,512l378.9-378.9c29.8-29.8,29.8-76.6,0-110.7c-29.8-29.8-76.6-29.8-110.7,
                                0L512,401.3L133.1,22.4c-29.8-29.8-76.6-29.8-110.7,0C-7.5,52.2-7.5,99,22.4,133.1L401.3,
                                512L22.4,890.9c-29.8,29.8-29.8,76.6,0,110.7c29.8,29.8,76.6,29.8,110.7,0L512,622.7l378.9,
                                378.9c29.8,29.8,76.6,29.8,110.7,0c29.8-29.8,29.8-76.6,0-110.7L622.7,512z"
                        />
                    </svg>
                    <span className="safe-hide">Close Modal</span>
                </Button>
                <h2>Spot Details</h2>
                <h3>{getInfo('title')}</h3>
                <p className={`${baseClass}__description`}>{getInfo('description')}</p>
                <Button
                    color="primary"
                    onClick={this._onButtonClick}
                >
                    {getPrice()} | Book It!
                </Button>
            </div>
        );
    }
}
