import { useState } from "react";
import { Heart, Send, CheckCircle2, Loader2 } from "lucide-react";
import { submitContact, submitVolunteer } from "../../lib/api";
import { toast } from "sonner";
import { useSite } from "../../content/site.config";

export const Involved = () => {
  const site = useSite();
  const i = site.involved;
  const f = site.forms || {};
  return (
    <section id="involved" data-testid="involved-section" className="py-24 lg:py-32 bg-[#0A1128] text-white relative overflow-hidden">
      <div className="absolute inset-0 grain opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-[#EA580C]" />
              <span className="font-display uppercase tracking-[0.2em] text-xs font-medium text-[#EA580C]">
                {i.eyebrow}
              </span>
            </div>
            <h2 className="font-display font-black tracking-tighter text-4xl lg:text-5xl leading-[1.05]">
              {i.titleLine1}
              <br />
              <span className="font-serif-quote italic font-medium text-[#EA580C]">{i.titleItalic}</span>
            </h2>
            <p className="mt-6 text-white/70 text-lg max-w-2xl">
              {i.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 border border-white/10">
          <VolunteerForm interests={i.volunteerInterests} labels={f.volunteer} />
          <ContactForm labels={f.contact} />
        </div>

        {/* Donate strip */}
        <div id="donate" data-testid="donate-strip" className="mt-16 border border-white/15 p-8 lg:p-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#EA580C] mb-2">{i.donate.eyebrow}</div>
            <h3 className="font-display font-black tracking-tighter text-3xl lg:text-4xl">
              {i.donate.title}
            </h3>
            <p className="mt-3 text-white/70 max-w-xl">
              {i.donate.description}
            </p>
          </div>
          <div className="md:text-right">
            <a
              href={i.donate.ctaHref}
              data-testid="donate-cta-btn"
              className="inline-flex items-center gap-2 bg-[#EA580C] hover:bg-[#C2410C] text-white px-8 py-4 font-semibold text-lg transition-all"
            >
              <Heart size={18} /> {i.donate.ctaLabel}
            </a>
            <div className="mt-3 text-xs text-white/50 uppercase tracking-widest">
              {i.donate.footnote}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const VolunteerForm = ({ interests, labels = {} }) => {
  const initVol = { name: "", email: "", phone: "", city: "", interest: interests[0], message: "" };
  const [form, setForm] = useState(initVol);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const lf = labels.fields || {};

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitVolunteer(form);
      setDone(true);
      setForm(initVol);
      toast.success(labels.toastSuccess || "Thank you!");
    } catch (err) {
      const msg = err?.response?.data?.detail || labels.toastError || "Submission failed.";
      toast.error(typeof msg === "string" ? msg : labels.toastError || "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  if (done)
    return (
      <div data-testid="volunteer-success" className="bg-[#0A1128] p-10 lg:p-12 flex flex-col items-start gap-4">
        <CheckCircle2 size={40} className="text-[#EA580C]" />
        <h3 className="font-display font-black text-3xl">{labels.successTitle}</h3>
        <p className="text-white/70">{labels.successBody}</p>
        <button onClick={() => setDone(false)} data-testid="volunteer-reset" className="mt-4 text-sm font-semibold text-[#EA580C] underline underline-offset-4">
          {labels.successReset}
        </button>
      </div>
    );

  return (
    <form id="volunteer" onSubmit={submit} data-testid="volunteer-form" className="bg-[#0A1128] p-8 lg:p-12">
      <div className="font-display uppercase tracking-[0.2em] text-xs text-[#EA580C] mb-2">{labels.eyebrow}</div>
      <h3 className="font-display font-black text-3xl mb-8">{labels.title}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label={lf.name} value={form.name} onChange={update("name")} required testId="vol-name" />
        <Field label={lf.email} type="email" value={form.email} onChange={update("email")} required testId="vol-email" />
        <Field label={lf.phone} value={form.phone} onChange={update("phone")} required testId="vol-phone" />
        <Field label={lf.city} value={form.city} onChange={update("city")} required testId="vol-city" />
      </div>

      <div className="mt-4">
        <label className="block text-[10px] uppercase tracking-[0.2em] text-white/60 mb-2">{lf.interest}</label>
        <select
          data-testid="vol-interest"
          value={form.interest}
          onChange={update("interest")}
          className="w-full bg-transparent border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#EA580C]"
        >
          {interests.map((o) => (
            <option key={o} value={o} className="bg-[#0A1128]">{o}</option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label className="block text-[10px] uppercase tracking-[0.2em] text-white/60 mb-2">{lf.message}</label>
        <textarea
          data-testid="vol-message"
          value={form.message}
          onChange={update("message")}
          rows={3}
          className="w-full bg-transparent border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#EA580C] resize-none"
        />
      </div>

      <button
        type="submit"
        data-testid="vol-submit"
        disabled={loading}
        className="mt-8 inline-flex items-center gap-2 bg-[#EA580C] hover:bg-[#C2410C] disabled:opacity-60 text-white px-7 py-3.5 font-semibold transition-all"
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
        {loading ? labels.submitting : labels.submit}
      </button>
    </form>
  );
};

const ContactForm = ({ labels = {} }) => {
  const initCon = { name: "", email: "", subject: "", message: "" };
  const [form, setForm] = useState(initCon);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const lf = labels.fields || {};
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact(form);
      setDone(true);
      setForm(initCon);
      toast.success(labels.toastSuccess || "Message sent.");
    } catch (err) {
      const msg = err?.response?.data?.detail || labels.toastError || "Submission failed.";
      toast.error(typeof msg === "string" ? msg : labels.toastError || "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  if (done)
    return (
      <div data-testid="contact-success" className="bg-[#0A1128] p-10 lg:p-12 flex flex-col items-start gap-4">
        <CheckCircle2 size={40} className="text-[#EA580C]" />
        <h3 className="font-display font-black text-3xl">{labels.successTitle}</h3>
        <p className="text-white/70">{labels.successBody}</p>
        <button onClick={() => setDone(false)} data-testid="contact-reset" className="mt-4 text-sm font-semibold text-[#EA580C] underline underline-offset-4">
          {labels.successReset}
        </button>
      </div>
    );

  return (
    <form id="contact" onSubmit={submit} data-testid="contact-form" className="bg-[#0A1128] p-8 lg:p-12">
      <div className="font-display uppercase tracking-[0.2em] text-xs text-[#EA580C] mb-2">{labels.eyebrow}</div>
      <h3 className="font-display font-black text-3xl mb-8">{labels.title}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label={lf.name} value={form.name} onChange={update("name")} required testId="con-name" />
        <Field label={lf.email} type="email" value={form.email} onChange={update("email")} required testId="con-email" />
      </div>
      <Field label={lf.subject} value={form.subject} onChange={update("subject")} required testId="con-subject" className="mt-4" />

      <div className="mt-4">
        <label className="block text-[10px] uppercase tracking-[0.2em] text-white/60 mb-2">{lf.message}</label>
        <textarea
          data-testid="con-message"
          value={form.message}
          onChange={update("message")}
          required
          rows={5}
          className="w-full bg-transparent border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#EA580C] resize-none"
        />
      </div>

      <button
        type="submit"
        data-testid="con-submit"
        disabled={loading}
        className="mt-8 inline-flex items-center gap-2 bg-white hover:bg-[#EA580C] hover:text-white text-[#0A1128] px-7 py-3.5 font-semibold transition-all disabled:opacity-60"
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
        {loading ? labels.submitting : labels.submit}
      </button>
    </form>
  );
};

const Field = ({ label, type = "text", value, onChange, required, testId, className = "" }) => (
  <div className={className}>
    <label className="block text-[10px] uppercase tracking-[0.2em] text-white/60 mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      data-testid={testId}
      className="w-full bg-transparent border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#EA580C] placeholder:text-white/30"
    />
  </div>
);
