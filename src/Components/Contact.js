import React, { Component } from 'react';

class Contact extends Component {
  render() {

    if(this.props.data){
      var name = this.props.data.name;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone= this.props.data.phone;
      var email = this.props.data.email;
      var message = this.props.data.contactmessage;
    }

    return (
      <section id="contact">
        <h4>Get in Touch</h4>
        <p className="address row">
          <div>
            {email}
            <br />
            <span>{phone}</span>
            {street} <br />
            {city}, {state}
            <br />
          </div>
        </p>
      </section>
    );
  }
}

export default Contact;
