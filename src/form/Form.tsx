import { useEffect, useRef, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { FormType, InputProps } from "./types";

export function Form<Data extends {}>({ data, onSubmit, children }: FormType<Data>) {
  const formState = useRef(new BehaviorSubject(data));

  const ref = useRef({
    input: (props: InputProps<Data>) => {
      const [value, setValue] = useState(data[props.name] as any);

      useEffect(() => {
        const sub = formState.current.subscribe((state) => {
          setValue(state[props.name]);
        });

        return () => sub.unsubscribe();
      }, []);

      return (
        <input
          {...props}
          value={value}
          onChange={(e) => formState.current.next({
            ...formState.current.getValue(),
            [props.name]: e.target.value,
          })}
        />
      );
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formState.current.getValue());
      }}
    >
      {children(ref.current)}
    </form>
  );
}