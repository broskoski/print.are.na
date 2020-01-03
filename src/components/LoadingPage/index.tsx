import React, { useEffect, useState } from "react"
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
  flex-direction: column;
  padding: 2em;
  align-items: flex-start;
  justify-content: flex-start;
`

const Slug = styled.span`
  color: rgb(23, 172, 16);
`

interface LoadingPageProps {
  slug: string
  totalPages: null | number
}

const LoadingPage: React.FC<LoadingPageProps> = ({ slug, totalPages }) => {
  const [tick, setTick] = useState(0)

  // useEffect(() => {
  //   let interval: any

  //   if (totalPages) {
  //     interval = setInterval(() => {
  //       setTick(tick + 1)
  //     }, 1000)
  //   }

  //   return () => clearInterval(interval)
  // }, [totalPages, tick])

  return (
    <Container className="page">
      <Title>
        Converting channel <Slug>{slug}</Slug> into a book...
      </Title>
      {totalPages && (
        <>
          <Title>Creating {totalPages * 50} pages...</Title>
          {tick > 2 && <Title>Downloading images...</Title>}
          {tick > 8 && <Title>Sorry, this is taking a while...</Title>}
        </>
      )}
    </Container>
  )
}

export default LoadingPage
