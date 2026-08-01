import { useEffect, useRef, useState } from 'react'

export default function DeferredSection({ loader, id, className = '', rootMargin = '280px 0px', forceLoad = false }) {
  const sectionRef = useRef(null)
  const [SectionComponent, setSectionComponent] = useState(null)

  useEffect(() => {
    let mounted = true

    const loadSection = async () => {
      const module = await loader()
      if (mounted) {
        setSectionComponent(() => module.default)
      }
    }

    if (forceLoad) {
      void loadSection()
      return () => {
        mounted = false
      }
    }

    const sectionEl = sectionRef.current
    if (!sectionEl) {
      void loadSection()
      return () => {
        mounted = false
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          observer.disconnect()
          void loadSection()
        }
      },
      { root: null, rootMargin, threshold: 0.01 },
    )

    observer.observe(sectionEl)

    return () => {
      mounted = false
      observer.disconnect()
    }
  }, [forceLoad, loader, rootMargin])

  return (
    <div
      id={id}
      ref={sectionRef}
      className={className}
      data-deferred-section
      data-loaded={SectionComponent ? 'true' : 'false'}
    >
      {SectionComponent ? <SectionComponent /> : null}
    </div>
  )
}
