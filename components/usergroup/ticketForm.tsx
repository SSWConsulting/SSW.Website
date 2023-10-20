import classNames from "classnames";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";

interface FormValues {
  format: "online" | "inPerson";
  name: string;
  email: string;
  phone: string;
}

const validationSchema = object({
  format: string().required("Please select a format"),
  name: string().required("Please enter your name"),
  email: string().email().required("Please enter your email"),
  phone: string().required("Please enter your phone number"),
});

type TicketFormProps = {
  className?: string;
};

export const TicketForm = ({ className }: TicketFormProps) => {
  return (
    <div
      className={classNames(
        "max-w-md grow rounded-md bg-white p-10",
        className
      )}
    >
      <Formik
        initialValues={{
          format: "",
          name: "",
          email: "",
          phone: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values: FormValues) => {
          // Process form submission here
          values.email;
        }}
      >
        <Form className="flex flex-col justify-center">
          <h3 className="text-sswRed">Get your free ticket</h3>
          <div className="grid grid-cols-2 py-4">
            <label className="col-span-1">
              <Field
                name="format"
                type="radio"
                value="inPerson"
                className="mr-4"
              />
              In Person
            </label>
            <label className="col-span-1">
              <Field
                name="format"
                type="radio"
                value="online"
                className="mr-4"
              />
              Online
            </label>
          </div>

          <TicketField
            label="Name *"
            name="name"
            type="text"
            placeholder="Enter your name"
          />

          <TicketField
            label="Email *"
            name="email"
            type="email"
            placeholder="Enter your email to receive ticket"
          />

          <TicketField
            label="Phone *"
            placeholder="Enter your phone number"
            type="tel"
            name="phone"
          />

          <button
            type="submit"
            className="mx-auto my-4 rounded-md bg-sswRed px-4 py-3 font-medium text-white"
          >
            Register for free
          </button>
        </Form>
      </Formik>
    </div>
  );
};

type TicketFieldProps = {
  label: string;
  placeholder: string;
  name: string;
  type?: string;
};

const TicketField = (props: TicketFieldProps) => {
  return (
    <>
      <span className="font-bold">{props.label}</span>
      <Field
        name={props.name}
        type={props.type || "text"}
        placeholder={props.placeholder}
        className="bg-gray-50 my-3 rounded-md p-3"
      />
    </>
  );
};
