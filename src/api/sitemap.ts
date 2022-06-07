import type { NextApiRequest, NextApiResponse } from "next";
import { SitemapStream, streamToPromise } from "sitemap";

interface Iblog {
  slug: string;
}

export default async function sitemap(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
      // cacheTime: 600000,
    });

    smStream.write({
      url: `/`,
      changefreq: "weekly",
      priority: 1,
    });
    // smStream.write({
    //   url: `/blogs`,
    //   changefreq: "weekly",
    //   priority: 0.9,
    // });

    // List of posts
    const blogs: Iblog[] = [];

    // Create each URL row
    blogs.forEach((course) => {
      smStream.write({
        url: `/blogs/${course.slug}`,
        changefreq: "monthly",
        priority: 1,
      });
    });

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      "Content-Type": "application/xml",
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch (e) {
    console.log(e);
    res.send(JSON.stringify(e));
  }
}
