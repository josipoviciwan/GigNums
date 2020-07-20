import React from "react";
import { connect } from "react-redux";
import { CSVLink } from "react-csv";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../index";
const headers = [
  { label: "Date", key: "date" },
  { label: "Profit", key: "profit" },
  { label: "Band Name", key: "band" }
];

const DownloadGigs = props => {
  if (props.gigs) {
    let data = props.gigs.map(o => {
      let { date, band, profit } = o;
      return {
        date: date
          .toDate()
          .toLocaleDateString("hr-HR")
          .replace(/\s/g, ""),
        band,
        profit
      };
    });

    return (
      <CSVLink
        data={data}
        headers={headers}
        separator={";"}
        filename={"my-gigs.csv"}
        target="_blank"
        enclosingCharacter={``}
        className="btn btn-secondary"
      >
        <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
      </CSVLink>
    );
  } else return <div>Loading links...</div>;
};

const mapStateToProps = state => {
  return {
    gigs: state.firestore.ordered.gigs
  };
};

export default connect(mapStateToProps)(DownloadGigs);
