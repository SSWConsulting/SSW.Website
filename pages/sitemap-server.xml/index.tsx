import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";

import { client } from "../../.tina/__generated__/client";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const allPagesRequest = await client.request({
        query: `{
            collections {
              slug
              documents {
                edges {
                  node {
                    ... on Marketing {
                      id
                    }
                    ... on Consulting {
                      id
                    }
                    ... on Testimonials {
                      id
                    }
                    ... on Technologies {
                      id
                    }
                    ... on Page {
                      id
                    }
                  }
                } 
              }
            }
          }`
    })

    const allPages = allPagesRequest.data.collections.map(collection => collection.documents.edges.map(edge => edge.node.id ? edge.node.id.slice(7).slice(0, -4) : null)).flat().filter(x => x);
    const consultingPages = await client.queries.consultingConnection();

    const pageUrls = consultingPages.data.consultingConnection.edges.map(edge => {
        return {
            loc: `https://ssw.com.au${edge.node.id.slice(7).slice(0, -4)}`,
            lastMod: new Date().toISOString(),
        }
    });

    return getServerSideSitemap(ctx, pageUrls);
}

export default function SiteMapIndex() { 
    return ;
}