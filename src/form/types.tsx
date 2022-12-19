import React, { ReactNode } from "react";

export type InputProps<Data extends {}> = React.ComponentProps<'input'> & { name: keyof Data };

export type FormType<Data extends Object> = {
  data: Data;
  onSubmit: (data: Data) => any;
  children: (
    vals: {
      input: (props: InputProps<Data>) => JSX.Element,
    }) => ReactNode, 
}