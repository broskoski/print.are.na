import React from "react"
import styled from "styled-components"

const Title = styled.h6`
  font-weight: normal;
  margin: 0;
  font-size: 16pt;
`

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: 100%;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`

const Slug = styled.code`
  background: black;
  padding: 0.25em;
  color: lime;
`

interface LoadingPageProps {
  slug: string
}

const LoadingPage: React.FC<LoadingPageProps> = ({ slug }) => {
  return (
    <Container className="page">
      <Title>
        Converting channel <Slug>{slug}</Slug> into a book...
      </Title>
    </Container>
  )
}

export default LoadingPage
