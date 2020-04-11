import React from "react";

class Data extends React.Component {
  state = {date: new Date()}

  
  render() {
    return (
      <div>
        <p id="clock">{("0" + this.state.date.getHours()).slice(-2) + ":" + ("0" + this.state.date.getMinutes()).slice(-2)}</p>
        <p id="date">{this.state.date.toDateString()}</p>
        
      </div>
    );

    
  }
}

export default Data;