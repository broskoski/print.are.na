import React, { useState } from "react"
import styled from "styled-components"

const Container = styled.div`
  background: rgb(23, 172, 16);
  padding: 1em;
  color: white;
  padding-top: 1em;
  position: relative;

  a {
    color: white !important;
  }

  @media print {
    display: none;
  }
`

const CloseButton = styled.a`
  font-family: "Courier";
  font-size: 18px;
  color: white;
  position: absolute;
  top: 0;
  right: 0.2em;
  cursor: pointer;
`

interface NoticeProps {
  id: string
}

const Notice: React.FC<NoticeProps> = ({ children, id }) => {
  const seenKey = `${id}-seen`
  const currentSeenValue = Boolean(localStorage.getItem(seenKey))
  const [hidden, setHidden] = useState<boolean>(currentSeenValue)

  const closeNotice = () => {
    localStorage.setItem(seenKey, "true")
    setHidden(true)
  }

  return (
    <>
      {!hidden && (
        <Container>
          {children}
          <CloseButton onClick={closeNotice}>✕</CloseButton>
        </Container>
      )}
    </>
  )
}

export default Notice
