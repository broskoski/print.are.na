import React from "react"
import styled from "styled-components"
import ReactMarkdown from "react-markdown"

import { PageBreak } from "styles/index"

const About = styled.h6`
  font-weight: normal;
  margin: 0;
  font-size: 13pt;
`

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
`

interface AboutPageProps {
  description?: string
}

const AboutPage: React.FC<AboutPageProps> = ({ description }) => {
  return (
    <Container className="page about-page">
      <About>
        <ReactMarkdown source={description} />
      </About>
      <PageBreak />
    </Container>
  )
}

export default AboutPage
