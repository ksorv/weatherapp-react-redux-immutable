import React from "react";
import "./App.css";
import { connect } from "react-redux";
import Plot from "react-plotly.js";
import { toJS } from "immutable";

import {
  changeLocation,
  fetchData,
  setSelectedDate,
  setSelectedTemp
} from "./Store/actions";

export class App extends React.Component {
  fetchData = evt => {
    evt.preventDefault();

    var location = encodeURIComponent(this.props.redux.get("location"));

    var urlPrefix = "http://api.openweathermap.org/data/2.5/forecast?q=";
    var urlSuffix = "&APPID=448fecc9c76929751cc27c9ae298fde6&units=metric";
    var url = urlPrefix + location + urlSuffix;

    this.props.dispatch(fetchData(url));
  };

  onPlotClick = data => {
    if (data.points) {
      var number = data.points[0].pointNumber;
      this.props.dispatch(
        setSelectedDate(this.props.redux.getIn(["dates", number]))
      );
      this.props.dispatch(
        setSelectedTemp(this.props.redux.getIn(["temps", number]))
      );
    }
  };

  changeLocation = evt => {
    this.props.dispatch(changeLocation(evt.target.value));
  };

  render() {
    var currentTemp = "not loaded yet";
    if (this.props.redux.getIn(["data", "list"])) {
      currentTemp = this.props.redux.getIn([
        "data",
        "list",
        "0",
        "main",
        "temp"
      ]);
    }
    return (
      <div>
        <h1>Weather</h1>
        <form onSubmit={this.fetchData}>
          <label>
            City, Country
            <input
              placeholder={"City, Country"}
              type='text'
              value={this.props.redux.get("location")}
              onChange={this.changeLocation}
            />
          </label>
        </form>
        {/*
          Render the current temperature and the forecast if we have data
          otherwise return null
        */}

        {/* Render the current temperature if no specific date is selected */}
        {this.props.redux.getIn(["data", "list"]) ? (
          <center className='plot'>
            {/* Render the current temperature if no specific date is selected */}
            {this.props.redux.getIn(["selected", "temp"]) ? (
              <p>
                The temperature on{" "}
                {this.props.redux.getIn(["selected", "date"])} will be{" "}
                {this.props.redux.getIn(["selected", "temp"])}°C
              </p>
            ) : (
              <p>The current temperature is {currentTemp}°C!</p>
            )}
            <h2>Forecast</h2>
            <Plot
              data={[
                {
                  x: this.props.redux.get("dates").toJS(),
                  y: this.props.redux.get("temps").toJS(),
                  type: "scatter"
                }
              ]}
              config={{ displayModeBar: false }}
              onClick={this.onPlotClick}
              layout={{
                margin: {
                  t: 0,
                  r: 0,
                  l: 30
                },
                xaxis: {
                  gridcolor: "transparent"
                }
              }}
            />
          </center>
        ) : null}
      </div>
    );
  }
}

// Since we want to have the entire state anyway, we can simply return it as is!
function mapStateToProps(state) {
  return {
    redux: state
  };
}

export default connect(mapStateToProps)(App);
