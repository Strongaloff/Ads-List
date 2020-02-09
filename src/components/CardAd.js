import React, { Component } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ImageCarousel from "./ImageCarousel";

const useStyles = {
  root: {
    width: 350,
    marginLeft: "10px",
    marginTop: "40px"
  },
  rooms: {
    fontSize: 14,
    marginTop: "10px"
  },
  title: {
    marginTop: "10px",
    fontSize: 18
  },
  wordsDescription: {
    wordWrap: "break-word"
  }
};

export default withStyles(useStyles)(
  class CardAd extends Component {
    constructor(props) {
      super(props);

      this.state = {
        showCarousel: false
      };
    }

    render() {
      const {
        classes,
        title,
        price,
        phone,
        address,
        typeAp,
        description,
        images,
        deleteAd
      } = this.props;
      return (
        <>
          <Card className={classes.root}>
            <CardContent className={classes.wordsDescription}>
              <Typography className={classes.rooms} color="textSecondary">
                {typeAp} rooms
              </Typography>
              <Typography
                className={classes.title}
                variant="body"
                component="p"
              >
                {title}
              </Typography>
              <Typography className={classes.rooms}>{description}</Typography>
              <Typography className={classes.rooms}>
                Address: {address}
              </Typography>
              <Typography className={classes.rooms}>Price: {price}</Typography>
              <Typography className={classes.rooms}>Phone: {phone}</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => {
                  this.setState({
                    showCarousel: true
                  });
                }}
              >
                Show photos
              </Button>
              <Button size="small"
              onClick={deleteAd}>
                Delete ad
              </Button>
            </CardActions>
          </Card>
          <ImageCarousel
            open={this.state.showCarousel}
            onClose={() => {
              this.setState({
                showCarousel: false
              });
            }}
            images={images}
          />
        </>
      );
    }
  }
);
