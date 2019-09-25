import React from "react"
import styled from "styled-components"

import { Block } from "../../types"

const HiddenTitle = styled.h1`
  display: none;
`

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`

const ContainerWithMargin = styled(Container)`
  // margin: 48pt 24pt;
`

const Img = styled.img`
  max-width: 95%;
  max-height: 60%;
  display: block;
  margin: 0 auto;
`

const P = styled.p`
  margin: 0;
  font-size: 12pt;
  line-height: 1.25;

  > p:first-child {
    margin: 0;
  }
`

// const Description = styled.p`
//   font-weight: normal;
//   font-size: 10pt;
//   line-height: 1.25;
// `

interface PageProps {
  block: Block
}

const Page: React.FC<PageProps> = ({ block }) => {
  return (
    <ContainerWithMargin className="page">
      <HiddenTitle>{block.title}</HiddenTitle>

      {block.image && block.image.large && block.image.large.url && (
        <Img src={block.image.large.url} alt={block.title} />
      )}
      {block.class === "Text" && (
        <P dangerouslySetInnerHTML={{ __html: block.content_html }} />
      )}

      {/* {block.description_html !== "" && (
        <Description
          className="description"
          dangerouslySetInnerHTML={{ __html: block.description_html }}
        />
      )} */}
    </ContainerWithMargin>
  )
}

export default Page
