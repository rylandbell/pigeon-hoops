'use strict';

import React from 'react';

const NewMessageInput = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.sendMessage(this.props.enteredText);
  },
  render: function() {
    return (
      <form className="new-message-form" onSubmit={this.handleSubmit}>
        <textarea placeholder="Your Message" className="form-control" rows='3' value={this.props.enteredText} onChange={this.props.handleTextChange} onKeyPress={this.props.listenForEnter}/>
        <input className='btn btn-primary hidden' type='submit' value='Send' />
        <div className="small pull-right">Press enter to send</div>
        <div className="clearfix"></div>
      </form>
    )
  }
});

export default NewMessageInput;