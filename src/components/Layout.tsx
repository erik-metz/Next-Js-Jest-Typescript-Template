import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "@styles/index.module.css";
import { useRouter } from "next/router";
import { domainName, inProd, inTest } from "@constants/index";
import { layout } from "@constants/text";

const GoogleAnalyticsHead = ({
  children,
}: {
  children: string | JSX.Element | JSX.Element[];
}) => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (inProd && hostname === domainName) {
      return (
        <Head>
          {children}
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </Head>
      );
    } else {
      if (!inTest) {
        console.log(
          "host name does not equal domain name -> Google Analytics is turned off",
          { hostname, domainName }
        );
      }
    }
  }
  return <Head>{children}</Head>;
};

const Layout = ({
  children,
  title,
  description,
}: {
  children: string | JSX.Element | JSX.Element[];
  title?: string;
  description?: string;
}) => {
  const router = useRouter();
  let text = layout.en;
  if (router && Object.keys(router).includes("locale")) {
    const { locale } = router;
    text = locale === "de-DE" ? layout.de : layout.en;
  }

  const year = new Date(Date.now()).getFullYear();
  return (
    <>
      <Head>
        <title>{title ? title : text.title}</title>
        <meta
          name="description"
          content={description ? description : text.description}
        />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>

        <footer className={styles.footer}>
          <Image
            src="/logo.svg"
            alt={text.logoAlt}
            width={283 / 2}
            height={64 / 2}
          />
          <p className={styles.copyright}>
            Copyright © {year} {text.copyright}
          </p>
        </footer>
      </div>
    </>
  );
};
Layout.defaultProps = {
  title: layout.en.title,
  description: layout.en.description,
};

export default Layout;
