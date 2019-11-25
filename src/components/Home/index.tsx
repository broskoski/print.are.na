import React, { useState } from "react"
import styled from "styled-components"
import { withRouter, RouterProps } from "react-router"

const Container = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: column;
  padding: 2em;
  justify-content: space-between;
`

const Text = styled.div`
  margin: 0;
  font-size: 18pt;
  font-weight: normal;
  padding: 0.25em 0;
  line-height: 1.35;
  box-sizing: border-box;
`

const Title = styled(Text)``

const Instructions = styled.div`
  margin: 2em 0;
`

const Form = styled.form`
  display: inline;
  line-height: 1.35;
`

const Input = styled.input`
  font-size: 18pt;
  width: 13em;
  border: 0 transparent;
  border-bottom: 1px solid black;
  line-height: 1.35;
  height: 1em;
`

const Top = styled.div``

const Bottom = styled(Text)`
  line-height: 1.35;
  font-size: 14pt;
  max-width: 40em;
`

const P = styled.p`
  margin-bottom: 0;
`

const URLForm: React.FC<RouterProps> = ({ history }) => {
  const [url, setUrl] = useState<string | null>("")

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const slug = url && url.split("/").pop()

    if (!slug) return false

    history.push(`/book/${slug}`)
  }

  return (
    <Form onSubmit={onSubmit}>
      <Input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUrl(e.target.value)
        }
        type="text"
        name="url"
        placeholder=""
      />
    </Form>
  )
}

const Home: React.FC<RouterProps> = props => {
  return (
    <Container>
      <Top>
        <Title>print.are.na</Title>

        <Instructions>
          <Text>
            1. Enter the public URL of an Are.na channel: <URLForm {...props} />
          </Text>
          <Text>2. View PDF preview.</Text>
          <Text>
            3. (Optional) Save as PDF and upload to Lulu for booklet printing.
          </Text>
        </Instructions>
      </Top>
      <Bottom>
        print.are.na was initiated and supported in part by the{" "}
        <a href="https://www.media.mit.edu/groups/poetic-justice/overview/">
          Poetic Justice group
        </a>{" "}
        founded by <a href="https://studioijeoma.com">Ekene Ijeoma</a> at MIT
        Media Lab to support the activities of the Green Book Project course.{" "}
        <a href="https://evanbrooks.info">Evan Brooks</a> created{" "}
        <a href="http://bindery.js">bindery.js</a>, the open source library to
        create printable books using HTML and CSS.{" "}
        <a href="https://callil.com">Callil Capuozzo</a> made the original{" "}
        <a href="https://github.com/GeneralTrademark/print-arena">
          print.are.na
        </a>{" "}
        for the 2017 Cybernetics Conference.{" "}
        <P>
          <a href="http://mindyseu.com">Mindy Seu</a> designed and facilitated
          the current version.
        </P>
      </Bottom>
    </Container>
  )
}

export default withRouter(Home)
