/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { RedocStandalone } from "redoc"

import SiteNav from "../components/SiteNav"
import OpenApiLayout from "../components/openapilayout"
import SEO from "../components/seo"

const OpenApiTemplate = props => {
  return (
    <OpenApiLayout>
      <SEO title={props.pageContext.seo} />
      <div
        css={css`
          display: flex;
          flex-direction: row;
          @media screen and (max-width: 767px) {
            flex-direction: column;
          }
        `}
      >
        <SiteNav
          currentPage={props.location.pathname}
          gitRemote={props.pageContext.gitRemote}
        />
        <div
          css={css`
            width: calc(100% - 280px);
            @media screen and (max-width: 767px) {
              width: 100%;
            }
          `}
        >
          <RedocStandalone
            spec={props.pageContext.spec}
            options={{
              hideLoading: true,
              menuToggle: true,
            }}
          />
        </div>
      </div>
    </OpenApiLayout>
  )
}

export default OpenApiTemplate
