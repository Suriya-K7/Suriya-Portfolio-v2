import React from "react";
import { useField, ErrorMessage } from "formik";
import { CircleAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const TextField = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="relative">
      {props.type !== "textarea" ? (
        <Input
          className={meta.touched && meta.error ? "border-destructive" : ""}
          autoComplete="off"
          {...field}
          {...props}
        />
      ) : (
        <Textarea
          className={`min-h-[120px] ${meta.touched && meta.error ? "border-destructive" : ""}`}
          autoComplete="off"
          {...field}
          {...props}
        />
      )}
      {meta.touched && meta.error && (
        <CircleAlert className="absolute right-3 top-3 h-4 w-4 text-destructive" />
      )}
      <ErrorMessage
        component="div"
        name={field.name}
        className="mt-1 text-xs text-destructive"
      />
    </div>
  );
};

export default TextField;
