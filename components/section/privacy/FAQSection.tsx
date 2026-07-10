import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { FAQContactCard, type FAQContactCardProps } from "@/components/ui/FAQContactCard";

export type FAQSectionProps = {
  title?: string;
  items: AccordionItem[];
  contact: FAQContactCardProps;
  className?: string;
};

export function FAQSection({ title = "FAQ", items, contact, className = "" }: FAQSectionProps) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-16 lg:px-10 ${className}`}>
      <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-12">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
          <div className="mt-8">
            <Accordion items={items} />
          </div>
        </div>

        <FAQContactCard {...contact} />
      </div>
    </section>
  );
}
