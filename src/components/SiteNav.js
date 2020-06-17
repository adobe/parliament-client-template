/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Nav } from "@parliament/parliament-ui-components"
import Provider from "@react/react-spectrum/Provider"
import Button from "@react/react-spectrum/Button"
import Menu from "@react/react-spectrum/Icon/ShowMenu"
import OverlayTrigger from "@react/react-spectrum/OverlayTrigger"
import Popover from "@react/react-spectrum/Popover"
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

  return (
    <Provider theme="light">
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
            <OverlayTrigger trigger="click" placement="right">
              <Button
                block={false}
                disabled={false}
                element="button"
                holdAffordance={false}
                icon={<Menu />}
                invalid={false}
                label={null}
                logic={false}
                onClick={function noRefCheck() {}}
                quiet
                selected={false}
                variant="action"
              />
              <Popover
                title={
                  <Link
                    css={css`
                      text-decoration-line: none;
                    `}
                    to="/"
                  >
                    <Title />
                  </Link>
                }
                variant="default"
              >
                <SearchBar gitRemote={gitRemote} />
                <Nav data={pages} selected={currentPage} gitInfo={gitInfo} />
              </Popover>
            </OverlayTrigger>
            <Title isMobile={isMobile} forceMobile={forceMobile} />
          </div>
        </div>
      )}
    </Provider>
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
