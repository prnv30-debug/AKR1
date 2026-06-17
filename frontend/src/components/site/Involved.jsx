import { useState } from "react";
import { Heart, Send, CheckCircle2, Loader2 } from "lucide-react";
import { submitContact, submitVolunteer } from "../../lib/api";
import { toast } from "sonner";

export const Involved = () => {
  return (
    <section id="involved" data-testid="involved-section" className="py-24 lg:py-32 bg-[#0A1128] text-white relative overflow-hidden">
      <div className="absolute inset-0 grain opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-[#EA580C]" />
              <span className="font-display uppercase tracking-[0.2em] text-xs font-medium text-[#EA580C]">
                05 — Get Involved
              </span>
            </div>
            <h2 className="font-display font-black tracking-tighter text-4xl lg:text-5xl leading-[1.05]">
              This movement belongs
              <br />
              to <span className="font-serif-quote italic font-medium text-[#EA580C]">you.</span>
            </h2>
            <p className="mt-6 text-white/70 text-lg max-w-2xl">
              Volunteer your time, share your story, or simply say hello. Every
              voice makes the wave.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 border border-white/10">
          <VolunteerForm />
          <ContactForm />
        </div>

        {/* Donate strip */}
        <div id="donate" data-testid="donate-strip" className="mt-16 border border-white/15 p-8 lg:p-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#EA580C] mb-2">Stand with us</div>
            <h3 className="font-display font-black tracking-tighter text-3xl lg:text-4xl">
              Donate to the AGR Trust today.
            </h3>
            <p className="mt-3 text-white/70 max-w-xl">
              100% of contributions go directly to programmes on the ground —
              education, healthcare, and women-led livelihoods.
            </p>
          </div>
          <div className="md:text-right">
            <a
              href="#volunteer"
              data-testid="donate-cta-btn"
              className="inline-flex items-center gap-2 bg-[#EA580C] hover:bg-[#C2410C] text-white px-8 py-4 font-semibold text-lg transition-all"
            >
              <Heart size={18} /> Donate Now
            </a>
            <div className="mt-3 text-xs text-white/50 uppercase tracking-widest">
              80G tax exemption available
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const initVol = { name: "", email: "", phone: "", city: "", interest: "Door to door campaign", message: "" };
const initCon = { name: "", email: "", subject: "", message: "" };

const VolunteerForm = () => {
  const [form, setForm] = useState(initVol);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitVolunteer(form);
      setDone(true);
      setForm(initVol);
      toast.success("Thank you for joining the movement!");
    } catch (err) {
      const msg = err?.response?.data?.detail || "Submission failed. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  if (done)
    return (
      <div data-testid="volunteer-success" className="bg-[#0A1128] p-10 lg:p-12 flex flex-col items-start gap-4">
        <CheckCircle2 size={40} className="text-[#EA580C]" />
        <h3 className="font-display font-black text-3xl">You&apos;re on board.</h3>
        <p className="text-white/70">A coordinator will reach out within 48 hours. Welcome to the team.</p>
        <button onClick={() => setDone(false)} data-testid="volunteer-reset" className="mt-4 text-sm font-semibold text-[#EA580C] underline underline-offset-4">
          Sign up another volunteer
        </button>
      </div>
    );

  return (
    <form id="volunteer" onSubmit={submit} data-testid="volunteer-form" className="bg-[#0A1128] p-8 lg:p-12">
      <div className="font-display uppercase tracking-[0.2em] text-xs text-[#EA580C] mb-2">Volunteer</div>
      <h3 className="font-display font-black text-3xl mb-8">Join the movement</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full name" value={form.name} onChange={update("name")} required testId="vol-name" />
        <Field label="Email" type="email" value={form.email} onChange={update("email")} required testId="vol-email" />
        <Field label="Phone" value={form.phone} onChange={update("phone")} required testId="vol-phone" />
        <Field label="City" value={form.city} onChange={update("city")} required testId="vol-city" />
      </div>

      <div className="mt-4">
        <label className="block text-[10px] uppercase tracking-[0.2em] text-white/60 mb-2">How would you like to help?</label>
        <select
          data-testid="vol-interest"
          value={form.interest}
          onChange={update("interest")}
          className="w-full bg-transparent border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#EA580C]"
        >
          {["Door to door campaign", "Event coordination", "Social media", "AGR Trust programmes", "Translation", "Other"].map((o) => (
            <option key={o} value={o} className="bg-[#0A1128]">{o}</option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label className="block text-[10px] uppercase tracking-[0.2em] text-white/60 mb-2">Message (optional)</label>
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
        {loading ? "Submitting..." : "Sign me up"}
      </button>
    </form>
  );
};

const ContactForm = () => {
  const [form, setForm] = useState(initCon);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact(form);
      setDone(true);
      setForm(initCon);
      toast.success("Message sent. We&apos;ll be in touch.");
    } catch (err) {
      const msg = err?.response?.data?.detail || "Submission failed. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  if (done)
    return (
      <div data-testid="contact-success" className="bg-[#0A1128] p-10 lg:p-12 flex flex-col items-start gap-4">
        <CheckCircle2 size={40} className="text-[#EA580C]" />
        <h3 className="font-display font-black text-3xl">Message received.</h3>
        <p className="text-white/70">Thank you for writing in. Our team responds within 2-3 working days.</p>
        <button onClick={() => setDone(false)} data-testid="contact-reset" className="mt-4 text-sm font-semibold text-[#EA580C] underline underline-offset-4">
          Send another message
        </button>
      </div>
    );

  return (
    <form id="contact" onSubmit={submit} data-testid="contact-form" className="bg-[#0A1128] p-8 lg:p-12">
      <div className="font-display uppercase tracking-[0.2em] text-xs text-[#EA580C] mb-2">Contact</div>
      <h3 className="font-display font-black text-3xl mb-8">Write to us</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Your name" value={form.name} onChange={update("name")} required testId="con-name" />
        <Field label="Email" type="email" value={form.email} onChange={update("email")} required testId="con-email" />
      </div>
      <Field label="Subject" value={form.subject} onChange={update("subject")} required testId="con-subject" className="mt-4" />

      <div className="mt-4">
        <label className="block text-[10px] uppercase tracking-[0.2em] text-white/60 mb-2">Message</label>
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
        {loading ? "Sending..." : "Send message"}
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
