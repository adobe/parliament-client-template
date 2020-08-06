import React from 'react'
import classNames from 'classnames'
import '@spectrum-css/typography'

const Paragraph = ({ children, className, ...props }) => (
    console.log(children.props?.children?.props?.file),
    children.props?.children?.props?.mdxType === `includemarkdown`
    ? <div className={classNames(className, 'spectrum-Body--M')} {...props}>
        {children}
      </div>
    : <p className={classNames(className, 'spectrum-Body--M')} {...props}>
        {children}
      </p>
)

export default Paragraph