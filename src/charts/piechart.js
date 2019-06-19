import React, { Component, Fragment } from "react";
import fire from "../config/firebase";
import { Link } from "react-router-dom";
import ChartComponent from "./ChartComponent";
import _ from "lodash";

class CustomPieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auther: [],
      charts: {
        donutChart: {
          paddingAngle: 5,
          innerRadius: 60
        }
      }
    };
  }

  UNSAFE_componentWillMount() {
    let abcd = {};
    let abce = [];
    let finalChartData = [];

    fire
      .database()
      .ref()
      .child("pages")
      .orderByKey()
      .once("value", snapshot => {
        let message = snapshot.val();
        let msg = Object.keys(message || {}).map(key => ({
          name: message[key].author,
          value: 1,
          status: message[key].status
        }));

        msg.forEach((d) => {
          if (!abcd[d.name]) {
            abcd[d.name] = 1;
          } else {
            abcd[d.name] = abcd[d.name] + 1;
          }
          abce[d.name] = { name: d.name, value: abcd[d.name] }
        });

        let count = 0;
        for (var key in abce) {
          finalChartData[count] = abce[key];
          count++;
        }

        // For category Map
        let category = _.countBy(msg, function (rec) {
          return rec.status === "published";
        });

        let catgoriesCount = [
          { name: "Published", value: category.true },
          { name: "On Hold", value: category.false }
        ];

        this.setState({ pages: finalChartData, category: catgoriesCount });
      });
  }

  render() {
    return (
      <Fragment>
        <Link style={{ float: "right", marginRight: "10px" }} to={"/showpages"}>
          Back
        </Link>
        <br />
        <div className="width-100">
          <div className="container-left">
            <label className="width-100" htmlFor="pieChart">
              <strong>Pie Chart (Author): </strong>
            </label>

            {this.state.pages ? (
              <ChartComponent pages={this.state.pages} />
            ) : null}
          </div>

          <div className="container-right">
            <label className="width-100" htmlFor="pieChart">
              <strong>Donut Chart (Categories): </strong>
            </label>

            <ChartComponent
              pages={this.state.category}
              elementConfig={this.state.charts.donutChart}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CustomPieChart;
