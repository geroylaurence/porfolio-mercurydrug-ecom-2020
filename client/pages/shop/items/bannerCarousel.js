import React from 'react';
import PropTypes from 'prop-types';

class BannerCarousel extends React.Component {
  constructor(props) {
    super(props);

    /* props */
    // banners -> image list, -> array object(imageFile, linkUrl)
    // id -> element marker -> string
  }
  componentDidMount() {
    $('.carousel').carousel({
      interval: 15000
    });
  }
  render() {
    return (
      <div id={`${this.props.id}`} className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          { this.props.banners.map((banner, i) => (
              <div key={i} className={`carousel-item ${(i === 0) && `active`}`}>
                <a href={banner.linkUrl} target='_blank'>
                  <img className="d-block w-100" src={banner.imageFile} alt="First slide" />
                </a>
              </div>
            ))
          }
        </div>
        <a className="carousel-control-prev" href={`#${this.props.id}`} role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href={`#${this.props.id}`} role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}

BannerCarousel.propTypes = {
  banners: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.string,
};

export default BannerCarousel;