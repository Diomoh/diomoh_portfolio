import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

// Découpe un titre en mots (<span class="w">) numérotés pour l'apparition mot par mot ([data-split]).
export function splitWords(node: ReactNode): ReactNode {
  let i = 0;
  const walk = (n: ReactNode): ReactNode =>
    Children.map(n, (child) => {
      if (typeof child === "string") {
        return child.split(/(\s+)/).map((part, k) =>
          part.trim() ? (
            <span key={k} className="w" style={{ ["--i" as string]: i++ }}>
              {part}
            </span>
          ) : (
            part
          ),
        );
      }
      if (isValidElement<{ children?: ReactNode }>(child) && child.props.children !== undefined) {
        return cloneElement(child as ReactElement<{ children?: ReactNode }>, undefined, walk(child.props.children));
      }
      return child;
    });
  return walk(node);
}
