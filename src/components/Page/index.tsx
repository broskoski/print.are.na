import React from "react"
import styled from "styled-components"

import Header from "components/Header"

import { PageBreak } from "styles/index"

import { Block, URLOptions } from "../../types"

const HiddenTitle = styled.h1`
  display: none;
`

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;

  > p:first-child {
    margin: 0;
  }
`

const ContainerWithMargin = styled(Container as any)``

const Img = styled.img`
  max-width: 100%;
  max-height: calc(var(--bindery-page-height) - 2.25in);
  display: block;
  flex: 1;
  margin: 0 auto;
  height: auto;
  object-fit: contain;
  object-position: top;
`

const P = styled.p<{ hasAuthor?: boolean }>`
  margin: 0;
  font-size: 13pt;
  line-height: 1.25;

  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;

  > p:first-child {
    margin: 0;
  }

  ${props =>
    props.hasAuthor &&
    `
    > p:last-child {
      margin-bottom: 0.45in;
    }
  `}
`

const BigP = styled(P as any)`
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

const Source = styled(SmallType as any)`
  margin-top: 0;
`

const Description = styled(SmallType as any)`
  position: absolute;
  top: 0;
  bottom: 0;
  height: 190mm;
  width: 100%;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 0.375in;
  pointer-events: none;

  > * {
    pointer-events: all;
  }

  > p:first-child {
    margin: 0;
  }
`

interface PageProps {
  block: Block
  options: URLOptions
}

const TEXT_THRESHOLD = 70
const DESCRIPTION_THRESHOLD = 390
const LONG_IMAGE_DESCRIPTION_THRESHOLD = 365

const Page: React.FC<PageProps> = ({ block, options }) => {
  const blockIsLargeType =
    block.class === "Text" && block.content_html.length < TEXT_THRESHOLD

  const hasDescription = block.description_html !== ""
  const imageRatio =
    block.dimensions &&
    block.dimensions.width &&
    block.dimensions.width / block.dimensions.height

  const longImage = imageRatio && imageRatio < 1
  const veryLongImage = imageRatio && imageRatio < 0.67

  const longDescription =
    hasDescription && longImage
      ? block.description_html.length > LONG_IMAGE_DESCRIPTION_THRESHOLD
      : block.description_html.length > DESCRIPTION_THRESHOLD

  return (
    <ContainerWithMargin className="page">
      <HiddenTitle>{block.title}</HiddenTitle>

      <Header title={block.title} id={block.id} />

      {block.hasImage && <Img src={block.imageUrl} alt={block.title} />}

      {blockIsLargeType && (
        <BigP dangerouslySetInnerHTML={{ __html: block.content_html }} />
      )}

      {!blockIsLargeType && !block.hasImage && (
        <P
          dangerouslySetInnerHTML={{ __html: block.content_html }}
          hasAuthor={options.author}
        />
      )}

      {(longDescription || veryLongImage) &&
        options.description &&
        block.description_html && <PageBreak />}

      {longDescription && block.description_html && options.description && (
        <P dangerouslySetInnerHTML={{ __html: block.description_html }} />
      )}

      <Description>
        {options.description && hasDescription && !longDescription && (
          <div dangerouslySetInnerHTML={{ __html: block.description_html }} />
        )}

        {options.source &&
          block.source &&
          block.source.url &&
          block.source.url !== "" && (
            <Source>
              Source: {` `}
              <a href={block.source.url}>
                {block.source.title || block.source.url}
              </a>
            </Source>
          )}

        {options.author && (
          <SmallType>Added by {block.connected_by_username}</SmallType>
        )}
      </Description>

      <PageBreak />
    </ContainerWithMargin>
  )
}

export default Page
