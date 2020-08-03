import React from 'react';

class DateComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      day: '',
      month: '',
      year: '',
      date: '',
    }

    this.handlerOnChange= this.handlerOnChange.bind(this);
  }
  handlerOnChange(e) {
    const { name, value } = e.target;

    let readyState = {
      [name]: value,
      date: '',
    };

    this.setState(readyState, () => {
      if (
        this.state.day !== '' &&
        this.state.month !== '' &&
        this.state.year !== '' 
      ) {
        this.setState({
          date: `${this.state.month}-${this.state.day}-${this.state.year}`
        });
      }
    });
  }
  render() {
    return (
      <div className="form-row">
        <div id="datepicker"></div>
        <div className="col-md-2">
          <div className="form-group">
            <p>Birthday</p>
          </div>
        </div>
        <div className="col-md">
          <div className="form-group">
            <select
              className="form-control"
              id="month"
              name="month"
              onChange={this.handlerOnChange}
            >
              <option value="">Month</option>
              <option value='01'>Janaury</option>
              <option value='02'>February</option>
              <option value='03'>March</option>
              <option value='04'>April</option>
              <option value='05'>May</option>
              <option value='06'>June</option>
              <option value='07'>July</option>
              <option value='08'>August</option>
              <option value='09'>September</option>
              <option value='10'>October</option>
              <option value='11'>November</option>
              <option value='12'>December</option>
            </select>
          </div>
        </div>
        <div className="col-md">
          <div className="form-group">
            <select
              className="form-control"
              id="day"
              name="day"
              onChange={this.handlerOnChange}
            >
              <option value="">Day</option>
              { (() => {
                  let setCount = new Array(31).fill();
                  return setCount.map((item,i) => {
                    let setDaysNumber = `${Math.floor(i + 1)}`;
                    return <option key={i} value={setDaysNumber.padStart(2, '0')}>{setDaysNumber}</option>
                  })
                })()
              }
            </select>
          </div>
        </div>
        <div className="col-md">
          <div className="form-group">
            <select
              className="form-control"
              id="year"
              name="year"
              onChange={this.handlerOnChange}
            >
              <option value="">Year</option>
              { (() => {
                  let minOffset = 18, maxOffset = 150; // Change to whatever you want
                  let thisYear = (new Date()).getFullYear();

                  return new Array(maxOffset).fill()
                  .map((item, i) => {
                    let year = thisYear - i;
                    return <option key={i} value={`${year}`}>{year}</option>
                  });
                })()
              }
            </select>
          </div>
        </div>
      </div>
    )
  }
}

export default DateComponent;