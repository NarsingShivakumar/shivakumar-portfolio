type Props = { eyebrow: string; title: string; description?: string; number?: string };

export default function SectionHeading({ eyebrow, title, description, number }: Props) {
  return (
    <div className="section-heading">
      <div className="section-heading-top">
        <span className="eyebrow"><span className="eyebrow-square" />{eyebrow}</span>
        {number && <span className="section-counter">/ {number}</span>}
      </div>
      <div className="section-heading-bottom">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}
