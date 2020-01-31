import React from "react"
import styled from "styled-components"

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding: 2em;
  align-items: center;
  justify-content: center;
`

const BackButton = styled.a`
  font-family: "Courier";
  font-size: 36px;
  padding: 1em;
  color: black;
`

const VideoWrapper = styled.div`
  max-width: 865px;
  margin: auto;
  position: relative;
  width: 50vw;
`

const Video = styled.div`
  position: relative;
  padding-bottom: 62.5%;
  height: 0;
  width: 100%;
`

const IFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const DemoPage: React.FC = () => {
  return (
    <Container className="page">
      <VideoWrapper>
        <Video>
          <IFrame
            src="https://www.loom.com/embed/e8925c58aeae4c69b0034a555f2a6648"
            frameBorder={0}
            title="Demo video"
          ></IFrame>
        </Video>
      </VideoWrapper>
      <BackButton href="/">˿</BackButton>
    </Container>
  )
}

export default DemoPage
