import React from 'react';
import styled from 'styled-components';

const TD = styled.td`
  text-align: left;
  background: ${({ theme }) => theme.table.cellBG};
  border: ${({ theme }) => theme.table.cellBorder};
  border-width: 0 1px 1px 0;
  margin: ${({ theme }) => theme.table.cellMargin};
  padding: ${({ theme }) => theme.table.cellPadding};
  white-space: nowrap;
  transition: 0.2s ease all;

  &:last-child {
    border-right: 0;
  }
`;

export default class Cell extends React.Component {
  static propTypes = {
    value: React.PropTypes.any,
    columnKey: React.PropTypes.string,
    sorting: React.PropTypes.bool,
  };

  static defaultProps = {
    value: null,
    columnKey: null,
    sorting: false,
  };

  render() {
    return <TD>{this.props.value}</TD>;
  }
}