/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Nav } from "@parliament/parliament-ui-components"
import Provider from "@react/react-spectrum/Provider"
import Button from "@react/react-spectrum/Button"
import Menu from "@react/react-spectrum/Icon/ShowMenu"
import OverlayTrigger from "@react/react-spectrum/OverlayTrigger"
import Popover from "@react/react-spectrum/Popover"
import Title from "./Title"
import SearchBar from "./SearchBar"

import { useMediaQuery } from "react-responsive"

const SiteNav = props => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const data = useStaticQuery(
    graphql`
      query SiteNavQuery {
        allRawJsonFile(filter: { view_type: { eq: "mdbook" } }) {
          edges {
            node {
              id
              pages
            }
          }
        }
      }
    `
  )

  const gitInfo = {
    org: props.gitRemote.organization,
    name: props.gitRemote.name,
    branch: props.gitRemote.ref,
  }

  return (
    <Provider theme="light">
      {!isMobile ? (
        <div
          css={css`
            width: 280px;
          `}
        >
          <div
            css={css`
              padding: 30px 24px 24px 24px;
              width: 256px;
            `}
          >
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
                width: 256px;
                margin-top: 24px;
              `}
            >
              <SearchBar gitRemote={props.gitRemote} />
            </div>
          </div>
          <div
            css={css`
              padding: 0px 24px 24px 24px;
              width: 256px;
              height: 80vh;
              overflow-y: scroll;
            `}
          >
            <Nav
              data={data.allRawJsonFile.edges[0].node.pages}
              selected={props.currentPage}
              gitInfo={gitInfo}
            />
          </div>
        </div>
      ) : (
        <div>
          <div
            style={{
              float: "left",
              display: "inline-block",
              padding: "12px",
              textAlign: "center",
            }}
          >
            <OverlayTrigger trigger="click" placement="right">
              <Button
                autoFocus={false}
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
                <SearchBar gitRemote={props.gitRemote} />
                <Nav
                  data={data.allRawJsonFile.edges[0].node.pages}
                  selected={props.currentPage}
                  gitInfo={gitInfo}
                />
              </Popover>
            </OverlayTrigger>
          </div>
        </div>
      )}
    </Provider>
  )
}

SiteNav.propTypes = {
  currentPage: PropTypes.string,
}

SiteNav.defaultProps = {
  currentPage: "",
}

export default SiteNav
