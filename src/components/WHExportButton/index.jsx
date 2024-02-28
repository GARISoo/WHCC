import React, { Component } from 'react';
import WHLoader from '../WHLoader';
import pdf from './assets/pdf.svg';
import xlsx from './assets/xlsx.svg';
import './styles.scss';
import '../../styles.scss';

class WHExportButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownActive: false,
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.dropdownRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleDocumentClick);
  }

  handleButtonClick() {
    const { handlePdf, handleExcel } = this.props;
    const { dropdownActive } = this.state;
    const hasMultipleFormats = handlePdf && handleExcel;
    const singleFormat = handlePdf || handleExcel;

    if (hasMultipleFormats) {
      this.setState({
        dropdownActive: !dropdownActive,
      });
    } else {
      singleFormat();
    }
  }

  handleDocumentClick(event) {
    const { dropdownActive } = this.state;

    if (dropdownActive && this.dropdownRef && !this.dropdownRef.current.contains(event.target)) {
      this.setState({
        dropdownActive: false,
      });
    }
  }

  render() {
    const {
      alignment,
      loading,
      handlePdf,
      handleExcel,
      className = '',
      disabled,
      text = 'Eksportēt'
    } = this.props;

    const { dropdownActive } = this.state;

    if (loading) {
      return (
        <div
          className="wh-export-btn"
          style={{ alignSelf: alignment }}
        >
          <WHLoader size={0.4} white />
        </div>
      );
    }

    return (
      <div className={`wh-export-container ${className}`} style={{ alignSelf: alignment }}>
        <button
          type="button"
          onClick={this.handleButtonClick}
          disabled={disabled}
          className="wh-export-btn wh-bg-transparent"
        >
          <i className="fa-solid fa-file-arrow-down btn-icon wh-text-dark" />
          <span className="wh-text-dark">
            {text || 'Eksportēt'}
          </span>
        </button>
        <div
          ref={this.dropdownRef}
          className={`wh-export-dropdown ${dropdownActive ? 'wh-export-dropdown-active' : 'wh-export-dropdown-disabled'}`}
        >
          {handlePdf ? (
            <button
              type="button"
              onClick={() => {
                handlePdf();
                this.setState({ dropdownActive: false });
              }}
              className="wh-export-download-btn"
            >
              <img src={pdf} alt="pdf" className="wh-export-icon" />
              <span className="wh-text-light">
                PDF
              </span>
            </button>
          ) : null}
          {handleExcel ? (
            <button
              type="button"
              onClick={() => {
                handleExcel();
                this.setState({ dropdownActive: false });
              }}
              className="wh-export-download-btn"
            >
              <img src={xlsx} alt="xlsx" className="wh-export-icon" />
              <span className="wh-text-light">
                Excel
              </span>
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

export default WHExportButton;
