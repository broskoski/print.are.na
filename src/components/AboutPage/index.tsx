import React from "react"
import styled from "styled-components"

import { PageBreak } from "styles/index"

const About = styled.h6`
  font-weight: normal;
  margin: 0;
  font-size: 14pt;
`

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`

interface AboutPageProps {
  description: string
}

const AboutPage: React.FC<AboutPageProps> = ({ description }) => {
  return (
    <Container className="page">
      <PageBreak />
      <About>{description}</About>
    </Container>
  )
}

export default AboutPage
