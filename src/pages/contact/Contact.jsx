import React, { useRef } from "react";
import { Mail, Phone, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Formik, Form } from "formik";
import TextField from "@/components/TextField";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";

const Linkedin = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Github = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Contact = () => {
  const SERVICE = import.meta.env.VITE_SERVICE;
  const TEMPLETE = import.meta.env.VITE_TEMPLETE;
  const PUBLIC = import.meta.env.VITE_PUBLIC;

  const form = useRef();
  const validate = Yup.object({
    from_name: Yup.string()
      .max(15, "should be less than 15 Characters")
      .min(3, "should be more than 3 Characters")
      .required("Required"),
    from_email: Yup.string().email("Email is Invalid").required("Required"),
    from_subject: Yup.string()
      .max(25, "should be less than 15 Characters")
      .min(6, "should be more than 6 Characters")
      .required("Required"),
    message: Yup.string()
      .max(100, "should be less than 100 Characters")
      .min(10, "should be more than 10 Characters")
      .required("Required"),
  });

  const sendEmail = () => {
    emailjs.sendForm(SERVICE, TEMPLETE, form.current, PUBLIC).then(
      (result) => {
        toast.success("Wow so easy, thank for contacting!");
        console.log(result);
      },
      (error) => {
        toast.error("Server error Please try again later!");
        console.log(error);
      },
    );
  };

  return (
    <section className="py-20 px-6" id="contact">
      <h2 className="text-center text-4xl font-bold tracking-tight mb-16">
        Get In <span className="text-primary">Touch</span>
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h3 className="text-2xl font-semibold">Don't be Shy !</h3>
          <p className="text-muted-foreground leading-relaxed">
            Feel free to get in touch with me. I am always open to discussing
            new projects, creative ideas or opportunities to be part of your
            vision.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Mail Me</span>
                <h4 className="font-medium">suriya.fsd@gmail.com</h4>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Call Me</span>
                <h4 className="font-medium">+91-7639718893</h4>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <a
              href="https://linkedin.com/in/suriya-kesavamurthy-50616825a"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/suriya-k7"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
        <Formik
          initialValues={{
            from_name: "",
            from_email: "",
            from_subject: "",
            message: "",
          }}
          validationSchema={validate}
          onSubmit={(values, { resetForm }) => {
            sendEmail(values);
            resetForm({ values: "" });
          }}
        >
          {(formik) => (
            <Form ref={form} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  name="from_name"
                  placeholder="Your Name"
                  type="text"
                />
                <TextField
                  name="from_email"
                  placeholder="Your Email"
                  type="email"
                />
                <div className="sm:col-span-2">
                  <TextField
                    name="from_subject"
                    placeholder="Your Subject"
                    type="text"
                  />
                </div>
              </div>
              <TextField
                name="message"
                placeholder="Your Message"
                type="textarea"
              />
              <Button type="submit" size="lg" className="group cursor-pointer rounded-full px-8">
                Send Message
                <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Contact;
