import styled from 'styled-components'

const VoteButton = styled.span`
  cursor: pointer;
  font-size: 30px;
  font-weight: bold;

  + span {
    margin-left: 40px;
  }
`

const VoteButtonAdd = VoteButton.extend`
  color: #204ecf;
`

const VoteButtonRemove = VoteButton.extend`
  color: #e62857;
`

export {
  VoteButton,
  VoteButtonAdd,
  VoteButtonRemove,
}
