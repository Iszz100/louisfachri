import { motion } from 'framer-motion'
import SectionHeading from '../components/common/SectionHeading'
import { profile } from '../data/profile'
import useResponsiveMotion from '../hooks/useResponsiveMotion'
import { sectionReveal } from '../utils/motion'

export default function ManifestoSection() {
  const { reduceMotion } = useResponsiveMotion()

  return (
    <section className="section-padding">
      <div className="container-shell">
        <motion.div
          variants={sectionReveal}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="glass-panel rounded-2xl p-6 md:p-10"
        >
          <SectionHeading
            eyebrow="Cara saya belajar"
            title="Kalau penasaran, saya biasanya langsung bikin lab kecil."
          />
          <p className="max-w-4xl text-[clamp(1.05rem,1.6vw,1.4rem)] leading-relaxed text-slate-200">
            {profile.manifesto}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
