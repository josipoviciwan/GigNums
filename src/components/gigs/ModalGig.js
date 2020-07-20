import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { createGig } from "../../store/actions/gigActions";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const customStyles = {
  overlay: { width: "100%" },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#303030",
    textAlign: "center",
    width: "100%",
    height:"auto"
  }
};

Modal.setAppElement("#root");

class CreateGigModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  submitForm(e) {
    e.preventDefault();

    let [date, profit, band] = e.target;
    this.props.createGig({
      profit: parseInt(profit.value, 10),
      band: band.value,
      date: new Date(date.value)
    });
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <button className="btn btn-secondary" onClick={this.openModal}>
          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button
            className="btn btn-danger float-right"
            onClick={this.closeModal}
          >
            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
          </button>

          <form
            onSubmit={this.submitForm}
            className="text-center mx-auto bg-dark rounded  mt-5 "
          >
            <h4 ref={title => (this.title = title)} className="">
              Add gig
            </h4>
            <div className="form-group">
              <label htmlFor="date">Date: </label>
              <input
                type="date"
                className="form-control"
                id="date"
                ref={date => (this.date = date)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="profit">Profit: </label>
              <input
                type="number"
                id="profit"
                className="form-control"
                ref={profit => (this.profit = profit)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="band">Band name:</label>
              <input
                type="text"
                id="band"
                className="form-control"
                ref={band => (this.band = band)}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Add gig
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createGig: gig => dispatch(createGig(gig))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateGigModal);
