import React, { useState, type FC, type ReactNode } from "react";
import { FaExpand } from "@react-icons/all-files/fa/FaExpand";
import { FaWindowMinimize } from "@react-icons/all-files/fa/FaWindowMinimize";
import * as Collapsible from "@radix-ui/react-collapsible";
import { css } from "../../../styled-system/css";

export interface ExpandableChipProps {
  children?: ReactNode;
  name: string;
}

const styles = {
  root: {
    my: 8,
  },
  innerFlex: {
    display: "flex",
    alignItems: "center",
    background: "rgb(235, 250, 255, 0.5)",
    maxWidth: "64ch",
    mx: "auto",
    px: 6,
    py: 4,
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    background: "transparent",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
    height: 10,
    minWidth: 10,
    px: 4,
    lineHeight: 1.2,
  },
};

const ExpandableChip: FC<ExpandableChipProps> = ({ children, name }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Collapsible.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      className={css(styles.root)}
    >
      <div className={css(styles.innerFlex)}>
        <h3 className={css({ textStyle: "h3" })}>{name}</h3>

        <Collapsible.Trigger asChild>
          <button className={css(styles.button)}>
            {isOpen ? <FaWindowMinimize /> : <FaExpand />}
          </button>
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content>{children}</Collapsible.Content>
    </Collapsible.Root>
  );
};

export default ExpandableChip;
