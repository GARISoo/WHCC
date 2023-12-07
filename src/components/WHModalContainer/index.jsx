import React, { Component, createRef } from 'react';
import WHLoader from '../WHLoader';
import WHButton from '../WHButton';
import './styles.scss';

class WHModalContainer extends Component {
  constructor(props) {
    super(props);

    this.modalContainerRef = createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(e) {
    const { closeModal } = this.props;
    const { current } = this.modalContainerRef;

    const clickedOutside = current && !current?.contains(e.target);

    if (clickedOutside) {
      closeModal();
    }
  }

  render() {
    const {
      children,
      modalDetails,
      submitLoading,
      closeModal,
      confirmModal,
      loading,
      goBack,
      disabled,
      height,
      width,
      noPadding,
    } = this.props;

    if (!modalDetails) {
      return null;
    }

    const {
      title = '',
      description = '',
      id,
    } = modalDetails;

    return (
      <div className="wh-modal-background">
        <div className="wh-modal-container" ref={this.modalContainerRef} style={{ maxWidth: width || '', width: width || 'auto' }}>
          <button className="wh-modal-close-btn" type="button" onClick={closeModal}>
            <i className="fas fa-times" />
          </button>
          <div className="wh-modal-header">
            <h5>{title}</h5>
          </div>
          <div className="wh-modal-body" style={{ height: height || 'auto', padding: noPadding ? '0' : '' }}>
            {loading ? (
              <WHLoader />
            ) : (
              children || <p>{description}</p>
            )}
          </div>
          <div className="wh-modal-footer">
            <WHButton
              loading={submitLoading}
              disabled={disabled || loading}
              onClick={goBack || closeModal}
              text={goBack ? '← atpakaļ' : 'Aizvērt'}
              small
            />
            {confirmModal ? (
              <WHButton
                loading={submitLoading}
                disabled={disabled || loading}
                secondary
                onClick={() => confirmModal(id)}
                text="Apstiprināt"
                small
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default WHModalContainer;
