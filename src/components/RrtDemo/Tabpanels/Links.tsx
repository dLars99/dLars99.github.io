import React, { type FC } from "react";
import { TabpanelLayout } from "./TabpanelLayout";
import styles from "./Links.module.css";

export interface LinksProps {}

export const Links: FC<LinksProps> = () => (
  <TabpanelLayout>
    <h2>More Info</h2>

    <p>Want to learn more about react-routing-tabs?</p>

    <p>
      <a
        className={styles.link}
        href="https://github.com/dLars99/react-routing-tabs"
      >
        GitHub
      </a>
    </p>

    <p>
      <a
        className={styles.link}
        href="https://www.npmjs.com/package/react-routing-tabs"
      >
        NPM
      </a>
    </p>

    <p>
      <a className={styles.link} href="/">
        More about the author
      </a>
    </p>
  </TabpanelLayout>
);
