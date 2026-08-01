import { motion } from 'framer-motion'
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import { sectionReveal } from '../utils/motion'

export default function ClosingSection() {
  return (
    <section className="pb-10 pt-4 md:pb-14">
      <div className="container-shell">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-10 text-center md:px-9 md:py-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.20),transparent_35%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.12)_0.5px,transparent_0.5px)] [background-size:3px_3px]" />

          <h2 className="relative text-[clamp(1.8rem,4vw,3rem)] font-semibold text-white">Mari Terhubung</h2>
          <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-cyan-300/90" />

          <p className="relative mx-auto mt-6 max-w-xl text-[clamp(0.95rem,1.2vw,1.05rem)] leading-relaxed text-slate-200">
            Saya ingin terus berkembang sebagai system administrator yang terbiasa menangani server Linux secara rapi dan stabil.
            Saya juga berkomitmen melanjutkan latihan cybersecurity dasar lewat praktik lab dan challenge CTF secara konsisten.
          </p>

          <div className="relative mx-auto mt-7 flex w-fit flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:louisfpj@gmail.com"
              className="focus-ring flex h-12 w-12 items-center justify-center rounded-full border border-emerald-300/45 bg-emerald-400/85 text-slate-950 shadow-[0_4px_14px_rgba(52,211,153,0.30)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(52,211,153,0.40)]"
              aria-label="Email"
            >
              <FaEnvelope size={18} />
            </a>
            <a
              href="https://www.instagram.com/luisfahrikah?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noreferrer"
              className="focus-ring flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/45 bg-cyan-400/85 text-slate-950 shadow-[0_4px_14px_rgba(34,211,238,0.30)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(34,211,238,0.40)]"
              aria-label="Instagram"
            >
              <FaInstagram size={19} />
            </a>
            <a
              href="https://github.com/Iszz100"
              target="_blank"
              rel="noreferrer"
              className="focus-ring flex h-12 w-12 items-center justify-center rounded-full border border-blue-300/45 bg-blue-400/85 text-slate-950 shadow-[0_4px_14px_rgba(59,130,246,0.30)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(59,130,246,0.40)]"
              aria-label="GitHub"
            >
              <FaGithub size={19} />
            </a>
            <a
              href="https://www.linkedin.com/in/louis-fachri-putra-jatmiko/"
              target="_blank"
              rel="noreferrer"
              className="focus-ring flex h-12 w-12 items-center justify-center rounded-full border border-purple-300/45 bg-purple-400/85 text-slate-950 shadow-[0_4px_14px_rgba(168,85,247,0.30)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(168,85,247,0.40)]"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={18} />
            </a>
          </div>

          <p className="relative mt-6 flex items-center justify-center gap-2 text-base text-slate-200">
            <FaEnvelope className="text-cyan-300" />
            <span>louisfpj@gmail.com</span>
          </p>
        </motion.div>

        <p className="mt-3 text-center text-sm text-slate-500">© 2026 Portofolio Louis. All rights reserved.</p>
      </div>
    </section>
  )
}
