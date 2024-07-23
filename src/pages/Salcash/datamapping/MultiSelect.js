import React from 'react';
import PropTypes from 'prop-types';

class MultiSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: [],
    };
  }

  handleOptionClick = (option) => {
    const { selectedOptions } = this.state;
    const index = selectedOptions.findIndex((item) => item.value === option.value);
    if (index === -1) {
      this.setState(
        { selectedOptions: [...selectedOptions, option] },
        () => this.props.onSelectionChange(this.state.selectedOptions)
      );
    } else {
      const newSelectedOptions = selectedOptions.filter((item) => item.value !== option.value);
      this.setState(
        { selectedOptions: newSelectedOptions },
        () => this.props.onSelectionChange(this.state.selectedOptions)
      );
    }
  };

  render() {
    const { selectedOptions } = this.state;
    const { options } = this.props;

    return (
      <div className="multi-select">
        {options.map((option) => (
          <div
            key={option.value}
            className={`option ${selectedOptions.find((item) => item.value === option.value) ? 'selected' : ''}`}
            onClick={() => this.handleOptionClick(option)}
          >
            {option.label}
          </div>
        ))}
      </div>
    );
  }
}

MultiSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelectionChange: PropTypes.func.isRequired,
};

export default MultiSelect;
