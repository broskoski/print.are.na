import React from "react"
import styled from "styled-components"

import { PageBreak } from "styles/index"

const Title = styled.h6`
  margin: 0;
  font-family: "Arial Black";
  font-size: 32pt;
`

const Author = styled.div`
  margin: 3em 0;
  font-size: 18pt;
`

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`

interface TitlePageProps {
  title: string
  author: string
}

const TitlePage: React.FC<TitlePageProps> = ({ title, author }) => {
  return (
    <Container className="page">
      <PageBreak />
      <Title>{title}</Title>
      <Author>by {author}</Author>
    </Container>
  )
}

export default TitlePage
