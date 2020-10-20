/**
 *  Copyright 2020 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *  of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software distributed under
 *  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 */

/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Img } from "react-image"

const BioImage = ({ author }) => {
  return (
    <Img
      alt={author.name}
      src={[
        `https://s7d2.scene7.com/is/image/IMGDIR/${author.login}`,
        `https://github.com/images/gravatars/gravatar-user-420.png`,
      ]}
      css={css`
        width: calc(
          var(--spectrum-global-dimension-static-size-600) +
            var(--spectrum-global-dimension-static-size-40)
        );
        height: calc(
          var(--spectrum-global-dimension-static-size-600) +
            var(--spectrum-global-dimension-static-size-40)
        );
        border-radius: var(--spectrum-global-dimension-static-percent-50);
        border: var(--spectrum-global-dimension-static-size-40) solid
          var(--spectrum-global-color-gray-50);
      `}
    />
  )
}

export default BioImage
