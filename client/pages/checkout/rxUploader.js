import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Container from '../../components/layouts/container';
import CbContainer from '../../ui/classBase/cbContainer';
import { BsBtnPrimary } from '../../ui/bootstrap/bsButton';
import { CbH6 } from '../../ui/classBase/cbHeader';
import SmallText from '../../ui/smallText';
import { ImageThumbnail1 } from '../../ui/image';

// utils
import { alertError } from '../../utils/alert'

// misc
import {
  SET_RX_UPLOAD_REQUIRED_TRUE,
  SET_RX_UPLOAD_REQUIRED_FALSE,
  SET_RX_UPLOAD_FILES_UPDATED,

  RX_UPLOAD_FILE_LOADING,
  RX_UPLOAD_FILE_SUCCESS,
  RX_UPLOAD_FILE_ERROR,

  RX_REMOVE_UPLOAD_FILE_LOADING,
  RX_REMOVE_UPLOAD_FILE_SUCCESS,
  RX_REMOVE_UPLOAD_FILE_ERROR,
} from '../../../redux/actions/checkout';

import {
  main,
} from '../../../model/main';
import {
  removePrescriptionCheckout,
} from '../../../model/checkout';
import {
  prescriptionForCheckout,
} from '../../../file_uploader/mercury';

const ListContainer = styled.ul`
  overflow-x: auto;
  white-space: nowrap;
  li {
    list-style-type: none;
    display: inline-block;
    text-align: center;
    margin-right: 10px;
  }
`;

class RxUploader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: []
    };

    this.nodeRxFile = null;
    this.uploadBegin = this.uploadBegin.bind(this);
    this.removeUploadFile = this.removeUploadFile.bind(this);
  }
  uploadBegin(file) {
    this.props.dispatch({ type: RX_UPLOAD_FILE_LOADING });
    if (
      // check file-type
      file.type === 'image/jpeg' ||
      file.type === 'image/png'
    ) {
      const formData = new FormData();
      formData.append('prescription', file);

      prescriptionForCheckout(formData)
      .then(result => {
        this.props.dispatch({ type: RX_UPLOAD_FILE_SUCCESS, data: result.data });
      })
      .catch(err => {
        alertError(err);
        this.props.dispatch({ type: RX_UPLOAD_FILE_ERROR, error: err });
      });
    } else {
      alert('Invalid file, Please upload JPEG or PNG file only.');
    }
  }
  removeUploadFile(id) {
    this.props.dispatch({ type: RX_REMOVE_UPLOAD_FILE_LOADING });
    removePrescriptionCheckout(id)
    .then(result => this.props.dispatch({ type: RX_REMOVE_UPLOAD_FILE_SUCCESS, data: result.data }))
    .catch(err => this.props.dispatch({ type: RX_REMOVE_UPLOAD_FILE_ERROR, error: err }));
  }
  componentWillUnmount() {
    this.props.unloadRxUploadRequired();
  }
  componentDidMount() {
    this.props.setRxUploadRequired();
  }
  render() {
    return (
      <div className="card">
        <CbContainer 
          applyBgPrimary
          className="card-header"
        >
          <CbH6 className="text-white" noMargin>Prescription Upload</CbH6>
        </CbContainer>
        <div className="card-body">
          <div className="d-block">
            <div className="d-block">
              <ListContainer>
                { this.props.checkout.rxUpload.files.map(({id, name, thumbnail}, i) => (
                    <li key={i}>
                      <ImageThumbnail1 
                        src={thumbnail}
                      />
                      <br />
                      <br />
                      <BsBtnPrimary 
                        className="btn btn-sm"
                        type="button"
                        onClick={e => {
                          this.removeUploadFile(id);
                          let reMapRxFiles = this.props.checkout.rxUpload.files.reduce((list, item) => {
                            if (item.id === id) {
                              return list;
                            }
                            return [
                              ...list,
                              item,
                            ];
                          }, []);
                          this.props.dispatch({ type: SET_RX_UPLOAD_FILES_UPDATED, data: reMapRxFiles });
                        }}
                        disabled={this.props.checkout.fileUploader.loading}
                      >
                        Remove
                      </BsBtnPrimary>
                    </li>
                  ))
                }
              </ListContainer>
            </div>
            <div className="d-block" align="right">
              <input 
                type="file" 
                className="custom-file-input"
                id="file-rx"
                style={{display: 'none'}}
                ref={node => this.nodeRxFile = node}
                onChange={e => {
                  const { files } = e.target;

                  if (files[0] && !this.props.checkout.fileUploader.loading) {
                    this.uploadBegin(files[0]);
                  }
                }}
                onClick={e => $(e.target).val('')}
                accept=".jpg, .jpeg, .png"
              />
              <BsBtnPrimary 
                className="btn btn-sm"
                onClick={e => {
                  $("#file-rx").trigger("click");
                }}
                disabled={this.props.checkout.fileUploader.loading}
              >
                Upload Prescription
              </BsBtnPrimary>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// redux
const mapStateToProps = state => ({
  checkout: state.checkout,
});

const mapDispatchToProps = dispatch => ({
  setRxUploadRequired: () => dispatch({ type: SET_RX_UPLOAD_REQUIRED_TRUE }),
  unloadRxUploadRequired: () => dispatch({ type: SET_RX_UPLOAD_REQUIRED_FALSE }),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(RxUploader);