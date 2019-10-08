import React from "react"
import styled from "styled-components"

import { PageType } from "../../types"

const Container = styled.div<{ isRight: boolean }>`
  width: 100%;
  display: flex;
  justify-content: ${props => (props.isRight ? "flex-end" : "flex-start")};
  font-size: 12pt;
`

interface PageHeaderProps {
  page: PageType
}

const PageHeader: React.FC<PageHeaderProps> = ({ page }) => {
  const pageNumber = page.isEmpty ? null : page.number
  const shouldBeEmpty = !!page.heading.h6

  if (shouldBeEmpty) {
    return null
  }

  return <Container isRight={page.isRight}>{pageNumber}</Container>
}

export default PageHeader
