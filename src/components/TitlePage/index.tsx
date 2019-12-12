import React from "react"
import styled from "styled-components"

import { PageBreak } from "styles/index"

const Title = styled.h6`
  margin: 0;
  font-size: 13pt;
  font-weight: normal;
`

const Author = styled.div`
  margin: 0;
  font-size: 13pt;
`

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  height: 6.275in;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: calc(var(--bindery-margin-inner) * -0.38);
`

interface TitlePageProps {
  title: string
  author: string
}

const TitlePage: React.FC<TitlePageProps> = ({ title, author }) => {
  return (
    <Container className="page">
      <Title>{title}</Title>
      <Author>{author}</Author>
      <PageBreak />
    </Container>
  )
}

export default TitlePage
