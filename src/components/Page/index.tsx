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

  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
`

const BigP = styled(P)`
  font-size: 30pt;
  line-height: 1.1;
  > p:first-child {
    margin: 0;
  }
`

const SmallType = styled.div`
  font-size: 8pt;
  line-height: 1.25;
  margin: 0.5em 0;

  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
`

const Source = styled(SmallType)`
  margin-top: 0;
`

const Description = styled(SmallType)`
  position: absolute;
  top: 0;
  bottom: 0;
  height: 5.25in;
  width: 100%;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 0.375in;

  > p:first-child {
    margin: 0;
  }
`

interface PageProps {
  block: Block
}

const TEXT_THRESHOLD = 70
const DESCRIPTION_THRESHOLD = 320
const LONG_IMAGE_DESCRIPTION_THRESHOLD = 130
const VERY_LONG_DESCRIPTION_THRESHOLD = 820

const Page: React.FC<PageProps> = ({ block }) => {
  const blockIsLargeType =
    block.class === "Text" && block.content_html.length < TEXT_THRESHOLD

  const hasDescription = block.description_html !== ""
  const imageRatio =
    block.dimensions && block.dimensions.width / block.dimensions.height

  const longImage = imageRatio && imageRatio < 1
  const veryLongImage = imageRatio && imageRatio < 0.67

  const longDescription = longImage
    ? block.description_html.length > LONG_IMAGE_DESCRIPTION_THRESHOLD
    : block.description_html.length > DESCRIPTION_THRESHOLD

  const veryLongDescription =
    block.description_html.length > VERY_LONG_DESCRIPTION_THRESHOLD

  return (
    <ContainerWithMargin className="page">
      <HiddenTitle>{block.title}</HiddenTitle>

      <Header title={block.title} id={block.id} />

      {block.hasImage && <Img src={block.imageUrl} alt={block.title} />}

      {blockIsLargeType && (
        <BigP dangerouslySetInnerHTML={{ __html: block.content_html }} />
      )}

      {!blockIsLargeType && (
        <P dangerouslySetInnerHTML={{ __html: block.content_html }} />
      )}

      {(longDescription || veryLongImage) && <PageBreak />}

      {veryLongDescription && (
        <P dangerouslySetInnerHTML={{ __html: block.description_html }} />
      )}

      <Description>
        {hasDescription && !veryLongDescription && (
          <div dangerouslySetInnerHTML={{ __html: block.description_html }} />
        )}

        {block.source && block.source.url && block.source.url !== "" && (
          <Source>
            Source: {` `}
            <a href={block.source.url}>
              {block.source.title || block.source.url}
            </a>
          </Source>
        )}
        <SmallType>Added by {block.user.username}</SmallType>
      </Description>

      <PageBreak />
    </ContainerWithMargin>
  )
}

export default Page
