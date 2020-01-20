import React from "react"
import styled from "styled-components"

import { Channel } from "types"
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
`

interface TitlePageProps {
  title: string
  author: string
  channel: Channel
}

const TitlePage: React.FC<TitlePageProps> = ({ title, author, channel }) => {
  return (
    <Container className="page">
      <Title>{title}</Title>
      <div>
        <Author>{author}</Author>
        {channel.collaborators &&
          channel.collaborators.map(c => {
            return <Author>{c.username}</Author>
          })}
      </div>
      <PageBreak />
    </Container>
  )
}

export default TitlePage
