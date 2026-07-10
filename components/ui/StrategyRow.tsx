import Image from "next/image";

export type StrategyRowProps = {
  title: string;
  paragraphs: string[];
  image: string;
  /** Which side the photo sits on at desktop width. Defaults to right. */
  imageSide?: "left" | "right";
};

export function StrategyRow({ title, paragraphs, image, imageSide = "right" }: StrategyRowProps) {
  const textBlock = (
    <div className="flex flex-col justify-center gap-4">
      <div className="flex items-start gap-3">
        <span className="mt-1.5 h-4 w-1 shrink-0 rounded-full bg-flame" />
        <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">{title}</h3>
      </div>
      <div className="flex flex-col gap-4 pl-4">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-sm leading-relaxed text-muted-light sm:text-base">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );

  const imageBlock = (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-paper-soft lg:aspect-auto lg:h-full">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 1024px) 55vw, 100vw"
        className="object-cover"
      />
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-14">
      {imageSide === "left" ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
}
