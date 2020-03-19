import React, { useState } from "react"
import styled from "styled-components"
import { useHistory } from "react-router-dom"
import { stringify } from "qs"

import { URLOptions } from "types"
import Notice from "components/Notice"
import { NoticeContainer } from "components/NoticeContainer"

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
  background: #f4f4f4;
`

const Text = styled.div`
  margin: 0;
  font-size: 18pt;
  font-weight: normal;
  line-height: 1.25;
  box-sizing: border-box;
`

const Title = styled(Text)`
  padding-top: 0;
  line-height: 1;
`

const Instructions = styled.div`
  margin: 2em 0;
`

const Form = styled.form`
  display: inline;
  line-height: 1.35;
`

const Options = styled.div`
  padding: 0.15em 1em 0.15em;
`

const Option = styled.div`
  display: flex;
  align-items: center;
`

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 1em;
  height: 2em;
  width: 2em;
`

const Input = styled.input`
  font-size: 18pt;
  width: 10em;
  border: 0 transparent;
  border-bottom: 1px solid black;
  line-height: 1.25;
  height: 1em;
  background: #f4f4f4;
`

const Top = styled.div``

const Bottom = styled(Text)`
  line-height: 1.35;
  font-size: 12pt;
  max-width: 40em;
`

const Button = styled.button`
  font-size: 1em;
`

// const Arrow = styled.button.attrs({ type: "submit" })`
//   font-family: monospace;
//   border: none;
//   margin: 0;
//   text-decoration: none;
//   font-size: 2rem;
//   background-color: transparent;
//   cursor: pointer;
//   text-align: center;
//   -webkit-appearance: none;
//   -moz-appearance: none;
//   line-height: 0.5;
//   padding: 0;
// `

const Home: React.FC = ({ ...props }) => {
  const history = useHistory()
  const [url, setUrl] = useState<string | null>("")
  const [options, setOptions] = useState<URLOptions>({
    author: true,
    source: true,
    description: true,
    toc: true,
  })

  const onOptionChange = (
    key: "author" | "source" | "description" | "toc",
    value: boolean
  ) => {
    setOptions(prevOptions => ({
      ...prevOptions,
      [key]: value,
    }))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const splitURL = url && url.split("/")

    if (
      (splitURL && splitURL.length !== 5) ||
      (splitURL && splitURL[2] !== "are.na" && splitURL[2] !== "www.are.na")
    ) {
      return history.push(`/error/not_a_channel`)
    }

    const slug = splitURL && splitURL.pop()

    if (!slug) return false

    history.push(`/book/${slug}?${stringify(options)}`)
  }

  return (
    <Container>
      <Top>
        <Title>print.are.na</Title>
        <Form onSubmit={onSubmit}>
          <Instructions>
            <Text>
              1. Enter the URL of a public Are.na channel:{" "}
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUrl(e.target.value)
                }
                type="text"
                name="url"
                placeholder=""
              />
              <Text>2. (Optional) Choose your settings:</Text>
              <Options>
                <Option>
                  <Checkbox
                    checked={options.toc}
                    onChange={e => onOptionChange("toc", !options.toc)}
                  />
                  <label>include table of contents</label>
                </Option>
                <Option>
                  <Checkbox
                    checked={options.author}
                    onChange={e => onOptionChange("author", !options.author)}
                  />
                  <label>display author</label>
                </Option>
                <Option>
                  <Checkbox
                    checked={options.source}
                    onChange={e => onOptionChange("source", !options.source)}
                  />
                  <label>display source</label>
                </Option>
                <Option>
                  <Checkbox
                    checked={options.description}
                    onChange={e =>
                      onOptionChange("description", !options.description)
                    }
                  />
                  <label>display description</label>
                </Option>
              </Options>
              <br />
              <Text>
                <Button>Make book</Button>
              </Text>
            </Text>
          </Instructions>
        </Form>
      </Top>

      <Bottom>
        print.are.na was created by <a href="http://mindyseu.com">Mindy Seu</a>,
        Charles Broskoski and{" "}
        <a href="https://studioijeoma.com">Ekene Ijeoma</a>. print.are.na uses{" "}
        <a href="http://bindery.js">bindery.js</a>, an open-source library for
        creating books using HTML and CSS, created by{" "}
        <a href="https://evanbrooks.info">Evan Brooks</a>. The first version{" "}
        <a href="https://github.com/GeneralTrademark/print-arena">
          print.are.na
        </a>{" "}
        was created by <a href="https://callil.com">Callil Capuozzo</a> for the
        2017 Cybernetics Conference.
      </Bottom>
      <NoticeContainer>
        <Notice id="demo">
          <strong>Note:</strong> First time using print.are.na? Watch this{" "}
          <a href="/demo">short instructional video</a>.
        </Notice>
      </NoticeContainer>
    </Container>
  )
}

export default Home
