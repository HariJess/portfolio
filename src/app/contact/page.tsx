"use client";
import DynamicSvgIcon from "../../components/svg/DynamicSvgIcon";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import Alert from "@/components/Alert";
import LoadingBar from "@/components/LoadingBar";
import TimeDisplay from "@/components/TimeDisplay";

const Contact = () => {
  const contactBoxList = [
    {
      name: "LinkedIn",
      icon: "linkedin",
      href: "https://www.linkedin.com/in/harijesy-rakotoarisoa-5301872b6",
    },
    { name: "Github", icon: "github", href: "https://github.com/HariJess" },
    {
      name: "Gmail",
      icon: "mail",
      href: "https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=rakotoarisoaharijesy@gmail.com&subject=MISSED%20CALL%20EZTRADER&body=Just%20wanted%20to%20say%20hi%20:D",
    },
  ];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [contactActive, setContactActive] = useState(true);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [alertKey, setAlertKey] = useState(0);
  const [errorFields, setErrorFields] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [shakeFields, setShakeFields] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      const newErrors = {
        name: !name,
        email: !email,
        message: !message,
      };
      setErrorFields(newErrors);
      setShakeFields(newErrors);
      setTimeout(() => setShakeFields({}), 500);
      setAlert({ type: "error", message: "All fields are required!" });
      setAlertKey(Date.now());
      return;
    }
    setLoading(true);
    setAlertKey(Date.now());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ name, email, message }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        setAlert({ type: "success", message: "Message sent successfully!" });
        setAlertKey(Date.now());
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setAlert({
          type: "error",
          message: data.error || "Failed to send message.",
        });
        setAlertKey(Date.now());
      }
    } catch {
      setAlert({ type: "error", message: "Server error occurred." });
      setAlertKey(Date.now());
    }
    setLoading(false);
  };

  const context = useAppContext();

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden flex flex-col">
      <div className="flex flex-col lg:flex-row flex-1 min-h-0">
        {/* Left Section - Sidebar with Social Links */}
        <section className="flex max-w-full md:max-w-[275px] w-full border-b lg:border-b-0">
          <div className="px-4 py-4 border-r border-line lg:block hidden">
            <DynamicSvgIcon name="mail" className="w-6" />
          </div>
          <div className="flex flex-col flex-1 border-r border-line">
            <div>
              <h4
                onClick={() => setContactActive(!contactActive)}
                className="sticky top-0 z-10 bg-primary cursor-pointer text-secondary flex gap-2 px-6 p-2 border-b border-line"
              >
                <DynamicSvgIcon
                  name="trianglePrimary"
                  className={`w-[10px] ${
                    contactActive ? "" : "-rotate-90"
                  } transition-all`}
                />
                connect
              </h4>
              <nav
                className={`flex lg:flex-col gap-4 px-6 my-2 transition-maxHeight ${
                  contactActive ? "max-h-60" : "max-h-0"
                } overflow-hidden`}
              >
                {contactBoxList.map((contact) => (
                  <a
                    target="_blank"
                    href={contact.href}
                    className="cursor-link flex items-center gap-3 text-tertiary hover:text-accent transition-colors text-sm hover:button-hover hover:rounded-lg"
                    key={contact.name}
                    rel="noopener noreferrer"
                  >
                    <DynamicSvgIcon
                      name={contact.icon}
                      className="w-4 h-4 fill-current flex-shrink-0"
                    />
                    <span className="hidden lg:inline">{contact.name}</span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Status Section */}
            {/* <div className="border-t border-line">
              <h4 className="text-secondary flex gap-2 py-2 px-6 border-b border-line cursor-pointer">
                <DynamicSvgIcon
                  name="trianglePrimary"
                  className="w-[10px] transition-all"
                />
                status
              </h4>
              <div className="px-6 py-3 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-secondary text-xs">
                    Available for work
                  </span>
                </div>
              </div>
            </div> */}
          </div>
        </section>

        {/* Main Content Section */}
        <div className="flex flex-col flex-1 lg:flex-row min-h-0">
          {/* Form Section */}
          <section className="flex-1 min-w-0 flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-y-auto">
            <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
              <div>
                <h2 className="text-secondary text-xl md:text-2xl font-medium my-8 pt-12">
                  Send me a message
                </h2>
              </div>

              <label htmlFor="name" className="block">
                <span className="block text-tertiary text-sm font-medium mb-2">
                  _name:
                </span>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={`w-full px-4 py-3 bg-primary border border-solid ${
                    errorFields.name ? "border-red-500" : "border-line"
                  } rounded-lg text-secondary text-sm focus:outline-none focus:border-accent transition-colors ${
                    shakeFields.name ? "animate-shake" : ""
                  }`}
                  autoComplete="off"
                  placeholder="Jonathan Davis"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errorFields.name)
                      setErrorFields((prev) => ({ ...prev, name: false }));
                  }}
                />
              </label>

              <label htmlFor="email" className="block">
                <span className="block text-tertiary text-sm font-medium mb-2">
                  _email:
                </span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`w-full px-4 py-3 bg-primary border border-solid ${
                    errorFields.email ? "border-red-500" : "border-line"
                  } rounded-lg text-secondary text-sm focus:outline-none focus:border-accent transition-colors ${
                    shakeFields.email ? "animate-shake" : ""
                  }`}
                  autoComplete="off"
                  placeholder="jonathan-davis@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorFields.email)
                      setErrorFields((prev) => ({ ...prev, email: false }));
                  }}
                />
              </label>

              <label htmlFor="message" className="block">
                <span className="block text-tertiary text-sm font-medium mb-2">
                  _message:
                </span>
                <textarea
                  name="message"
                  id="message"
                  rows={6}
                  className={`w-full px-4 py-3 bg-primary border border-solid ${
                    errorFields.message ? "border-red-500" : "border-line"
                  } rounded-lg text-secondary text-sm focus:outline-none focus:border-accent transition-colors resize-none ${
                    shakeFields.message ? "animate-shake" : ""
                  }`}
                  placeholder="your message here ..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errorFields.message)
                      setErrorFields((prev) => ({ ...prev, message: false }));
                  }}
                />
              </label>

              <button
                type="submit"
                className="w-full group inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-accent text-primary font-medium shadow-lg hover:ring-2 ring-accent ring-offset-4 active:ring-offset-1 ring-offset-primary transition-all border border-solid border-accent disabled:opacity-50 disabled:pointer-events-none disabled:ring-0"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span>Sending</span>
                    <span className="sending-dots"></span>
                  </>
                ) : (
                  <>
                    <span>submit-message</span>
                  </>
                )}
              </button>
            </form>
          </section>

          {/* Code Preview Section - Interactive */}
          <section className="hidden lg:flex flex-1 flex-col border-l border-solid border-line bg-primary">
            <div className="flex items-center px-4 py-3 border-b border-line">
              <span className="text-tertiary text-xs font-mono truncate">
                contact.tsx
              </span>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
              <pre className="text-secondary font-mono text-sm leading-7">
                <span className="text-tertiary">1</span>
                <span className="ml-4">
                  <span className="text-purple-400">const</span>
                  <span className="text-secondary"> button = </span>
                  <span className="text-blue-400">document</span>
                  <span className="text-secondary">.</span>
                  <span className="text-blue-400">querySelector</span>
                  <span className="text-secondary">(</span>
                  <span className="text-green-400">'#sendBtn'</span>
                  <span className="text-secondary">);</span>
                </span>
                <br />
                <span className="text-tertiary">2</span>
                <br />
                <span className="text-tertiary">3</span>
                <span className="ml-4">
                  <span className="text-purple-400">const</span>
                  <span className="text-secondary"> message = </span>
                  <span className="text-orange-400">{"{"}</span>
                </span>
                <br />
                <span className="text-tertiary">4</span>
                <span
                  className={`ml-8 ${
                    !name ? "" : "text-green-400 font-semibold"
                  }`}
                >
                  <span className="text-blue-400">name</span>
                  <span className="text-secondary">: </span>
                  <span className="text-green-400">"{name || ""}"</span>
                  <span className="text-secondary">,</span>
                </span>
                <br />
                <span className="text-tertiary">5</span>
                <span
                  className={`ml-8 ${
                    !email ? "" : "text-green-400 font-semibold"
                  }`}
                >
                  <span className="text-blue-400">email</span>
                  <span className="text-secondary">: </span>
                  <span className="text-green-400">"{email || ""}"</span>
                  <span className="text-secondary">,</span>
                </span>
                <br />
                <span className="text-tertiary">6</span>
                <span
                  className={`ml-8 ${
                    !message ? "" : "text-green-400 font-semibold"
                  }`}
                >
                  <span className="text-blue-400">message</span>
                  <span className="text-secondary">: </span>
                  <span className="text-green-400">"{message || ""}"</span>
                  <span className="text-secondary">,</span>
                </span>
                <br />
                <span className="text-tertiary">7</span>
                <span className="ml-8">
                  <span className="text-blue-400">date</span>
                  <span className="text-secondary">: </span>
                  <span className="text-green-400">
                    "
                    {new Date().toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                    "
                  </span>
                </span>
                <br />
                <span className="text-tertiary">8</span>
                <span className="ml-4">
                  <span className="text-orange-400">{"}"}</span>
                </span>
                <br />
                <span className="text-tertiary">9</span>
                <br />
                <span className="text-tertiary">10</span>
                <span className="ml-4">
                  <span className="text-blue-400">button</span>
                  <span className="text-secondary">.</span>
                  <span className="text-blue-400">addEventListener</span>
                  <span className="text-secondary">{"("}</span>
                  <span className="text-green-400">'click'</span>
                  <span className="text-secondary">, () </span>
                  <span className="text-purple-400">{"=>"}</span>
                  <span className="text-secondary"> {"{"}</span>
                </span>
                <br />
                <span className="text-tertiary">11</span>
                <span
                  className={`ml-6 ${
                    name && email && message
                      ? "text-green-400 font-semibold"
                      : ""
                  }`}
                >
                  <span className="text-blue-400">form</span>
                  <span className="text-secondary">.</span>
                  <span className="text-blue-400">send</span>
                  <span className="text-secondary">(message);</span>
                </span>
                <br />
                <span className="text-tertiary">12</span>
                <span className="ml-4">
                  <span className="text-secondary">{"}"}</span>
                </span>
              </pre>
            </div>
          </section>
        </div>
      </div>

      <LoadingBar show={loading} />
      {alert && (
        <Alert
          key={alertKey}
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
          showLoadingBar={true}
          setAlert={setAlert}
        />
      )}
    </div>
  );
};

export default Contact;
