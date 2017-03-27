import React from 'react';
import styled from 'styled-components';

const Base = styled.code`
  font-family: ${({ theme }) => theme.code.fontFamily};
  fontSize: ${({ theme }) => theme.code.fontSize};
  padding: ${({ theme }) => theme.code.padding};
  borderRadius: ${({ theme }) => theme.code.borderRadius};
`;

const Multiline = styled(Base)`
  white-space: preserve;
`;

const Inline = styled(Base)`
  background: ${({ theme }) => theme.code.inlineBG};
  color: ${({ theme }) => theme.code.inlineFG};
  border: ${({ theme }) => theme.code.inlineBorder};
`;

export default class Code extends React.Component {
  static propTypes = {
    children: React.PropTypes.string.isRequired,
  };

  isMultiline = () => {
    const { children } = this.props;
    return /\n/.test(children);
  };

  render() {
    if (this.isMultiline()) {
      return <Multiline>{this.props.children}</Multiline>;
    }
    return <Inline>{this.props.children}</Inline>;
  }
}