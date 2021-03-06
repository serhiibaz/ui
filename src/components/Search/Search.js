import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

export default class Search extends Component {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    small: PropTypes.bool,
    placeHolderText: PropTypes.string,
    labelText: PropTypes.node.isRequired,
    id: PropTypes.string,
    closeButtonLabelText: PropTypes.string,
    /**
     * `true` to use the light version.
     */
    light: PropTypes.bool,
  };

  static defaultProps = {
    type: 'text',
    small: false,
    placeHolderText: '',
    onChange: () => {},
    light: false,
  };

  state = {
    hasContent: this.props.value || this.props.defaultValue || false,
  };

  clearInput = evt => {
    if (!this.props.value) {
      this.input.value = '';
      this.props.onChange(evt);
    } else {
      const clearedEvt = Object.assign({}, evt.target, {
        target: {
          value: '',
        },
      });
      this.props.onChange(clearedEvt);
    }

    this.setState({ hasContent: false }, () => this.input.focus());
  };

  handleChange = evt => {
    this.setState({
      hasContent: evt.target.value !== '',
    });

    this.props.onChange(evt);
  };

  render() {
    const {
      className,
      banner,
      type,
      id = (this._inputId =
        this._inputId ||
        `search__input__id_${Math.random()
          .toString(36)
          .substr(2)}`),
      placeHolderText,
      labelText,
      closeButtonLabelText,
      small,
      main,
      light,
      ...other
    } = this.props;

    const { hasContent } = this.state;

    const searchClasses = classNames({
      'wfp--search': true,
      'wfp--search--lg': !small,
      'wfp--search--sm': small,
      'wfp--search--main': main,
      'wfp--search--banner': banner,
      'wfp--search--light': light,
      [className]: className,
    });

    const clearClasses = classNames({
      'wfp--search-close': true,
      'wfp--search-close--hidden': !hasContent,
    });

    return (
      <div className={searchClasses} role="search">
        <Icon
          name="search"
          description={labelText}
          className="wfp--search-magnifier"
        />
        <label htmlFor={id} className="wfp--label">
          {labelText}
        </label>
        <input
          {...other}
          type={type}
          className="wfp--search-input"
          id={id}
          placeholder={placeHolderText}
          onChange={this.handleChange}
          ref={input => {
            this.input = input;
          }}
        />
        <button
          className={clearClasses}
          onClick={this.clearInput}
          type="button"
          aria-label={closeButtonLabelText}>
          <Icon name="close--solid" description={closeButtonLabelText} />
        </button>
      </div>
    );
  }
}
