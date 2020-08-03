import React from 'react';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      generic: {
        loading: false,
        data: null,
        error: null,
      }
    }
  }
  componentDidMount() {
    this.setState({
      generic: {
        ...this.state.generic.data,
        data: [{
          name: 'Metformin',
          id: '1'
        }, {
          name: 'Gen1',
          id: '2'
        }]
      }
    });
  }
  render() {
    return (
      <div className="row">
        { (this.state.generic.data !== null && this.state.generic.data.length > 0) &&
          this.state.generic.data.map((generic, i) => (
            <div key={i} className="col-md-4">
              <div class="card" style={{width: '18rem'}}>
                <img src="..." class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">{generic.name}</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
              <a href={`${this.props.match.path}/${generic.id}`} className="stretched-link" />
            </div>
          ))          
        }
      </div>
    )
  }
}

export default List;
