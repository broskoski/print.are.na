import React from "react"
import styled from "styled-components"

const Container = styled.div`
  background: yellow;
  padding: 1em;
  color: red;
  padding-top: 1em;
`

const Notice: React.FC = ({ children }) => {
  return <Container>{children}</Container>
}

export default Notice
