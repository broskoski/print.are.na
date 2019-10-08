import React from "react"
import styled from "styled-components"

import { PageBreak } from "styles/index"

const Title = styled.h6`
  font-weight: normal;
  margin: 0;
  font-size: 13pt;
`

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`

interface SectionPageProps {
  title: string
}

const SectionPage: React.FC<SectionPageProps> = ({ title }) => {
  return (
    <Container className="page">
      <Title>{title}</Title>
      <PageBreak />
    </Container>
  )
}

export default SectionPage
