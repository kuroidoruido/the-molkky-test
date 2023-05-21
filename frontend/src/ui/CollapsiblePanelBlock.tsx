import { useState } from "react";

import "./CollapsiblePanelBlock.css";

export interface CollapsiblePanelBlockProps extends React.PropsWithChildren {
  collapse?: boolean;
  label: string;
}

export function CollapsiblePanelBlock({
  collapse = true,
  label,
  children,
}: CollapsiblePanelBlockProps) {
  const [isCollapse, setCollapse] = useState(collapse);

  return (
    <>
      <a
        className={`panel-block panel-collapsible-block ${
          isCollapse ? "collapse" : ""
        }`}
        onClick={() => setCollapse(!isCollapse)}
      >
        <span className="panel-icon">
          {isCollapse ? (
            <i className="fas fa-chevron-down" aria-hidden="true"></i>
          ) : (
            <i className="fas fa-chevron-up" aria-hidden="true"></i>
          )}
        </span>
        <div>{label}</div>
      </a>
      {!isCollapse && (
        <div className="panel-block panel-collapsible-block-content">
          {children}
        </div>
      )}
    </>
  );
}
