import { React, Component } from "react"
import Breakdown from "@spectrum-icons/workflow/Breakdown"
import "@spectrum-css/typography"

import { Drawer } from "rsuite"

import ProgressBar from "../components/ProgressBar"

const mouseOverStyles = { textAlign: 'left' };
const drawerStyles = {
  backgroundColor: 'inherit',
  colorScheme: 'inherit',
};

class ProgressBarDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.close = this.close.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  close() { this.setState({ show: false }); }
  toggleDrawer() { this.setState({ show: true }); }

  render() {
    return (
        <div>
          <span onMouseOver={this.toggleDrawer} style={mouseOverStyles}>
            <Breakdown />{" "}Course Module List
          </span>
          <Drawer
            show={this.state.show}
            onHide={this.close}
            size={'xs'}
            style={drawerStyles}
          >

            <Drawer.Header>
              <Drawer.Title>Course Modules</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
              <ProgressBar
                pages={this.props.pages}
                currentIx={this.props.currentIx}
              />
            </Drawer.Body>
          </Drawer>
        </div>
    );
  }
}

export default ProgressBarDrawer
