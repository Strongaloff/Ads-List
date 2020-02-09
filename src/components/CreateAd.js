import React, { Component } from "react";
import { Modal, TextField, Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CardAd from "./CardAd";

const useStyles = {
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "white",
    border: "1px solid #000",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    padding: "24px"
  },
  textField: {
    marginBottom: "10px",
    marginTop: "10px"
  },
  cardDisplay: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
    marginLeft: "75px",
    marginTop: "30px"
  },
  input: {
    display: "none"
  },
  buttonsRow: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "15px"
  },
  errorMessage: {
    fontSize: "15px",
    color: "red",
    marginTop: "50px"
  }
};

function getModalStyle() {
  return {
    top: "50%",
    margin: "auto",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px"
  };
}

export default withStyles(useStyles)(
  class CreateAd extends Component {
    imageObj = [];
    imageArray = [];
    imageName = [];

    constructor(props) {
      super(props);

      this.cardID = 0;

      this.state = {
        cards: [],
        currentTitle: "",
        currentDescription: "",
        currentTypeAp: 0,
        currentAddress: "",
        currentPrice: "",
        currentPhone: "",
        currentImages: [],
        currentFiles: [],
        titleValue: 0,
        descriptionValue: 0,
        errorRooms: false,
        submit: false,
        showPreview: false
      };
    }

    render() {
      const { classes } = this.props;

      return (
        <div>
          <Modal {...this.props}>
            <div style={getModalStyle()} className={classes.paper}>
              <Typography variant="h6">
                Informations about your apartament
              </Typography>
              <TextField
                type="text"
                fullWidth
                placeholder="Title"
                label="Title"
                value={this.state.currentTitle}
                error={this.state.currentTitle.length < 10 ? true : false}
                inputProps={{ maxLength: 150 }}
                onChange={this.handleState("currentTitle")}
                helperText={`${this.state.currentTitle.length}/150 (at least 10 characters)`}
                classes={{ root: classes.textField }}
              />
              <TextField
                type="text"
                fullWidth
                placeholder="Description"
                label="Description"
                value={this.state.currentDescription}
                error={this.state.currentDescription.length < 20 ? true : false}
                inputProps={{ maxLength: 500 }}
                onChange={this.handleState("currentDescription")}
                helperText={`${this.state.currentDescription.length}/500 (at least 20 characters)`}
                classes={{ root: classes.textField }}
              />
              <TextField
                type="number"
                fullWidth
                placeholder="Number of rooms"
                label="Number of rooms"
                value={this.state.currentTypeAp}
                error={
                  this.state.currentTypeAp > 3 || this.state.currentTypeAp < 1
                    ? true
                    : false
                }
                helperText={"Minimum 1 room, maximum 3 rooms"}
                inputProps={{ min: 1, max: 3 }}
                onChange={this.handleState("currentTypeAp")}
                classes={{ root: classes.textField }}
              />
              <TextField
                type="text"
                fullWidth
                placeholder="Address"
                label="Address"
                error={this.state.currentAddress.length < 1 ? true : false}
                helperText={`Can't be empty`}
                onChange={this.handleState("currentAddress")}
                classes={{ root: classes.textField }}
              />
              <TextField
                type="text"
                fullWidth
                placeholder="Price"
                label="Price"
                error={this.state.currentPrice.length < 1 ? true : false}
                helperText={`Can't be empty`}
                onChange={this.handleState("currentPrice")}
                classes={{ root: classes.textField }}
              />
              <TextField
                type="text"
                fullWidth
                placeholder="Phone"
                label="Phone"
                error={this.state.currentPhone < 1 ? true : false}
                helperText={`Can't be empty`}
                onChange={this.handleState("currentPhone")}
                classes={{ root: classes.textField }}
              />
              <div className={classes.buttonsRow}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={this.handleImages}
                />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    disableElevation
                  >
                    Upload
                  </Button>
                </label>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={() => {
                    if (this.handleErrors()) {
                      this.props.onClose();
                      this.handleAddAd();
                    }
                  }}
                >
                  Submit
                </Button>
              </div>
              {this.state.currentFiles.map((file, index) => {
                return <p>{file}</p>;
              })}
              {this.state.currentFiles.length < 2 ? (
                <p className={classes.errorMessage}>
                  You need to upload at least 2 photos
                </p>
              ) : (
                ""
              )}
            </div>
          </Modal>
          <div className={classes.cardDisplay}>
            {this.state.cards.map((ad, index) => {
              return (
                <CardAd
                  id={ad.id}
                  title={ad.title}
                  description={ad.description}
                  typeAp={ad.typeAp}
                  address={ad.address}
                  price={ad.price}
                  phone={ad.phone}
                  images={ad.images}
                  deleteAd={this.deleteAd.bind(this, index)}
                />
              );
            })}
          </div>
        </div>
      );
    }

    handleState = input => e => {
      this.setState({
        [input]: e.target.value
      });
    };

    handleAddAd = () => {
      this.cardID = this.cardID + 1;
      const intermediateCards = Object.assign([], this.state.cards);

      intermediateCards.push({
        id: this.cardID,
        title: this.state.currentTitle,
        description: this.state.currentDescription,
        typeAp: this.state.currentTypeAp,
        address: this.state.currentAddress,
        price: this.state.currentPrice,
        phone: this.state.currentPhone,
        images: this.state.currentImages
      });

      this.setState({
        cards: intermediateCards,
        currentImages: [],
        currentFiles: [],
        currentTitle: "",
        currentDescription: "",
        currentPrice: "",
        currentPhone: "",
        currentTypeAp: 0,
        currentAddress: ""
      });
    };

    handleErrors = () => {
      if (
        this.state.currentTypeAp > 3 ||
        this.state.currentTypeAp < 1 ||
        this.state.currentFiles.length < 2 ||
        this.state.currentTitle.length < 10 ||
        this.state.currentDescription.length < 20 ||
        this.state.currentPhone.length < 1 ||
        this.state.currentAddress.length < 1 ||
        this.state.currentPrice.length < 1
      )
        return false;
      else return true;
    };

    handleImages = e => {
      this.imageObj.push(e.target.files);
      for (let i = 0; i < this.imageObj[0].length; i++) {
        this.imageArray.push(URL.createObjectURL(this.imageObj[0][i]));
        this.imageName.push(this.imageObj[0][i].name);
      }
      this.setState({
        currentImages: this.imageArray,
        currentFiles: this.imageName
      });
      this.imageName = [];
      this.imageObj = [];
      this.imageArray = [];
    };

    deleteAd = (index) => {
      const intermediateArray = Object.assign([], this.state.cards)
      intermediateArray.splice(index, 1);
      this.setState({
        cards: intermediateArray
      })
    }
  }
);
