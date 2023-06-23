import React, { useState } from 'react'
import HeadFoot from '../components/headerfooter'
import { Container, Text, Input, Button } from '../styled'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { signUp } from '../redux/actions/user'

const useStyles = makeStyles((theme) => ({
  paper: {
    height: '70vh',
    minHeight: '300px',
    width: '30vw',
    minWidth: '300px',
  },

  textareadiv: {
    height: '70px',
    width: '80%',
    margin: '10px 0px',
  },
  textarea: {
    background: '#dcdcdc',
    border: '1px solid #000000',
    boxSizing: 'border-box',
    borderRadius: '2px',
    padding: '5px',
    width: '100%',
    height: '70px',
  },
}))

const SignUp = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [details, setDetails] = useState({
    usertype: 'candidate',
  })
  const onchange = (e) => {
    const { name, value } = e.target
    console.log({ name, value })
    setDetails({ ...details, [name]: value })
  }
  const onsubmit = (e) => {
    e.preventDefault()
    if (details['password'] === details['confirmpassword'])
      dispatch(signUp(details))
  }
  console.log({ one: 'one', details })
  return (
    <HeadFoot>
      <Container justify="center" align="center" height="100%">
        <Paper className={classes.paper} elevation={3}>
          <Container justify="center" align="center">
            <Text size="20px">Sign Up</Text>
          </Container>
          <form onSubmit={onsubmit}>
            <Container direction="column" align="center">
              <Container direction="row" flex align="center" justify="center">
                <label htmlFor="usertype">Type</label>
                <select
                  id="usertype"
                  style={{
                    padding: '6px 10px',
                    marginLeft: '5px',
                  }}
                  name="usertype"
                  value={details['usertype'] || 'candidate'}
                  onChange={onchange}
                >
                  <option value="candidate">Candidate</option>
                  <option value="company">Company</option>
                </select>
              </Container>
              <Input
                margin="10px 0px"
                type="text"
                width="80%"
                height="40px"
                name="name"
                placeholder="Name"
                value={details['name'] || ''}
                onChange={onchange}
                maxLength={30}
                required
              />
              <Input
                margin="10px 0px"
                height="40px"
                type="email"
                name="email"
                width="80%"
                value={details['email'] || ''}
                onChange={onchange}
                placeholder="Email"
                required
              />
              <div className={classes.textareadiv}>
                <textarea
                  className={classes.textarea}
                  placeholder="About Yourself"
                  name="userinfo"
                  value={details['userinfo'] || ''}
                  onChange={onchange}
                  required
                ></textarea>
              </div>
              <Input
                margin="10px 0px"
                height="40px"
                type="password"
                name="password"
                width="80%"
                value={details['password'] || ''}
                onChange={onchange}
                placeholder="Password"
                minLength={6}
                required
              />
              <Input
                margin="10px 0px"
                height="40px"
                type="password"
                name="confirmpassword"
                width="80%"
                placeholder="Confirm Password"
                value={details['confirmpassword'] || ''}
                onChange={onchange}
                minLength={6}
                required
              />
              <Container width="80%" justify="flex-end">
                <Button height="35px" width="100px" type="submit">
                  Sign Up
                </Button>
              </Container>
            </Container>
          </form>
        </Paper>
      </Container>
    </HeadFoot>
  )
}

export default SignUp
