/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { useState, Fragment } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Nav } from "@parliament/parliament-ui-components"

import Menu from "@spectrum-icons/workflow/ShowMenu"
import { ActionButton } from "@react-spectrum/button"
import { Content } from "@react-spectrum/view"
import { Dialog, DialogTrigger } from "@react-spectrum/dialog"

import Title from "./Title"
import SearchBar from "./SearchBar"

import { useMediaQuery } from "react-responsive"

const SiteNav = ({ gitRemote, forceMobile, currentPage, pages }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const gitInfo = {
    org: gitRemote.organization,
    name: gitRemote.name,
    branch: gitRemote.ref,
  }
  let [isPopoverOpen, setPopoverOpen] = useState(false)

  return (
    <Fragment>
      {!isMobile && !forceMobile ? (
        <div
          css={css`
            width: 256px;
            margin: 0;
          `}
        >
          <div
            css={css`
              padding: 30px 24px 24px 24px;
            `}
          >
            <Link
              css={css`
                text-decoration-line: none;
              `}
              to="/"
            >
              <Title isMobile={isMobile} forceMobile={forceMobile} />
            </Link>
            <div
              css={css`
                margin-top: 24px;
              `}
            >
              <SearchBar gitRemote={gitRemote} />
            </div>
          </div>
          <div
            css={css`
              padding: 0px 24px 24px 24px;
              height: 80vh;
              overflow-y: auto;
              overflow-x: hidden;
            `}
          >
            <Nav data={pages} selected={currentPage} gitInfo={gitInfo} />
          </div>
        </div>
      ) : (
        <div>
          <div
            css={css`
              display: flex;
              flex-direction: row;
              padding: 12px;
              text-align: center;
            `}
          >
            <DialogTrigger
              type="popover"
              isOpen={isPopoverOpen}
              onOpenChange={setPopoverOpen}
            >
              <ActionButton isQuiet aria-label="Menu button">
                <Menu />
              </ActionButton>
              <Dialog>
                <Content>
                  <Link
                    css={css`
                      text-decoration-line: none;
                    `}
                    to="/"
                  >
                    <Title />
                  </Link>
                  <div
                    css={css`
                      padding-top: 24px;
                      padding-bottom: 24px;
                    `}
                  >
                    <SearchBar gitRemote={gitRemote} />
                  </div>
                  <Nav data={pages} selected={currentPage} gitInfo={gitInfo} />
                </Content>
              </Dialog>
            </DialogTrigger>
            <Title isMobile={isMobile} forceMobile={forceMobile} />
          </div>
        </div>
      )}
    </Fragment>
  )
}

SiteNav.propTypes = {
  currentPage: PropTypes.string,
  forceMobile: PropTypes.bool,
}

SiteNav.defaultProps = {
  currentPage: "",
  forceMobile: false,
}

export default SiteNav
