import React from "react"
import styled from "styled-components"

import { PageType } from "../../types"

import { truncate } from "lib/string"

const Title = styled.span`
  padding: 0 1em;
`

const RightNumber = styled.span`
  padding-right: var(--bindery-margin-inner);
`

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 12pt;
`

interface PageHeaderProps {
  page: PageType
}

const PageHeader: React.FC<PageHeaderProps> = ({ page }) => {
  const title = truncate(page.heading.h1) || ""
  const pageNumber = page.isEmpty ? null : page.number
  const shouldBeEmpty = !!page.heading.h6

  if (shouldBeEmpty) {
    return null
  }

  return (
    <Container>
      {page.isLeft && (
        <>
          {pageNumber}
          <Title dangerouslySetInnerHTML={{ __html: title }} />
        </>
      )}

      {page.isRight && (
        <>
          <Title dangerouslySetInnerHTML={{ __html: title }} />
          <RightNumber>{pageNumber}</RightNumber>
        </>
      )}
    </Container>
  )
}

export default PageHeader
