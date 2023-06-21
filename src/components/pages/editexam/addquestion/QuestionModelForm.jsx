import React, { useEffect } from 'react'
import { Container, Text, Input } from '../../../../styled'

const QuestionModelForm = ({ question, setQuestion }) => {
  const classes = {
    textareadiv: {
      height: '70px',
      width: '100%',
      margin: '10px 0px',
    },
    textarea: {
      background: '#EDF8DF',
      border: '1px solid #000000',
      boxSizing: 'border-box',
      borderRadius: '2px',
      padding: '5px',
      width: '100%',
      height: '70px',
    },
  }

  const onchange = (e) => {
    const { name, value } = e.target
    setQuestion({ ...question, [name]: value })
  }
  const onInputChange = (e, idx) => {
    setQuestion((prev) => {
      let ques = prev
      ques.options[idx].option = e.target.value
      return { ...ques }
    })
  }
  const onRadioChange = (e) => {
    setQuestion((prev) => {
      let ques = prev
      ques.options = ques.options.map((opti, idx) => {
        if (idx === parseInt(e.target.value)) opti.isanswer = true
        else opti.isanswer = false
        return { ...opti }
      })

      return { ...ques }
    })
  }
  return (
    <Container direction="column" width="500px">
      <form>
        <Container direction="column">
          <Text lineHeight="0px" size="18px">
            Type:
          </Text>
          <select
            name="qtype"
            style={{ fontSize: 17, padding: '10px' }}
            value={question['qtype']}
            onChange={onchange}
          >
            <option value="mcq">MCQ</option>
            <option value="fb">Fill in the blanks</option>
            <option value="descriptive">Descriptive</option>
            <option value="code">Code</option>
          </select>
        </Container>
        <Container direction="column">
          <label>
            <Text lineHeight="0px" size="18px">
              Question:
            </Text>
            <div style={classes.textareadiv}>
              <textarea
                style={classes.textarea}
                placeholder="Write Question here..."
                name="title"
                value={question['title']}
                onChange={onchange}
                required
              ></textarea>
            </div>
          </label>
        </Container>
        <Container justify="center">
          {question['qtype'] == 'fb' && (
            <input
              type="text"
              name="fbans"
              placeholder="answer"
              style={{
                height: 25,
                fontSize: 18,
                marginTop: 10,
                marginLeft: 10,
                padding: 5,
              }}
              value={question['fbans']}
              onChange={onchange}
            />
          )}
        </Container>

        <Container direction="row" justify="space-evenly">
          {question['qtype'] == 'mcq' && (
            <Container direction="column" width="60%">
              <label>
                <Text lineHeight="0px" size="18px">
                  Options:
                  <span style={{ color: 'red', fontSize: '12px' }}>
                    *select which is correct option
                  </span>
                </Text>

                <Container direction="row" align="center" margin="5px 0px">
                  <input
                    type="radio"
                    name="isAnswer"
                    value={0}
                    onChange={onRadioChange}
                    checked={question.options[0].isanswer}
                  />
                  <Input
                    type="text"
                    placeholder="Option 1"
                    value={question.options[0].option}
                    onChange={(e) => onInputChange(e, 0)}
                  />
                </Container>
                <Container direction="row" align="center" margin="5px 0px">
                  <input
                    type="radio"
                    name="isAnswer"
                    value={1}
                    onChange={onRadioChange}
                    checked={question.options[1].isanswer}
                  />
                  <Input
                    type="text"
                    placeholder="Option 2"
                    value={question.options[1].option}
                    onChange={(e) => onInputChange(e, 1)}
                  />
                </Container>
                <Container direction="row" align="center" margin="5px 0px">
                  <input
                    type="radio"
                    name="isAnswer"
                    value={2}
                    onChange={onRadioChange}
                    checked={question.options[2].isanswer}
                  />
                  <Input
                    type="text"
                    placeholder="Option 3"
                    value={question.options[2].option}
                    onChange={(e) => onInputChange(e, 2)}
                  />
                </Container>
                <Container direction="row" align="center" margin="5px 0px">
                  <input
                    type="radio"
                    name="isAnswer"
                    value={3}
                    onChange={onRadioChange}
                    checked={question.options[3].isanswer}
                  />
                  <Input
                    type="text"
                    placeholder="Option 4"
                    value={question.options[3].option}
                    onChange={(e) => onInputChange(e, 3)}
                  />
                </Container>
              </label>
            </Container>
          )}

          <Container width="30%" margin="0px 0px">
            <label>
              <Text lineHeight="0px" size="18px">
                Mark:
              </Text>
              <Input
                type="number"
                name="mark"
                placeholder="Mark"
                value={question['mark']}
                onChange={onchange}
              />
            </label>
          </Container>
        </Container>
      </form>
    </Container>
  )
}

export default QuestionModelForm
