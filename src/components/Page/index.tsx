import React from "react"
import styled from "styled-components"

import Header from "components/Header"

import { PageBreak } from "styles/index"

import { Block } from "../../types"

const HiddenTitle = styled.h1`
  display: none;
`

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`

const ContainerWithMargin = styled(Container)``

const Img = styled.img`
  max-width: 100%;
  max-height: calc(var(--bindery-page-height) - 1.5in);
  display: block;
]`

const P = styled.p`
  margin: 0;
  font-size: 13pt;
  line-height: 1.25;

  > p:first-child {
    margin: 0;
  }
`

const BigP = styled(P)`
  font-size: 30pt;
  line-height: 1.1;
`

const Description = styled(P)`
  margin-top: 0.375in;
  font-weight: normal;
  font-size: 9pt;
  line-height: 1.25;
`

interface PageProps {
  block: Block
}

const TEXT_THRESHOLD = 70
const DESCRIPTION_THRESHOLD = 370

const Page: React.FC<PageProps> = ({ block }) => {
  const blockIsLargeType =
    block.class === "Text" && block.content_html.length < TEXT_THRESHOLD

  const smallDescription = block.description_html.length < DESCRIPTION_THRESHOLD

  return (
    <ContainerWithMargin className="page">
      <HiddenTitle>{block.title}</HiddenTitle>

      <Header title={block.title} id={block.id} />

      {block.image && block.image.large && block.image.large.url && (
        <Img src={block.image.large.url} alt={block.title} />
      )}

      {blockIsLargeType && (
        <BigP dangerouslySetInnerHTML={{ __html: block.content_html }} />
      )}

      {!blockIsLargeType && (
        <P dangerouslySetInnerHTML={{ __html: block.content_html }} />
      )}

      {block.description_html !== "" && smallDescription && (
        <Description
          className="description"
          dangerouslySetInnerHTML={{ __html: block.description_html }}
        />
      )}

      {block.description_html !== "" && !smallDescription && (
        <>
          <PageBreak />
          <Description
            className="description"
            dangerouslySetInnerHTML={{ __html: block.description_html }}
          />
        </>
      )}
      <PageBreak />
    </ContainerWithMargin>
  )
}

export default Page
