import React, { Component } from "react";
import { connect } from "react-redux";
import {
  faEdit,
  faTrashAlt,
  faCheck,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateGig, deleteGig } from "../../store/actions/gigActions";

class GigSummary extends Component {
  constructor(props) {
    super(props);
    let { date, band, profit, id } = props.gig;
    this.state = {
      date: new Date(date.seconds * 1000).toISOString().substr(0, 10),
      band,
      profit,
      edit: false,
      i: this.props.i,
      id: id
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleUpdate = e => {
    this.props.updateGig(
      {
        band: this.state.band,
        date: new Date(this.state.date),
        profit: parseInt(this.state.profit, 10)
      },
      this.state.id
    );
    this.handleEdit();
  };
  handleEdit = e => {
    this.setState({ edit: !this.state.edit });
  };
  handleDelete = e => {
    this.props.deleteGig(this.state.id);
  };
  handleDate = e => {
    this.setState({ date: e.target.value });
  };
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleCancel = e => {
    this.handleEdit();

    let { date, band, profit } = this.props.gig;
    this.setState({
      date: new Date(date.seconds * 1000).toISOString().substr(0, 10),
      band,
      profit
    });
  };
  render() {
    let { date, profit, band,  edit } = this.state;
    return edit ? (
      <tr className="justify-content-center">

        <td className="no-padding ">
          <div className="form-group  p-0 m-0">
            <input
              type="date"
              className="form-control text-center"
              id="date"
              ref={datum => (this.datum = datum)}
              value={date}
              onChange={this.handleDate}
            />
          </div>
        </td>
        <td className="no-padding  align-center">
          <input
            type="number"
            className="form-control  text-center "
            id="profit"
            ref={zarada => (this.zarada = zarada)}
            value={profit}
            onChange={this.handleChange}
          />
        </td>
        <td className=" no-padding">
          <input
            type="text"
            className="form-control  text-center "
            id="band"
            value={band}
            onChange={this.handleChange}
          />
        </td>
        <td className=" ">
          <FontAwesomeIcon icon={faCheck} onClick={this.handleUpdate} />
        </td>
        <td className=" ">
          <FontAwesomeIcon icon={faTimes} onClick={this.handleCancel} />
        </td>
      </tr>
    ) : (
      <tr className="justify-content-center">
        {/* <td>{i + 1}</td> */}
        <td>{new Date(this.state.date).toLocaleDateString()} </td>
        <td>{profit}</td>
        <td>{band}</td>
        <td>
          <FontAwesomeIcon icon={faEdit} onClick={this.handleEdit} />
        </td>
        <td>
          <FontAwesomeIcon icon={faTrashAlt} onClick={this.handleDelete} />
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateGig: (gig, id) => dispatch(updateGig(gig, id)),
    deleteGig: id => dispatch(deleteGig(id))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(GigSummary);
