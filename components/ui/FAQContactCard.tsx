import { Mail, Phone, User } from "lucide-react";
import { socialLinks } from "@/lib/navigation";
import { socialIconMap } from "@/components/ui/SocialIcons";

export type FAQContactCardProps = {
  title?: string;
  description?: string;
  name: string;
  email: string;
  phone: string;
};

export function FAQContactCard({
  title = "Contact Us",
  description = "If you have any questions or suggestions regarding our privacy policy, please contact our Data Protection Officer.",
  name,
  email,
  phone,
}: FAQContactCardProps) {
  return (
    <div className="rounded-2xl border border-black/8 p-8">
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-light">{description}</p>

      <div className="mt-6 flex flex-col gap-3 text-sm text-ink">
        <span className="flex items-center gap-2.5">
          <User className="h-4 w-4 text-muted-light" />
          {name}
        </span>
        <a href={`mailto:${email}`} className="flex items-center gap-2.5 hover:text-ink">
          <Mail className="h-4 w-4 text-muted-light" />
          {email}
        </a>
        <a href={`tel:${phone}`} className="flex items-center gap-2.5 hover:text-ink">
          <Phone className="h-4 w-4 text-muted-light" />
          {phone}
        </a>
      </div>

      <div className="mt-8">
        <h4 className="text-sm font-semibold text-ink">Follow Us</h4>
        <div className="mt-3 flex items-center gap-3">
          {socialLinks.map((social) => {
            const Icon = socialIconMap[social.label];
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-ink/70 transition-colors hover:border-black/25 hover:text-ink"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
