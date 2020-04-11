import React from "react";

class DateNight extends React.Component {
  state = {date: new Date()}

  
  render() {
    return (
      <div>
        <p id="clockNight">{("0" + this.state.date.getHours()).slice(-2) + ":" + ("0" + this.state.date.getMinutes()).slice(-2)}</p>
        <p id="dateNight">{this.state.date.toDateString()}</p>
        
      </div>
    );

    
  }
}

export default DateNight;