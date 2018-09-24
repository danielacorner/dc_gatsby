import React, { Component } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/SendRounded";

const ContactForm = styled.div`
  --darkgrey: rgba(255, 255, 255, 0.06);
  --lightgrey: rgba(255, 255, 255, 0.6);
  --lightestgrey: rgba(255, 255, 255, 0.5);
  width: 80%;
  max-width: 800px;
  margin: auto;
  justify-self: center;
  @media (max-width: 435px) {
    margin: auto 0;
    width: 100%;
  }
  border-radius: 4px;

  display: grid;
  background: var(--darkgrey);
  box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
    0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2);
  h2 {
    margin: 0 auto;
    padding: 20px;
    color: #ffca2d;
    font-family: "Oxygen Mono", monospace;
    align-self: end;
    @media (max-width: 435px) {
      font-size: 20px;
    }
  }
  form {
    border-radius: 4px;
    margin: 0 40px 10px 40px;
    padding: 5px 20px 20px 20px;
    display: grid;
    grid-auto-flow: row;
    background: var(--lightgrey);
    * {
      margin: 0;
    }
    .textField div {
      background: var(--lightestgrey);
      padding: 0;
    }
    label {
      color: black;
    }
  }
  button {
    pointer-events: auto;
    border: none;
    font-size: 17px;
    background: rgb(6, 140, 251);
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    text-transform: uppercase;
    text-align: center;
    padding: 0;
    border-radius: 4px;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-size: 14px;
    border-radius: 4px;
    width: 200px;
    margin: 10px auto 20px auto;
    background: rgba(255, 255, 255, 0.6);
    display: grid;
    place-items: center center;
    box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
      0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2);
    svg {
      fill: rgba(255, 255, 255, 0.6);
      height: 24px;
      margin-bottom: 0;
    }
    &:hover {
      background: rgb(6, 140, 251, 0.7);
    }
    &.sent {
      background: rgba(255, 255, 255, 0.125);
      color: rgba(0, 0, 0, 0.6);
    }
    .jss72 {
      display: none;
    }
    &:first-child {
      display: grid;
      grid-auto-flow: column;
      place-items: center stretch;
    }
  }
`;

export default class Contact extends Component {
  state = {
    name: "",
    email: "",
    message: "",
    formSubmitted: false,
    emailSent: false,
  };

  handleSubmit = event => {
    event.preventDefault();

    (function() {
      window.emailjs.init("user_Q33dPgBWZuQnRTaTJfkVq");
    })();

    const receiverEmail = "danielcorner7@gmail.com",
      template_id = "danielcornerportfolio";

    this.sendEmail(
      template_id,
      this.state.email,
      this.state.name,
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

  sendEmail = (templateId, senderEmail, senderName, receiverEmail, message) => {
    window.emailjs
      .send("gmail", templateId, {
        from_email: senderEmail,
        from_name: senderName,
        to_name: receiverEmail,
        message_html: message,
      })
      .then(res => {
        window.alert("Thanks for reaching out! 🎉");
        this.setState({ emailSent: true });
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => console.error("Failed to send email. Error: ", err));
  };

  render() {
    return (
      <ContactForm id="contactForm">
        <h2>✨ Get in touch! 🚀</h2>
        <form noValidate autoComplete="off">
          <TextField
            id="name"
            label="Name"
            className="textField"
            value={this.state.name}
            onChange={this.handleChange("name")}
            margin="normal"
            fullWidth={true}
            required={true}
          />
          <TextField
            id="email"
            label="Email"
            className="textField"
            value={this.state.email}
            onChange={this.handleChange("email")}
            margin="normal"
            fullWidth={true}
            required={true}
          />
          <TextField
            id="message"
            label="Message"
            multiline
            rows="10"
            className="textField textFieldMultiline"
            value={this.state.message}
            onChange={this.handleChange("message")}
            margin="normal"
            fullWidth={true}
            required={true}
          />
        </form>
        <Button
          id="sendButton"
          className={"sendButton " + (this.state.emailSent && "sent")}
          type="submit"
          disabled={this.state.emailSent}
          onClick={this.handleSubmit}
        >
          {!this.state.formSubmitted
            ? "Send"
            : !this.state.emailSent
              ? "Sending"
              : "Sent"}
          <SendIcon />
        </Button>
      </ContactForm>
    );
  }
}
