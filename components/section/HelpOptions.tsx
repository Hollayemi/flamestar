import Link from "next/link";

export type HelpOptionsProps = {
  title?: string;
  badge?: string;
  phoneNumber?: string;
  whatsappHref?: string;
  email?: string;
  address?: string;
  className?: string;
};

export function HelpOptions({
  title = "We're here to help",
  badge = "Fastest Response Time",
  phoneNumber = "08122220683",
  whatsappHref = "https://wa.me/2348122220683",
  email = "info@flamestarcapital.com",
  address = "9A Oki Lane, Mende, Maryland, Lagos State",
  className = "",
}: HelpOptionsProps) {
  return (
    <section className={`mx-auto max-w-3xl px-6 py-20 lg:px-10 ${className}`}>
      <h2 className="text-center font-display text-2xl font-semibold text-ink sm:text-3xl">
        {title}
      </h2>

      <div className="mt-10 rounded-2xl border relative border-black/8 bg-paper p-8">
        <span className="inline-block absolute -top-[14px] mx-auto rounded-full bg-flame px-4 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-paper">
          {badge}
        </span>

        <h3 className="mt-5 font-display text-xl font-semibold text-ink">Call or Chat with us</h3>
        <p className="mt-1 text-sm text-muted-light">
          The best option for quick questions or support
        </p>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-10 sm:divide-x sm:divide-black/8">
          <div>
            <h4 className="text-sm font-semibold text-ink">On our hotline</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-light">
              Call us on our hotline to get connected with our customer support staff to get your
              queries answered.
            </p>
            <a
              href={`tel:${phoneNumber}`}
              className="mt-5 inline-flex items-center rounded-full border border-flame/40 px-5 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-flame transition-colors hover:bg-flame/5"
            >
              Call {phoneNumber}
            </a>
          </div>

          <div className="sm:pl-10">
            <h4 className="text-sm font-semibold text-ink">On WhatsApp</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-light">
              Chat with our support team on WhatsApp to get your queries sorted out quick.
            </p>
            <Link
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center rounded-full border border-[#25D366]/50 px-5 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#1DA851] transition-colors hover:bg-[#25D366]/5"
            >
              Chat with us
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-black/8 bg-paper p-8">
        <h3 className="font-display text-xl font-semibold text-ink">Send an Email</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-light">
          The best option for formal request, follow up or to schedule an appointment.
        </p>
        <p className="mt-5 text-sm text-muted-light">
          General inquiries:{" "}
          <a href={`mailto:${email}`} className="font-semibold text-ink">
            {email}
          </a>
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-black/8 bg-paper p-8">
        <h3 className="font-display text-xl font-semibold text-ink">Find our Office</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-light">
          Visit us at our head office at the address provided below
        </p>
        <p className="mt-5 text-sm text-ink">{address}</p>
      </div>
    </section>
  );
}
