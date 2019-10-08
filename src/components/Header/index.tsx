import React from "react"
import styled from "styled-components"

const Title = styled.span``

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 13pt;
  margin-bottom: 0.175in;
  max-width: 2.65in;
  min-height: 0.175in;
`

const Anchor = styled.a`
  display: none;
`

interface PageHeaderProps {
  title: string
  id: number
}

const Header: React.FC<PageHeaderProps> = ({ title, id }) => {
  return (
    <Container className="page-header">
      <Title dangerouslySetInnerHTML={{ __html: title }} />
      <Anchor id={id.toString()} />
    </Container>
  )
}

export default Header
