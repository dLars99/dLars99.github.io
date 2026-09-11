import React, { useState, type FC, type ReactNode } from "react";
import { FaExpand } from "@react-icons/all-files/fa/FaExpand";
import { FaWindowMinimize } from "@react-icons/all-files/fa/FaWindowMinimize";
import * as Collapsible from "@radix-ui/react-collapsible";
import styles from "./ExpandableChip.module.css";

export interface ExpandableChipProps {
  children?: ReactNode;
  name: string;
}

const ExpandableChip: FC<ExpandableChipProps> = ({ children, name }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Collapsible.Root open={isOpen} onOpenChange={setIsOpen} className={styles.root}>
      <div className={styles.innerFlex}>
        <h3 className={styles.title}>{name}</h3>

        <Collapsible.Trigger asChild>
          <button className={styles.button} aria-label={isOpen ? `Collapse ${name}` : `Expand ${name}`}>
            {isOpen ? <FaWindowMinimize /> : <FaExpand />}
          </button>
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content className={styles.contentAnimation}>{children}</Collapsible.Content>
    </Collapsible.Root>
  );
};

export default ExpandableChip;
