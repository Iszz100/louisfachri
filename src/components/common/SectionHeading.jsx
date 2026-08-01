export default function SectionHeading({ eyebrow, title, description, headingId }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-cyan-300">{eyebrow}</p>
      <h2 id={headingId} className="text-section font-semibold leading-tight text-slate-100">{title}</h2>
      {description ? <p className="mt-4 text-body leading-relaxed text-slate-300">{description}</p> : null}
    </div>
  )
}
