import React, { useState } from "react"
import styled from "styled-components"
import { withRouter, RouterProps } from "react-router"

const Container = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Input = styled.input`
  font-size: 18px;
  padding: 0.25em;
  width: 20em;
`

const Home: React.FC<RouterProps> = ({ history }) => {
  const [url, setUrl] = useState<string | null>("")

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const slug = url && url.split("/").pop()

    if (!slug) return false

    history.push(`/book/${slug}`)
  }

  return (
    <Container>
      <h1>print.are.na</h1>
      <form onSubmit={onSubmit}>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUrl(e.target.value)
          }
          type="text"
          name="url"
          placeholder="Enter Are.na channel URL"
        />
      </form>
    </Container>
  )
}

export default withRouter(Home)
