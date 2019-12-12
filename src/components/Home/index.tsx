import React, { useState } from "react"
import styled from "styled-components"
import { useHistory } from "react-router-dom"
import { stringify } from "qs"

import { URLOptions } from "types"

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
  padding: 1em 1em;
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

const Icon = styled.img.attrs({
  src: "/icon.png",
})`
  margin-bottom: 1.25em;
`

const Bottom = styled(Text)`
  line-height: 1.35;
  font-size: 12pt;
  max-width: 40em;
`

const Arrow = styled.button.attrs({ type: "submit" })`
  font-family: monospace;
`

const Home: React.FC = ({ ...props }) => {
  const history = useHistory()
  const [url, setUrl] = useState<string | null>("")
  const [options, setOptions] = useState<URLOptions>({
    blockAuthor: true,
    blockSource: true,
    blockDescription: true,
  })

  const onOptionChange = (
    key: "blockAuthor" | "blockSource" | "blockDescription",
    value: boolean
  ) => {
    setOptions(prevOptions => ({
      ...prevOptions,
      [key]: value,
    }))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const slug = url && url.split("/").pop()

    if (!slug) return false

    history.push(`/book/${slug}?${stringify(options)}`)
  }

  return (
    <Container>
      <Top>
        <Icon />
        <Title>print.are.na</Title>
        <Form onSubmit={onSubmit}>
          <Instructions>
            <Text>
              Enter the URL of a public Are.na channel:{" "}
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUrl(e.target.value)
                }
                type="text"
                name="url"
                placeholder=""
              />
              <Options>
                <Option>
                  <Checkbox
                    checked={options.blockAuthor}
                    onChange={e =>
                      onOptionChange("blockAuthor", !options.blockAuthor)
                    }
                  />
                  <label>Include block author</label>
                </Option>
                <Option>
                  <Checkbox
                    checked={options.blockSource}
                    onChange={e =>
                      onOptionChange("blockSource", !options.blockSource)
                    }
                  />
                  <label>Include block source</label>
                </Option>
                <Option>
                  <Checkbox
                    checked={options.blockDescription}
                    onChange={e =>
                      onOptionChange(
                        "blockDescription",
                        !options.blockDescription
                      )
                    }
                  />
                  <label>Include block description</label>
                </Option>
              </Options>
            </Text>
          </Instructions>
          <Arrow>→</Arrow>
        </Form>
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
        <a href="http://mindyseu.com">Mindy Seu</a> designed and facilitated the
        current version.
      </Bottom>
    </Container>
  )
}

export default Home
