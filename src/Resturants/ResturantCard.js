import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";


function ResturantCard(props) {
  return (
    <div align="center">
      <br />
    
      <div>
        <Card
          style={{
            width: 500,
            background:
              Number(props.resturants.Stars) === 5 ? "#f0f0f0" : "grey",
            color: Number(props.resturants.Stars) === 5 ? "black" : "white"
          }}
        >
          <CardContent>
            <Typography variant="body2" component="p" align="left">
              Brand:{props.resturants.Brand}
              <br />
              Variety:{props.resturants.Variety}
              <br />
              Style:
              {props.resturants.Style}
              <br />
              Country:{props.resturants.Country}
              <br />
              {props.resturants.TopTen === "NaN"
                ? "Not ranked Yet"
                : props.resturants.TopTen.split("#").join("-Rank:")}
              <br />
              <Rating
                name="half-rating"
                defaultValue={
                  isNaN(Number(props.resturants.Stars))
                    ? 0
                    : Number(props.resturants.Stars)
                }
                precision={0.5}
                readOnly
              />
              <br />
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ResturantCard;
