import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend
// } from "recharts";
import { connect } from "react-redux";
import ReactApexChart from "react-apexcharts";
class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: "six_months",
      options: {
        theme: {
          mode: "dark"
        },
        chart: {
          background: "#303030"
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          bar: {
            columnWidth: "10",
            colors: {
              ranges: [
                {
                  from: 0,
                  to: 500,
                  color: "#343d99"
                },
                {
                  from: 501,
                  to: 1500,
                  color: "#90c1dc"
                },

                {
                  from: 1501,
                  to: 2500,
                  color: "#fdeea7"
                },

                {
                  from: 2501,
                  to: 3500,
                  color: "#f99255"
                },

                {
                  from: 3501,
                  to: 100000,
                  color: "#bc1d28"
                }
              ],
              backgroundBarColors: [],
              backgroundBarOpacity: 1
            }
          }
        },
        markers: {
          size: 0,
          style: "hollow"
        },
        xaxis: {
          type: "datetime",

          min: new Date().getTime() - 31556952000 / 2,
          max: new Date().getTime(),

          tickAmount: 6
        },
        tooltip: {
          theme: "dark",
          x: {
            format: "dd MMM yyyy"
          },
          y: {
            formatter: function(value) {
              return value + " kn";
            },
            title: {
              formatter: seriesName => "Profit: "
            }
          },
          marker: { show: false }
        },
        fill: {
          type: "gradient",
          color: "#EB3349",
          gradient: {
            // shadeIntensity: 0.5,
            opacityFrom: 0.9,
            opacityTo: 1,
            stops: [0, 100]
          }
        }
      },
      series: [{ data: [] }]
    };
  }

  updateData(timeline) {
    this.setState({
      selection: timeline
    });

    switch (timeline) {
      case "one_month":
        this.setState({
          options: {
            xaxis: {
              min: new Date().getTime() - 31556952000 / 12,
              max: new Date().getTime()
            }
          }
        });
        break;
      case "six_months":
        this.setState({
          options: {
            xaxis: {
              min: new Date().getTime() - 31556952000 / 2,
              max: new Date().getTime()
            }
          }
        });
        break;
      case "one_year":
        this.setState({
          options: {
            xaxis: {
              min: new Date().getTime() - 31556952000,
              max: new Date().getTime()
            }
          }
        });
        break;
      case "ytd":
        this.setState({
          options: {
            xaxis: {
              min: new Date("01 Jan " + new Date().getFullYear()).getTime(),
              max: new Date().getTime()
            }
          }
        });
        break;
      case "all":
        this.setState({
          options: {
            xaxis: {
              min: undefined,
              max: undefined
            }
          }
        });
        break;
      default:
    }
  }

  static getDerivedStateFromProps(props, state) {
    let { gigs } = props;

    let data = {};

    if (props.gigs) {
      gigs = gigs.map(gig => [gig.date.seconds * 1000, gig.profit]);
      for (let e of gigs) {
        let [time, profit] = e;

        if (!data[time]) data[time] = 0;
        data[time] += profit;
      }

      let temp = [];
      for (let [key, value] of Object.entries(data)) {
        temp.push([Number(key), value]);
      }

      return {
        series: [{ data: temp }]
      };
    }
    return {};
  }
  render() {
    return (
      <div id="chart">
        <div className="toolbar btn-group d-flex" role="group" >
          <button
            onClick={() => this.updateData("one_month")}
            id="one_month"
            type="button"
            className={
              this.state.selection === "one_month"
                ? "active btn btn-success  "
                : "btn btn-secondary  "
            }
          >
            1 month
          </button>
          <button
            onClick={() => this.updateData("six_months")}
            id="six_months"
            className={
              this.state.selection === "six_months"
                ? "active btn btn-secondary   "
                : " btn btn-secondary  "
            }
          >
            6 months
          </button>
          <button
            onClick={() => this.updateData("one_year")}
            id="one_year"
            className={
              this.state.selection === "one_year"
                ? "active btn btn-secondary  "
                : " btn btn-secondary  "
            }
          >
            1 year
          </button>
          <button
            onClick={() => this.updateData("ytd")}
            id="ytd"
            className={
              this.state.selection === "ytd"
                ? "active btn btn-secondary  "
                : " btn btn-secondary  "
            }
          >
            This year
          </button>
          <button
            onClick={() => this.updateData("all")}
            id="all"
            className={
              this.state.selection === "all"
                ? "active btn btn-secondary  "
                : " btn btn-secondary  "
            }
          >
            All
          </button>
        </div>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height="auto"
        />
        {/* line
area
bar
radar
histogram
pie
donut
radialBar
scatter
bubble
heatmap
candlestick */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    gigs: state.firestore.ordered.gigs
  };
};

export default connect(mapStateToProps)(Example);
