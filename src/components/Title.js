/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import Heading from "@react/react-spectrum/Heading"
import Logo from "../images/adobe_logo-2.svg"

const Title = ({ siteTitle, isMobile, forceMobile }) => {
  return !isMobile && !forceMobile ? (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
      `}
    >
      <Logo
        css={css`
          width: 45px;
          height: 40px;
          margin-right: 16px;
          padding-top: 1px;
        `}
      />
      <Heading variant="subtitle1">{siteTitle}</Heading>
    </div>
  ) : (
    <div
      css={css`
        display: flex;
        flex-direction: row;
      `}
    >
      <Logo
        css={css`
          width: 30px;
          height: 30px;
          margin-right: 16px;
          padding-top: 1px;
        `}
      />
      <Heading variant="subtitle1">{siteTitle}</Heading>
    </div>
  )
}

Title.defaultProps = {
  siteTitle: process.env.GATSBY_SOURCE_TITLE,
}

export default Title
