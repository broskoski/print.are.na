import React from "react"
import styled from "styled-components"
import { RouteComponentProps } from "react-router"

const ErrorCopy = styled.h6`
  font-weight: normal;
  margin: 0;
  font-size: 16pt;
  max-width: 30em;
  text-align: center;
`

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding: 2em;
  align-items: center;
  justify-content: center;
`

const ErrorTitle = styled.span`
  color: rgb(182, 2, 2);
  font-size: 16pt;
  margin-bottom: 1em;
`

const BackButton = styled.a`
  font-family: "Courier";
  font-size: 36px;
  padding: 1em;
  color: black;
`

const ERROR_MAP = {
  not_found: {
    title: "Not Found",
    message: "Channel not found, please try again",
  },
  unauthorized: {
    title: "Unauthorized",
    message:
      "Looks like this might be a private channel. You can generate a share link (under channel info) and use that URL instead.",
  },
  not_a_channel: {
    title: "?",
    message:
      "This doesn't look like a channel, please try again and enter a URL from an Are.na channel.",
  },
  unknown: {
    title: "?",
    message: "Unknown error. Please try again",
  },
}

type ErrorPageProps = RouteComponentProps<{
  error: "unauthorized" | "not_found" | "not_a_channel" | "unknown"
}>

const ErrorPage: React.FC<ErrorPageProps> = ({
  match: {
    params: { error },
  },
}) => {
  return (
    <Container className="page">
      <ErrorTitle>{ERROR_MAP[error].title}</ErrorTitle>
      <ErrorCopy>{ERROR_MAP[error].message}</ErrorCopy>
      <BackButton href="/">˿</BackButton>
    </Container>
  )
}

export default ErrorPage
