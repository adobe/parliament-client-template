import { useStaticQuery, graphql } from "gatsby"
export const useManifestJson = () => {
  const { json } = useStaticQuery(
    graphql`
      query SiteNavData {
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
  return json
}
