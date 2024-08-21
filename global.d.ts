import "@tanstack/react-table";

interface MenuItemStyles {
  root?: ElementStyles;
  button?: ElementStyles;
  label?: ElementStyles;
  prefix?: ElementStyles;
  suffix?: ElementStyles;
  icon?: ElementStyles;
  subMenuContent?: ElementStyles;
  SubMenuExpandIcon?: ElementStyles;
}

type ElementStyles =
  | CSSObject
  | ((params: MenuItemStylesParams) => CSSObject | undefined);

declare module "@tanstack/table-core" {
  interface ColumnMeta<TData extends RowData, TValue> {
    style: {
      textAlign: "left" | "center" | "right";
    };
  }
}
