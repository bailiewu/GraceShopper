import React, { useState } from 'react'
import { login } from '../../store/thunks'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleSubmit: (name: string, password: string) => dispatch(login({ name, password }))
  }
}

const Login = ({ handleSubmit, history }: { handleSubmit: any; history: any }) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const submitUser = (ev: any) => {
    ev.preventDefault()
    handleSubmit(userName, password)
      .then(() => console.log('logged in'))
      .then(() => history.push('/'))
      .catch((e: Error) => console.log(`Failed to log in.\n${e}`))
  }

  return (
    <div className="mt-5 d-flex justify-content-center">
      {error ? <div>There has been an error</div> : ''}
      <form onSubmit={submitUser} className="form-login align-self-center">
        <div className="d-flex justify-content-center">
          <input
            type="text"
            value={userName}
            onChange={ev => setUserName(ev.target.value)}
            className="form-control"
            placeholder="Username"
          />
        </div>
        <div className="d-flex justify-content-center mt-2">
          <input
            type="text"
            value={password}
            onChange={ev => setPassword(ev.target.value)}
            className="form-control"
            placeholder="Password"
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-raised btn-success btn-lg mt-5">
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default connect(
  null,
  mapDispatchToProps
)(Login)
