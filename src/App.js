import React, { Component } from "react";
import { Typography, Button, Toolbar, AppBar } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CreateAd from "./components/CreateAd";

const useStyles = {
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  textColor: {
    color: "white"
  }
};

export default withStyles(useStyles)(
  class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showModal: false
      };
    }

    render() {
      const { classes } = this.props;

      return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar
              variant="regular"
              classes={{
                gutters: classes.regular
              }}
            >
              <Typography className={classes.title} variant="h6">Ads-List</Typography>
              <Button
                classes={{ root: classes.textColor }}
                onClick={this.handleOpen}
              >
                Create new ad
              </Button>
            </Toolbar>
          </AppBar>
          <CreateAd open={this.state.showModal} onClose={this.handleClose} />
        </div>
      );
    }

    handleOpen = () => {
      this.setState({
        showModal: true
      });
    };

    handleClose = () => {
      this.setState({
        showModal: false
      });
    };
  }
);
