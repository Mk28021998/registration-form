// Write your JS code here
import './index.css'
import {Component} from 'react'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    showFirstNameError: false,
    showLastNameError: false,
    isFormSubmitted: false,
  }

  onChangeFirstName = event => {
    this.setState({firstName: event.target.value})
  }

  onChangeLastName = event => {
    this.setState({lastName: event.target.value})
  }

  onBlurFirstName = () => {
    const {firstName} = this.state
    const isValidFirstName = firstName === ''
    this.setState({showFirstNameError: isValidFirstName})
  }

  onBlurLastName = () => {
    const {lastName} = this.state
    const isValidLastName = lastName === ''
    this.setState({showLastNameError: isValidLastName})
  }

  submitForm = event => {
    event.preventDefault()
    const {firstName, lastName} = this.state
    const isValidFirstName = firstName !== ''
    const isValidLastName = lastName !== ''

    if (isValidFirstName && isValidLastName) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        showFirstNameError: !isValidFirstName,
        showLastNameError: !isValidLastName,
        isFormSubmitted: false,
      })
    }
  }

  onClickSubmitAnotherResponse = () => {
    this.setState(prevState => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      firstName: '',
      lastName: '',
    }))
  }

  renderRegistrationForm = () => {
    const {
      firstName,
      lastName,
      showFirstNameError,
      showLastNameError,
    } = this.state
    const className = showFirstNameError
      ? 'input-element error-field'
      : 'input-element'

    return (
      <form className="form-cont" onSubmit={this.submitForm}>
        <div className="input-cont">
          <label className="input-label" htmlFor="first name">
            FIRST NAME
          </label>
          <input
            className={className}
            placeholder="First name"
            id="first_name"
            value={firstName}
            onChange={this.onChangeFirstName}
            onBlur={this.onBlurFirstName}
          />
          {showFirstNameError && <p className="error-msg">Required</p>}
        </div>
        <div className="input-cont">
          <label className="input-label" htmlFor="last name">
            LAST NAME
          </label>
          <input
            className={className}
            placeholder="Last name"
            id="last_name"
            value={lastName}
            onChange={this.onChangeLastName}
            onBlur={this.onBlurLastName}
          />
          {showLastNameError && <p className="error-msg">Required</p>}
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    )
  }

  renderSubmitSuccess = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
      />
      <p className="success-text">Submitted Successfully</p>
      <button
        className="another-resp-btn"
        type="button"
        onClick={this.onClickSubmitAnotherResponse}
      >
        Submit Another Response
      </button>
    </>
  )

  render() {
    const {isFormSubmitted} = this.state
    // console.log(isFormSubmitted)
    return (
      <div className="registration-app">
        <h1 className="heading">Registration</h1>
        <div className="view-content">
          {isFormSubmitted
            ? this.renderSubmitSuccess()
            : this.renderRegistrationForm()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
