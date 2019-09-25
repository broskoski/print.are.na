import React from "react"
import styled from "styled-components"

import { PageBreak } from "styles/index"

const Title = styled.h6`
  font-weight: normal;
  margin: 0;
  font-size: 14pt;
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
      <PageBreak />
      <Title>{title}</Title>
    </Container>
  )
}

export default SectionPage
