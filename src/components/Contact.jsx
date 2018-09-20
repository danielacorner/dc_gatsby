import React, { Component } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import Icon from '@material-ui/core/Icon';

const ContactForm = styled.div`
    width: 80%;
    max-width: 800px;
    margin: auto;

    opacity: 0;
    display: grid;
    background: white;
    box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
    0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2);
  h2 {
    opacity: 0;
    margin: 0 auto;
    padding: 20px;
    color: #ffca2d;
    font-family: "Oxygen Mono", monospace;
    align-self: end;
  }
  form {
    margin: 10px 40px;
    padding: 20px;
    opacity: 0;
    background: grey;
    display: grid;
    grid-auto-flow: row;
    grid-gap: 15px;
    * {
      margin: 0;
      background: lightgrey;
    }
  }
  button {
    width: 50%;
    margin: 10px auto 20px auto;
  }
  &.contactVisible {
    animation: transitionDown 0.5s, fadeIn 0.5s;
    opacity: 1;
    * {
      animation: transitionDown 0.5s, fadeIn 0.5s;
      opacity: 1;
    }
  }
                    
`;


export default class Contact extends Component {
  state = {
    name: "",
    email: "",
    message: "",
    formSubmitted: false,
  };

  handleSubmit = event => {
    event.preventDefault();

    const receiverEmail = "adriannehlee@gmail.com",
      template = "adrianneportfolio";

    this.sendEmail(
      template,
      this.state.email,
      receiverEmail,
      this.state.message
    );

    this.setState({ formSubmitted: true });
  };

  // textarea
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendEmail = (templateId, senderEmail, receiverEmail, message) => {
    window.emailjs
      .send("gmail", templateId, {
        senderEmail,
        receiverEmail,
        message,
      })
      .then(res => {
        this.setState({ open: false });
        window.alert("Thanks for reaching out!");
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => console.error("Failed to send email. Error: ", err));
  };

  render() {
    return (
      <ContactForm id="contactForm">
        <h2>✨Get in touch!🚀</h2>
        <form noValidate autoComplete="off">
          <TextField id="name" label="Name" className="textField" value={this.state.name} onChange={this.handleChange("name")} margin="normal" fullWidth={true} required={true} />
          <TextField id="email" label="Email" className="textField" value={this.state.email} onChange={this.handleChange("email")} margin="normal" fullWidth={true} required={true} />
          <TextField id="message" label="Message" multiline rows="10" className="textFieldMultiline" value={this.state.message} onChange={this.handleChange("message")} margin="normal" fullWidth={true} required={true} />
        </form>
        <Button id="sendButton" variant="outlined" color="primary" className="sendButton" type="submit" onClick={this.handleSubmit}>
          {this.state.formSubmitted ? "Sending..." : "Send"}
        </Button>
      </ContactForm>)
  }
}
