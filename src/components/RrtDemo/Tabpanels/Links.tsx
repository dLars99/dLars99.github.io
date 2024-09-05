import React, { type FC } from "react";
import { TabpanelLayout } from "./TabpanelLayout";
import { css } from "../../../../styled-system/css";

export interface LinksProps {}

const styles = {
  color: "blue.300",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
  "&:visited": {
    color: "blue.600",
  },
};

export const Links: FC<LinksProps> = () => (
  <TabpanelLayout>
    <h2>More Info</h2>

    <p>Want to learn more about react-routing-tabs?</p>

    <p>
      <a
        className={css(styles)}
        href="https://github.com/dLars99/react-routing-tabs"
      >
        GitHub
      </a>
    </p>

    <p>
      <a
        className={css(styles)}
        href="https://www.npmjs.com/package/react-routing-tabs"
      >
        NPM
      </a>
    </p>

    <p>
      <a className={css(styles)} href="/">
        More about the author
      </a>
    </p>
  </TabpanelLayout>
);
