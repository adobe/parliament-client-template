import { React, useState } from "react"
import Breakdown from "@spectrum-icons/workflow/Breakdown"
import "@spectrum-css/typography"

import { Drawer } from "rsuite"

import ProgressBar from "../components/ProgressBar"

const mouseOverStyles = { textAlign: "left" }
const drawerStyles = {
  backgroundColor: "inherit",
  colorScheme: "inherit",
}

const ProgressBarDrawer = ({ pages, currentIx }) => {
  const [show, setShow] = useState(false)
  return (
    <div>
      <span onMouseOver={() => setShow(true)} style={mouseOverStyles}>
        <Breakdown /> Course Module List
      </span>
      <Drawer
        show={show}
        onHide={() => setShow(false)}
        size={"xs"}
        style={drawerStyles}
      >
        <Drawer.Header>
          <Drawer.Title>Course Modules</Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>
          <ProgressBar pages={pages} currentIx={currentIx} />
        </Drawer.Body>
      </Drawer>
    </div>
  )
}

export default ProgressBarDrawer
