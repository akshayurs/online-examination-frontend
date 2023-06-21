import React from 'react'
import { Container, Text, Button } from '../../../../styled'
import CheckIcon from '@material-ui/icons/Check'

const Question = ({ question, idx, onRemove }) => {
  return (
    <Container
      width="80vw"
      margin="10px 0px"
      background="white"
      direction="column"
      padding="10px 30px"
    >
      <Container direction="row" justify="space-between">
        <Container direction="row" width="60%">
          <Text width="15%" size="15px">
            <b>Question {idx + 1}: </b>
          </Text>
          <Text width="80%" size="15px">
            {question.title}
          </Text>
        </Container>
        <Text width="20%" size="15px">
          <b>Type: </b>
          {question.qtype}
        </Text>
        <Text width="10%" size="15px">
          <b>Mark: </b>
          {question.mark}
        </Text>
      </Container>
      {question['qtype'] == 'fb' && (
        <Container>
          <Text size="17">
            <b>Answer: </b>
            {question.fbans}
          </Text>
        </Container>
      )}

      <Container direction="row" align="flex-end" justify="space-between">
        {question['qtype'] == 'mcq' && (
          <Container width="90%">
            <ol>
              <Text lineHeight="0px" family="bold">
                Options:
              </Text>
              {question.options.map((opt, idx) => (
                <li style={{ display: 'flex' }}>
                  <Text lineHeight="0px">
                    {idx + 1}: {opt.option}
                  </Text>
                  {opt.isanswer && (
                    <CheckIcon fontSize="small" style={{ color: 'green' }} />
                  )}
                </li>
              ))}
            </ol>
          </Container>
        )}
      </Container>
      <Container justify="flex-end">
        <Button
          postion="absolute"
          bottom="0px"
          right="0px"
          width="65px"
          height="30px"
          background="#D24C4C"
          onClick={(e) => onRemove(e, idx)}
        >
          Remove
        </Button>
      </Container>
    </Container>
  )
}

export default Question
