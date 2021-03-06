import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import arrowImage from './arrow.png';

const NONE_KEY = 'BW_SHARED_SELECT_NONE';

const Styles = styled.select`
  padding: ${({ theme }) => theme.padding.medium};
  border: ${({ theme }) => theme.input.border};
  border-radius: 0;
  width: 100%;
  color: ${({ theme }) => theme.input.fg};
  font-family: ${({ theme }) => theme.input.fontFamily};
  font-size: ${({ theme }) => theme.input.fontSize};
  letter-spacing: ${({ theme }) => theme.input.letterSpacing};
  line-height: ${({ theme }) => theme.input.lineHeight};
  cursor: pointer;
  box-shadow: none;
  background-color: ${({ theme }) => theme.input.bg};
  appearance: none;
  position: relative;

  background-image: url(${arrowImage});
  background-repeat: no-repeat;
  background-position: right;
  background-size: 35px;

  transition: 0.2s ease all;

  &:focus {
    box-shadow: inset 0 -5px 0 ${({ theme }) => theme.input.accentValid};
    border-color: ${({ theme }) => theme.input.focusedBorder};
    outline: none;
  }

  &:disabled {
    background: ${({ theme }) => theme.input.disabledBG};
    color: ${({ theme }) => theme.input.disabledFG};
  }
`;

const selectOptionPrimaryValue = (option) => {
  if (_.isString(option)) {
    return option;
  }
  if (_.isFunction(option.get)) {
    return option.get('id');
  }
  return option.id || JSON.stringify(option);
};

class Select extends React.Component {
  static propTypes = {
    /**
     * Adds a class name to the element.
     */
    className: PropTypes.string,
    /**
     * Adds an id to the element.
     */
    id: PropTypes.string,
    /**
     * Indicates whether the user can interact with this field.
     */
    disabled: PropTypes.bool,
    /**
     * Indicates whether this field is required for form submission.
     */
    required: PropTypes.bool,
    /**
     * Text to show if none is selected
     */
    noneText: PropTypes.string,
    /**
     * Can the user select 'none'? (Defaults true)
     */
    allowNone: PropTypes.bool,
    /**
     * A list of selection options. Can be complex objects.
     */
    options: PropTypes.array.isRequired,
    /**
     * A function which takes an option and renders text for the select. Has
     * a sane default.
     */
    renderOption: PropTypes.func,
    /**
     * A function which takes an option and computes a single string value to
     * represent it. Has a sane default.
     */
    selectOptionValue: PropTypes.func,
    /**
     * The currently selected value.
     */
    value: PropTypes.string,
    /**
     * Handler for change events on the select. It will be called with the new value
     * computed from selectOptionValue.
     */
    onChange: PropTypes.func,
  };

  static defaultProps = {
    className: null,
    id: null,
    disabled: false,
    required: false,
    noneText: 'None',
    allowNone: true,
    renderOption: selectOptionPrimaryValue,
    selectOptionValue: selectOptionPrimaryValue,
  };

  handleChange = (ev) => {
    const val = ev.target.value;
    if (val === NONE_KEY) {
      return this.props.onChange(null);
    }

    return this.props.onChange(val);
  };

  renderOptions = () => {
    const {
      options,
      renderOption,
      allowNone,
      noneText,
      selectOptionValue,
    } = this.props;

    const opts = options.map((option) => (
      <option
        key={selectOptionValue(option)}
        value={selectOptionValue(option)}
      >
        {renderOption(option)}
      </option>
    ));

    if (allowNone) {
      opts.unshift(
        <option
          key={NONE_KEY}
          value={NONE_KEY}
        >
          {noneText}
        </option>
      );
    }

    return opts;
  };

  render() {
    const { value, disabled, required, id, className } = this.props;
    return (
      <Styles
        onChange={this.handleChange}
        value={value}
        disabled={disabled}
        required={required}
        id={id}
        className={className}
      >
        {this.renderOptions()}
      </Styles>
    );
  }
}

Select.usage = `
A dropdown input which lets you pick from a list of provided items. Supports default input-style props:

* \`input\`: supplied by Redux Form's Field component, you can also specify this manually. Should contain \`value\` and \`onChange\` at least.
* \`label\`: a renderable label to go above the component
* \`helpText\`: some text to be rendered below the component
* \`disabled\`: disables the component
* \`required\`: adds a required mark and HTML field validation
* \`options\`: an array of data
* \`renderOption\`: a function to transform an option item into some text to show. Defaults to \`val => '' + val\`
* \`selectOptionKey\`: a function to transform an option into a **unique** key

\`\`\`
<Select label="Choose:" required helpText="Make a choice!" options={['a', 'b']}>
\`\`\`
`;

Select.Container = Styles;

export default Select;
