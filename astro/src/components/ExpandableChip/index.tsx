import React, { useState, type FC, type ReactNode } from "react";
import { FaExpand } from "@react-icons/all-files/fa/FaExpand";
import { FaWindowMinimize } from "@react-icons/all-files/fa/FaWindowMinimize";
import * as Collapsible from "@radix-ui/react-collapsible";

export interface ExpandableChipProps {
  children?: ReactNode;
  name: string;
}

const ExpandableChip: FC<ExpandableChipProps> = ({ children, name }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpenChange = (open: boolean) => {
    console.log("click", open);
    setIsOpen(open);
  };

  return (
    <Collapsible.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      style={{ margin: "2rem" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "rgb(235, 250, 255, 0.5)",
          maxWidth: "64ch",
          margin: "0 auto",
          padding: "1rem 1.5rem",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h3 style={{ fontSize: "1.5rem" }}>{name}</h3>

        <Collapsible.Trigger asChild>
          <button
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            {isOpen ? <FaWindowMinimize /> : <FaExpand />}
          </button>
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content>{children}</Collapsible.Content>
    </Collapsible.Root>
  );
};

export default ExpandableChip;
