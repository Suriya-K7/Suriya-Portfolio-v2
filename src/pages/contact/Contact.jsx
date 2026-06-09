import React, { useRef, useLayoutEffect } from "react";
import { Mail, Phone, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Formik, Form } from "formik";
import TextField from "@/components/TextField";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Inline SVG icons (avoids lucide export issues) ── */
const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

/* ── Contact info card ── */
const ContactCard = ({ icon: Icon, label, value, href }) => (
  <a
    href={href}
    className="contact-card group flex items-center gap-4 rounded-xl border border-border/60 bg-card
      p-4 transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:shadow-primary/10
      hover:-translate-y-0.5"
  >
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl
      bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground
      transition-all duration-300">
      <Icon className="h-5 w-5" />
    </div>
    <div className="min-w-0">
      <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-foreground truncate">{value}</p>
    </div>
  </a>
);

const Contact = () => {
  const rootRef = useRef(null);
  const SERVICE  = import.meta.env.VITE_SERVICE;
  const TEMPLETE = import.meta.env.VITE_TEMPLETE;
  const PUBLIC   = import.meta.env.VITE_PUBLIC;
  const form     = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Heading */
      gsap.fromTo(".contact-heading",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-heading", start: "top 85%", once: true } }
      );
      /* Left column */
      gsap.fromTo(".contact-left > *",
        { opacity: 0, x: -28 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-left", start: "top 82%", once: true } }
      );
      /* Form fields */
      gsap.fromTo(".contact-form > *",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-form", start: "top 82%", once: true } }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const validate = Yup.object({
    from_name:    Yup.string().min(3).max(50).required("Name is required"),
    from_email:   Yup.string().email("Invalid email").required("Email is required"),
    from_subject: Yup.string().min(6).max(80).required("Subject is required"),
    message:      Yup.string().min(10).max(500).required("Message is required"),
  });

  const sendEmail = () => {
    emailjs.sendForm(SERVICE, TEMPLETE, form.current, PUBLIC).then(
      () => toast.success("Message sent! I'll get back to you soon."),
      () => toast.error("Server error — please try again later.")
    );
  };

  return (
    <section ref={rootRef} id="contact" className="section-pad bg-muted/20">
      <div className="section-container">

        {/* Heading */}
        <div className="contact-heading text-center mb-14 sm:mb-20">
          <p className="label-eyebrow mb-3">Say Hello</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-foreground">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">
              Touch
            </span>
          </h2>
          <p className="mt-4 max-w-md mx-auto prose-body">
            I'm open to new projects, creative ideas, or opportunities.
            Let's build something great together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-16 items-start">

          {/* ── Left: contact info ── */}
          <div className="contact-left space-y-6">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-1">Don't be shy!</h3>
              <p className="prose-body">
                Feel free to reach out. I am always open to discussing new
                projects, creative ideas, or opportunities to collaborate.
              </p>
            </div>

            <div className="space-y-3">
              <ContactCard
                icon={Mail}
                label="Email"
                value="suriya.fsd@gmail.com"
                href="mailto:suriya.fsd@gmail.com"
              />
              <ContactCard
                icon={Phone}
                label="Phone"
                value="+91-7639718893"
                href="tel:+917639718893"
              />
            </div>

            {/* Social links */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Follow Me
              </p>
              <div className="flex gap-3">
                {[
                  { href: "https://linkedin.com/in/suriya-kesavamurthy-50616825a", Icon: LinkedinIcon, label: "LinkedIn" },
                  { href: "https://github.com/suriya-k7", Icon: GithubIcon, label: "GitHub" },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60
                      text-muted-foreground transition-all duration-300
                      hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-105"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: form ── */}
          <Formik
            initialValues={{ from_name: "", from_email: "", from_subject: "", message: "" }}
            validationSchema={validate}
            onSubmit={(values, { resetForm }) => { sendEmail(values); resetForm(); }}
          >
            {() => (
              <Form
                ref={form}
                className="contact-form space-y-4 rounded-2xl border border-border/60
                  bg-card p-6 sm:p-8 shadow-sm"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextField name="from_name" placeholder="Your Name" type="text" />
                  <TextField name="from_email" placeholder="Your Email" type="email" />
                </div>
                <TextField name="from_subject" placeholder="Subject" type="text" />
                <TextField name="message" placeholder="Your message…" type="textarea" />

                <Button
                  type="submit"
                  size="lg"
                  className="group w-full sm:w-auto gap-2 rounded-full px-8 cursor-pointer
                    shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35
                    transition-all duration-300"
                >
                  Send Message
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default Contact;
