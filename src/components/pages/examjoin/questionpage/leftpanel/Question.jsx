import React, { useState } from 'react'
import { editAnswer } from '../../../../../redux/actions/exam'
import { Container, Text } from '../../../../../styled'
import { ExamContextConsumer } from '../../context'
import { useDispatch } from 'react-redux'
import CodeEditor from '@uiw/react-textarea-code-editor'
import { Button } from '@material-ui/core'
import { useEffect } from 'react'
const Question = ({ question, examid }) => {
  const dispatch = useDispatch()
  const { count, answer, setAnswer } = ExamContextConsumer()
  const { answers } = answer
  const [newInput, setNewInput] = useState('')
  const [lang, setLang] = useState('js')

  useEffect(() => {
    setNewInput('')
  }, [question])
  React.useEffect(() => {
    async function func() {
      if (await dispatch(editAnswer({ answers }, examid, answer._id))) {
        return
      }
    }

    func()
  }, [answers, dispatch])
  const onAnswerSelect = (optionid) => {
    let ans = answers.find((a) => {
      return String(a.questionid) === String(question._id)
    })
    if (ans) {
      setAnswer({
        ...answer,
        answers: [
          ...answers.map((a) => {
            if (String(a.questionid) === String(question._id))
              return { ...a, optionid: optionid }
            else return { ...a }
          }),
        ],
      })
    } else {
      let ans = { questionid: question._id, optionid: optionid }
      setAnswer({ ...answer, answers: [...answers, ans] })
    }
  }

  const onAnswerType = () => {
    let ans = answers.find((a) => {
      return String(a.questionid) === String(question._id)
    })
    if (ans) {
      setAnswer({
        ...answer,
        answers: [
          ...answers.map((a) => {
            if (String(a.questionid) === String(question._id))
              return { ...a, answer: newInput }
            else return { ...a }
          }),
        ],
      })
    } else {
      let newans = { questionid: question._id, answer: newInput }
      setAnswer({ ...answer, answers: [...answers, newans] })
    }
  }

  const isChecked = (optionid) => {
    let ans = answers.find((a) => {
      return (
        String(a.questionid) === String(question._id) &&
        String(a.optionid) === String(optionid)
      )
    })
    if (ans) return String(ans.optionid) === String(optionid)
    else return false
  }
  console.log({ answers, answer })
  return (
    <Container
      width="100%"
      margin="10px 0px"
      direction="column"
      padding="10px 30px"
    >
      <Container align="center" justify="flex-end">
        <Text width="10%" size="15px" style={{ marginRight: 50 }}>
          <b>Mark: </b>
          {question.mark}
        </Text>
      </Container>
      <Container direction="row" width="850px" justify="space-between">
        <Text width="15%" size="17px">
          <b>Question {count + 1} :</b>
        </Text>
        <Text width="90%" size="17px">
          {question.title}
        </Text>
      </Container>
      <Container direction="row" align="flex-end" justify="space-between">
        {question['qtype'] == 'mcq' && (
          <Container width="90%">
            <ol>
              <li
                style={{
                  display: 'flex',
                  height: '25px',
                  fontSize: '17px',
                }}
              >
                <input
                  type="radio"
                  id="answer"
                  name="answer"
                  checked={isChecked(question.options[0]._id)}
                  onChange={() => onAnswerSelect(question.options[0]._id)}
                />
                <label id="answer" name="answer">
                  {question.options[0].option}
                </label>
              </li>
              <li style={{ display: 'flex', height: '25px', fontSize: '17px' }}>
                <input
                  type="radio"
                  id="answer"
                  name="answer"
                  checked={isChecked(question.options[1]._id)}
                  onChange={() => onAnswerSelect(question.options[1]._id)}
                />
                <label id="answer" name="answer">
                  {question.options[1].option}
                </label>
              </li>
              <li style={{ display: 'flex', height: '25px', fontSize: '17px' }}>
                <input
                  type="radio"
                  id="answer"
                  name="answer"
                  checked={isChecked(question.options[2]._id)}
                  onChange={() => onAnswerSelect(question.options[2]._id)}
                />
                <label id="answer" name="answer">
                  {question.options[2].option}
                </label>
              </li>
              <li style={{ display: 'flex', height: '25px', fontSize: '17px' }}>
                <input
                  type="radio"
                  id="answer"
                  name="answer"
                  checked={isChecked(question.options[3]._id)}
                  onChange={() => onAnswerSelect(question.options[3]._id)}
                />
                <label id="answer" name="answer">
                  {question.options[3].option}
                </label>
              </li>
            </ol>
          </Container>
        )}
        {question['qtype'] == 'fb' && (
          <Container>
            <input
              type="text"
              name="answer"
              value={newInput}
              onChange={(e) => setNewInput(e.target.value)}
              placeholder="Type answer here.."
              style={{
                padding: 10,
                height: 20,
                width: 400,
              }}
            />
          </Container>
        )}
        {question['qtype'] == 'descriptive' && (
          <Container>
            <textarea
              value={newInput}
              onChange={(e) => setNewInput(e.target.value)}
              style={{
                height: '40vh',
                width: '80%',
              }}
              name="answer"
              placeholder="Type Answer Here..."
            />
          </Container>
        )}
        {question['qtype'] == 'code' && (
          <Container direction="column">
            <select
              value={lang}
              style={{
                width: '70%',
                margin: 10,
                padding: '10px',
                fontSize: 16,
              }}
              onChange={(e) => {
                setLang(e.target.value)
              }}
            >
              <option value="abap">Language: abap</option>
              <option value="aes">Language: aes</option>
              <option value="apex">Language: apex</option>
              <option value="azcli">Language: azcli</option>
              <option value="bat">Language: bat</option>
              <option value="bicep">Language: bicep</option>
              <option value="brainfuck">Language: brainfuck</option>
              <option value="c">Language: c</option>
              <option value="cameligo">Language: cameligo</option>
              <option value="clike">Language: clike</option>
              <option value="clojure">Language: clojure</option>
              <option value="coffeescript">Language: coffeescript</option>
              <option value="cpp">Language: cpp</option>
              <option value="csharp">Language: csharp</option>
              <option value="csp">Language: csp</option>
              <option value="css">Language: css</option>
              <option value="dart">Language: dart</option>
              <option value="dockerfile">Language: dockerfile</option>
              <option value="ecl">Language: ecl</option>
              <option value="elixir">Language: elixir</option>
              <option value="erlang">Language: erlang</option>
              <option value="flow9">Language: flow9</option>
              <option value="freemarker2">Language: freemarker2</option>
              <option value="fsharp">Language: fsharp</option>
              <option value="go">Language: go</option>
              <option value="graphql">Language: graphql</option>
              <option value="handlebars">Language: handlebars</option>
              <option value="hcl">Language: hcl</option>
              <option value="html">Language: html</option>
              <option value="ini">Language: ini</option>
              <option value="java">Language: java</option>
              <option value="javascript">Language: javascript</option>
              <option value="json">Language: json</option>
              <option value="jsx">Language: jsx</option>
              <option value="julia">Language: julia</option>
              <option value="kotlin">Language: kotlin</option>
              <option value="less">Language: less</option>
              <option value="lex">Language: lex</option>
              <option value="lexon">Language: lexon</option>
              <option value="liquid">Language: liquid</option>
              <option value="livescript">Language: livescript</option>
              <option value="lua">Language: lua</option>
              <option value="m3">Language: m3</option>
              <option value="markdown">Language: markdown</option>
              <option value="mips">Language: mips</option>
              <option value="msdax">Language: msdax</option>
              <option value="mysql">Language: mysql</option>
              <option value="nginx">Language: nginx</option>
              <option value="objective-c">Language: objective-c</option>
              <option value="pascal">Language: pascal</option>
              <option value="pascaligo">Language: pascaligo</option>
              <option value="perl">Language: perl</option>
              <option value="pgsql">Language: pgsql</option>
              <option value="php">Language: php</option>
              <option value="pla">Language: pla</option>
              <option value="plaintext">Language: plaintext</option>
              <option value="postiats">Language: postiats</option>
              <option value="powerquery">Language: powerquery</option>
              <option value="powershell">Language: powershell</option>
              <option value="proto">Language: proto</option>
              <option value="pug">Language: pug</option>
              <option value="python">Language: python</option>
              <option value="qsharp">Language: qsharp</option>
              <option value="r">Language: r</option>
              <option value="razor">Language: razor</option>
              <option value="redis">Language: redis</option>
              <option value="redshift">Language: redshift</option>
              <option value="restructuredtext">
                Language: restructuredtext
              </option>
              <option value="ruby">Language: ruby</option>
              <option value="rust">Language: rust</option>
              <option value="sb">Language: sb</option>
              <option value="scala">Language: scala</option>
              <option value="scheme">Language: scheme</option>
              <option value="scss">Language: scss</option>
              <option value="shell">Language: shell</option>
              <option value="sol">Language: sol</option>
              <option value="sparql">Language: sparql</option>
              <option value="sql">Language: sql</option>
              <option value="st">Language: st</option>
              <option value="stylus">Language: stylus</option>
              <option value="swift">Language: swift</option>
              <option value="systemverilog">Language: systemverilog</option>
              <option value="tcl">Language: tcl</option>
              <option value="toml">Language: toml</option>
              <option value="tsx">Language: tsx</option>
              <option value="twig">Language: twig</option>
              <option value="typescript">Language: typescript</option>
              <option value="vb">Language: vb</option>
              <option value="vbscript">Language: vbscript</option>
              <option value="verilog">Language: verilog</option>
              <option value="vue">Language: vue</option>
              <option value="xml">Language: xml</option>
              <option value="yaml">Language: yaml</option>
            </select>
            <CodeEditor
              value={newInput}
              language={lang}
              placeholder={`Please enter ${lang} code.`}
              onChange={(evn) => setNewInput(evn.target.value)}
              padding={15}
              data-color-mode="dark"
              style={{
                fontSize: 16,
                height: '40vh',
                width: '80%',
                backgroundColor: '#f5f5f5',
                fontFamily:
                  'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              }}
            />
          </Container>
        )}
      </Container>
      {question['qtype'] != 'mcq' && (
        <Container>
          <button style={{ padding: 10, marginTop: 10 }} onClick={onAnswerType}>
            Save Answer
          </button>
        </Container>
      )}
    </Container>
  )
}

export default Question
