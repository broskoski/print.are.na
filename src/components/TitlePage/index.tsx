import React from "react"
import styled from "styled-components"

import { PageBreak } from "styles/index"

const Title = styled.h6`
  margin: 0;
  font-family: "Arial Black";
  font-size: 32pt;
`

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`

interface TitlePageProps {
  title: string
}

const TitlePage: React.FC<TitlePageProps> = ({ title }) => {
  return (
    <Container className="page">
      <PageBreak />
      <Title>{title}</Title>
    </Container>
  )
}

export default TitlePage
