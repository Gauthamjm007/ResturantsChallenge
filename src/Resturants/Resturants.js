import axios from "axios";
import Input from "@material-ui/core/Input";
import ResturantCard from "./ResturantCard";
import FormControl from "@material-ui/core/FormControl";
import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import * as Icon from "react-feather";
import Noodle from "./noodle";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class Resturants extends Component {
  constructor() {
    super();
    this.state = {
      resturants: "",
      search: "",
      year: "",
      country: "",
      countries: ""
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidMount() {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/starlord.hackerearth.com/TopRamen"
      )
      .then((response) => {
        const resturants = JSON.parse(
          JSON.stringify(response.data).replace(/\s(?=\w+":)/g, "")
        );

        let countries = [...new Set(resturants.map((ele) => ele.Country))];
        this.setState({ resturants, countries });
      });
  }
  render() {
    return (
      <div>
        <div
          align="right"
          style={{
            marginRight: "5rem",
            marginTop: "2rem",
            paddingBottom: "0rem"
          }}
        >
          <a href="https://github.com/Gauthamjm007/ResturantsChallenge">
            <Icon.GitHub size={30} />
          </a>
        </div>
        <Noodle />
        <h1>Top Ramen Resturants</h1>

        <br />
        <Input
          name="search"
          placeholder="Search Resturants"
          variant="outlined"
          type="search"
          onChange={this.handleChange}
          value={this.state.search}
        />
        <br />
        <FormControl style={{ margin: 1, minWidth: 190 }}>
          <InputLabel htmlFor="grouped-select">Years</InputLabel>
          <Select
            defaultValue=""
            name="year"
            input={<Input id="grouped-select" />}
            onClick={this.handleChange}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="2012">2012</MenuItem>
            <MenuItem value="2013">2013</MenuItem>
            <MenuItem value="2014">2014</MenuItem>
            <MenuItem value="2015">2015</MenuItem>
            <MenuItem value="2016">2016</MenuItem>
          </Select>
        </FormControl>
        <br />

        <FormControl style={{ margin: 1, minWidth: 190 }}>
          <InputLabel htmlFor="grouped-select">Country</InputLabel>
          <Select
            defaultValue=""
            name="country"
            input={<Input id="grouped-select" />}
            onClick={this.handleChange}
          >
            <MenuItem value="">Select</MenuItem>
            {this.state.resturants !== "" &&
              this.state.countries.map((country) => {
                return (
                  <MenuItem value={`${country}`} key={country}>
                    {country}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>

        {this.state.resturants !== "" ? (
          <div>
            {this.state.resturants
              .filter(
                (ele) =>
                  !ele.Brand.toLowerCase().indexOf(
                    this.state.search.toLowerCase()
                  )
              )
              .filter((country) => !country.Country.indexOf(this.state.country))
              .filter((year) => year.TopTen.includes(this.state.year))
              .map((ele, i) => {
                return <ResturantCard resturants={ele} key={i} />;
              })}
            ) <br />
          </div>
        ) : (
          <>
            <br />
            <br />
            <br />
            <CircularProgress />
          </>
        )}
      </div>
    );
  }
}
