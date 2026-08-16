export default function SectionHeading({ eyebrow, title, description, headingId }) {
  return (
    <div className="mb-10 max-w-[780px]">
      <p className="mb-4 flex items-center gap-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cyan-300">
        <span className="h-px w-7 bg-cyan-300/55" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={headingId} className="text-[clamp(2rem,4.3vw,3.65rem)] font-semibold leading-[1.06] tracking-[-0.045em] text-slate-50">
        {title}
      </h2>
      {description ? <p className="mt-5 max-w-[66ch] text-base leading-7 text-slate-400">{description}</p> : null}
    </div>
  )
}
