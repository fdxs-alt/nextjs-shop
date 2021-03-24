export const FEATURED_GAMES = `
    query FeaturedGames($featured: BooleanType) {
        allGames (filter: {featured: {eq: $featured}})
            {
                id
                date
                description
                price
                platform
                category
                name
                image {
                    responsiveImage (imgixParams: { fit: crop, w: 125, h: 175, auto: format }) {
                      src
                      srcSet
                      webpSrcSet
                      sizes
                      width
                      height
                      aspectRatio
                      base64
                    }
                }
            }
    }
`
export const ALL_CATEGORIES = `
    query {
        allGames {
            category
            platform
        }
    }
`

export const ALL_GAMES = `
query AllGames($skip: IntType, $platform: String!, $name: String!, $genre: String!) {
    allGames (skip: $skip, first: 20, filter: {platform: {eq: $platform}, name: {matches: {pattern: $name}}, category: {matches: {pattern: $genre, regexp: true}}})
        {
            id
            date
            description
            price
            platform
            category
            name
            image {
                responsiveImage (imgixParams: { fit: crop, w: 125, h: 175, auto: format }) {
                  src
                  srcSet
                  webpSrcSet
                  sizes
                  width
                  height
                  aspectRatio
                  base64
                }
            }
        }
}
`

export const SINGLE_GAME = `
    query SingleGame($id: ItemId) {
        game(filter: {id: {eq : $id }}) {
            id
            date
            description
            price
            platform
            category
            name
            image {
                responsiveImage (imgixParams: { fit: fill, w: 400, h: 500, auto: format }) {
                  src
                  srcSet
                  webpSrcSet
                  sizes
                  width
                  height
                  aspectRatio
                  base64
                }
            }
        }
    }
`
