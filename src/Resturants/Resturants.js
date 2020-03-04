import axios from "axios";
import Input from "@material-ui/core/Input";
import ResturantCard from "./ResturantCard";
import FormControl from "@material-ui/core/FormControl";
import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

export default class Resturants extends Component {
  constructor() {
    super();
    this.state = {
      resturants: "",
      original: "",
      search: "",
      countries: "",
      country: ""
    };
  }

  handleChangeDropDown = (e) => {
    let filterResturantsByYear = this.state.resturants.filter((ele) =>
      ele.TopTen.includes(e.target.value)
    );

    if (e.target.value !== "") {
      this.setState({
        resturants: filterResturantsByYear
      });
    } else {
      this.setState({ resturants: this.state.original });
    }
  };
  handleSearch = (e) => {
    console.log(e.target.value);
    this.setState({ search: e.target.value });

    if (this.state.search !== "") {
      let filterResturants = this.state.resturants.filter((ele) =>
        ele.Brand.toLowerCase().includes(e.target.value)
      );

      if (filterResturants) {
        this.setState({
          resturants: filterResturants
        });
      }
      if (e.target.value.length === 0) {
        this.setState({ resturants: this.state.original });
      }
    }
  };

  handleCountry = (e) => {
    console.log(e.target.value);
    this.setState({ resturants: this.state.original });

    if (e.target.value !== "") {
      let filterResturantsByCountry = this.state.resturants.filter(
        (ele) => ele.Country == e.target.value
      );

      if (filterResturantsByCountry) {
        this.setState({
          resturants: filterResturantsByCountry
        });
      }
    } else {
      this.setState({ resturants: this.state.original });
    }
  };
  componentDidMount() {
    axios.get("http://starlord.hackerearth.com/TopRamen").then((response) => {
      const resturants = JSON.parse(
        JSON.stringify(response.data).replace(/\s(?=\w+":)/g, "")
      );
      let countries = resturants.map((ele) => ele.Country);
      countries = [...new Set(countries)];
      this.setState({ resturants, original: resturants, countries });
    });
  }
  render() {
    console.log(this.state.resturants);
    return (
      <div>
        <img
          src="https://i.ya-webdesign.com/images/bowl-of-ramen-png-1.png"
          width="100"
        ></img>
        <h1>Top Ramen Resturants</h1>

        <br />
        <Input
          placeholder="Search Resturants"
          variant="outlined"
          type="search"
          onChange={this.handleSearch}
          value={this.state.search}
        />
        <br />
        <FormControl style={{ margin: 1, minWidth: 190 }}>
          <InputLabel htmlFor="grouped-select">Years</InputLabel>
          <Select
            defaultValue=""
            name="priority"
            input={<Input id="grouped-select" />}
            onClick={this.handleChangeDropDown}
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
        {this.state.original !== "" && (
          <FormControl style={{ margin: 1, minWidth: 190 }}>
            <InputLabel htmlFor="grouped-select">Country</InputLabel>
            <Select
              defaultValue=""
              name="priority"
              input={<Input id="grouped-select" />}
              onClick={this.handleCountry}
            >
              <MenuItem value="">Select</MenuItem>
              {this.state.countries.map((country) => {
                return <MenuItem value={`${country}`}>{country}</MenuItem>;
              })}
            </Select>
          </FormControl>
        )}
        {this.state.resturants !== "" &&
          this.state.resturants.map((ele, i) => {
            return <ResturantCard resturants={ele} key={i} />;
          })}
      </div>
    );
  }
}
