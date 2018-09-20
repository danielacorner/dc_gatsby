import React, { Component } from "react";
import styled from "styled-components";

const ContactForm = styled.div`
  h2 {
    margin: 0 auto;
    padding: 20px;
    color: #ffca2d;
    font-family: "Oxygen Mono", monospace;
    align-self: end;
    opacity: 0;
  }
  &.contactVisible {
    h2 {
      animation: transitionDown 0.5s, fadeIn 0.5s;
      opacity: 1;
    }
  }
`;
export default class Contact extends Component {
  render() {
    return (
      <ContactForm id="contactForm">
        <h2>Get in touch!</h2>
      </ContactForm>
    );
  }
}
