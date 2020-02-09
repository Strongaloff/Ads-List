import React, { Component } from "react";
import Carousel from "react-material-ui-carousel";
import { Modal } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = {
  root: {
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
  },
};

function getModalStyle() {
  return {
    top: "50%",
    margin: "auto",
    left: "50%",
    marginTop: "100px",
    width: "1280px",
    height: "720px"
  };
}

export default withStyles(useStyles)(
  class ImageCarousel extends Component {
    render() {
      const { classes, images } = this.props;
      return (
        <Modal {...this.props}>
          <div className={classes.root} style={getModalStyle()}>
            <Carousel
              className={classes.centerImage}
              autoPlay={false}
              animation="fade"
            >
              {images.map((image, index) => {
                return (
                  <img className={classes.imgOutline} width="1280px" height="720px" src={image} alt="Error" />
                );
              })}
            </Carousel>
          </div>
        </Modal>
      );
    }
  }
);
