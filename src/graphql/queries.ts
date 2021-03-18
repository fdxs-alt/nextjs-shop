export const FeatureGamesQuery = `
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
