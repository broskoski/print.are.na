import React from "react"
import styled from "styled-components"

import { PageType } from "../../types"

const Title = styled.span`
  padding: 0 1em;
`

const Container = styled.div`
  width: 100%;
`

interface PageHeaderProps {
  page: PageType
}

const PageHeader: React.FC<PageHeaderProps> = ({ page }) => {
  const title = page.heading.h1 || ""
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
          {pageNumber}
        </>
      )}
    </Container>
  )
}

export default PageHeader
