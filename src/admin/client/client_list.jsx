import React from "react";
import { connect } from "react-redux";
import "../../_assets/css/sass/visitor-review.scss";

import { default as dropdownSMSVG } from "../../_assets/images/dropdown-sm.svg";
import { history } from "../../_helpers";
import { default as accessProfileSVG } from "../../_assets/images/access-profile.svg";
import Modal from "react-bootstrap/Modal";
import { adminActions } from "../../_actions";
import { Link } from "react-router-dom";
class ClientList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedClient: '',
      password: '',
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.props.resetLocationData()
    this.fetchData();
  }

  fetchData() {
    this.props.fetchClientList();
  }
  handleClientStatus = async(clientId, event) => {
    try {
      if(!clientId || this.props.updateStatus) return;
      this.props.updateClientStatus({status:event.target.checked, clientId:clientId});
    } catch(err) {
        let message = (err && err.message) ? err.message : 'Something went wrong';
        errorToast(message);
    }
  }
  handleLocationAdd = async(clientId, event) => {
    try {
      if(!clientId || this.props.updateStatus) return;
      this.props.allowLocationADD({allowLocationAdd:event.target.checked, clientId:clientId});
    } catch(err) {
        let message = (err && err.message) ? err.message : 'Something went wrong';
        errorToast(message);
    }
  }
  openPasswordModal = (val) => {
    this.setState({isOpen: true, selectedClient: val._id, password: ''})
  }
  submitPassword = () => {
    console.log(this.state)
    this.props.resetClientPassword({
      client: this.state.selectedClient,
      password: this.state.password
    })
  }


  render() {
    console.log(this.props);
    const { fetchingClientList, clientList } = this.props;
    return (
      <div>
        <section className="visitor-review-holder">
          <div className="cstm-container">
            <div className="topbx-holder">
              <div className="row">
              <div className="col-md-6">
                  <div className="add-client-link">
                    <Link to="/admin/client-register">Add Client</Link>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="back-to-previous">
                    <Link to="/admin/dashboard">Back To Previous Page</Link>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="headingbx">
                    <div className="headcontbx">
                      <h1>Client List:</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tablebx-holder">
              <div className="table-inner">
                <div className="table-responsive">
                  <table className="table" width="100%" height="auto">
                    <thead>
                      <tr key="head">
                        <th className="name" key="name">
                          Email
                        </th>
                        <th className="name" key="status">
                          Status
                        </th>
                        <th className="name" key="locationAdd">
                          Allow location Add
                        </th>
                        <th className="comments" key="reason">
                          Created Date
                        </th>
                        <th className="actions" key="action">
                          {" "}
                          &nbsp;{" "}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {!fetchingClientList &&
                      clientList &&
                      clientList.length > 0 ? (
                        clientList.map((value, index) => (
                          <tr key={index}>
                            <td className="name" key="nameValue_{index}">
                              <div className="name-inner">
                                <h3>{value?.email}</h3>
                              </div>
                            </td>
                            <td className="name" key="statusValue_{index}">
                              <div className="status-inner togglebtn-holder">
                              <div className="btn-holder ynobtn-holder">
                                            <label className="switch">
                                                <input type="checkbox"
                                                name="userStatus"
                                                checked={value?.status}
                                                value={value?.status}
                                                disabled={this.props.updateStatus}
                                                onChange={(e) => this.handleClientStatus(value?._id, e)}
                                                 />
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                              </div>
                            </td>
                            <td className="name" key="allowLocationAddValue_{index}">
                              <div className="allowLocationAdd-inner togglebtn-holder">
                              <div className="btn-holder ynobtn-holder">
                                            <label className="switch">
                                                <input type="checkbox"
                                                name="allowLocationADD"
                                                checked={value?.allowLocationAdd}
                                                value={value?.allowLocationAdd}
                                                disabled={this.props.updateStatus}
                                                onChange={(e) => this.handleLocationAdd(value?._id, e)}
                                                 />
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                              </div>
                            </td>
                            <td className="name" key="reasonValue_{index}">
                              <div className="name-inner">
                                {value?.createdAt}
                              </div>
                            </td>

                            <td className="actions" key="actionFields_{index}">
                              <div className="filerdrop-holder">
                                <div className="dropdown">
                                  <a
                                    className="nav-link"
                                    href="#"
                                    id="nameDropdown2"
                                    role="button"
                                    data-display="static"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    <span className="dropbtn">
                                      <span className="icon">
                                        {" "}
                                        <img src={dropdownSMSVG} alt="" />{" "}
                                      </span>
                                    </span>
                                  </a>
                                  <div
                                    className="dropdown-menu dropdown-menu-lg-right"
                                    aria-labelledby="nameDropdown2"
                                  >
                                    <div className="smsdrop-holder">
                                      <div className="smsbody">
                                        <label htmlFor="setting-action">
                                          Profile Settings
                                        </label>
                                        <ul className="test,....">
                                          <li key="_sub1_{index}">
                                            <a
                                              className="btn"
                                              onClick={() =>
                                                history.push(
                                                  `/admin/client-location/${value._id}`
                                                )
                                              }
                                            >
                                              <span className="icon">
                                                {" "}
                                                <img
                                                  src={accessProfileSVG}
                                                  alt=""
                                                />{" "}
                                              </span>
                                              <span className="txbx">
                                                View Location
                                              </span>
                                            </a>
                                          </li>
                                          <li key="_sub2_{index}">
                                            <a
                                              className="btn"
                                              onClick={() => this.openPasswordModal(value)}
                                            >
                                              <span className="icon">
                                                {" "}
                                                <img
                                                  src={accessProfileSVG}
                                                  alt=""
                                                />{" "}
                                              </span>
                                              <span className="txbx">
                                                Set Password
                                              </span>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr className="txt-center">
                          {fetchingClientList && (
                            <td
                              key="loading"
                              className="text-center"
                              colSpan="6"
                            >
                              <h3>Loading....</h3>
                            </td>
                          )}
                          {!fetchingClientList && (
                            <td
                              key="no_value"
                              className="text-center"
                              colSpan="6"
                            >
                              <h3>No Visitor Found..</h3>
                            </td>
                          )}
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Modal
          onHide={() => this.setState({ isOpen: false })}
          show={this.state.isOpen}
          dialogClassName={"modal-dialog-centered"}
          contentClassName={"delete-modal-content"}
        >
          <div className="modal-header">
            <button
              type="button"
              className="close"
              onClick={() => this.setState({ isOpen: false })}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <h1 className="add-twilio-number">Set Password</h1>
            <div className="form-group">
              <input type="password" className="form-control"
                onChange={(e) =>  this.setState({ password: e.target.value })} />
            </div>
          </div>

          <div className="modal-footer">
            <button
              onClick={() => this.submitPassword()}
              disabled={this.state.password.length < 6}
              type="button"
              className="btn bluebtn"
            >
              Submit Now
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

function mapState(state) {
  const { adminAuthentication } = state.adminAuthentication;
  const { clientList, updateStatus } = state.adminClientlist;
  return { clientList, adminAuthentication, updateStatus };
}

const actionCreators = {
  resetClientPassword: adminActions.resetClientPassword,
  fetchClientList: adminActions.fetchClientList,
  updateClientStatus:adminActions.updateClientStatus,
  allowLocationADD:adminActions.allowLocationADD,
  resetLocationData: adminActions.resetLocationData
};

export default connect(mapState, actionCreators)(ClientList);
