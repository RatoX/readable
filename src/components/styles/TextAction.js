import styled from 'styled-components'

const TextAction = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  text-decoration: underline;
  cursor: pointer;

  :focus,
  :hover,
  :active {
    color: #204ecf;
  }
`

export default TextAction
