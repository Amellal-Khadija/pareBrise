import { useState, useEffect, useRef } from 'react'

const VIDEOS = [
  { file: '/video-promo.mp4', label: 'Promo' },
  { file: '/video-remplacement1.mp4', label: 'Remplacement' },
  { file: '/video-technicien.mp4', label: 'Technicien' },
]

export default function Videos({ autoAdvance = true, interval = 5000 }) {
  const [idx, setIdx] = useState(0)
  const [isHover, setIsHover] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!autoAdvance) return
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (!isHover) setIdx(i => (i + 1) % VIDEOS.length)
    }, interval)
    return () => clearInterval(timerRef.current)
  }, [autoAdvance, interval, isHover])

  return (
    <section id="videos" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Vidéos</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div
          className="col-span-1 lg:col-span-2 bg-black rounded-2xl overflow-hidden shadow-lg h-96 flex items-center justify-center"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <video
            key={VIDEOS[idx].file}
            src={VIDEOS[idx].file}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-3">
          {VIDEOS.map((v, i) => (
            <button
              key={v.file}
              onClick={() => setIdx(i)}
              className={`flex items-center gap-3 p-3 rounded-lg text-left transition ${i === idx ? 'bg-blue-50 ring-1 ring-blue-200' : 'bg-white'}`}
            >
              <div className="w-20 h-14 bg-slate-100 rounded-md flex items-center justify-center">
                <svg className="w-6 h-6 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 3v18l15-9L5 3z" /></svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">{v.label}</div>
                <div className="text-xs text-slate-500">Aperçu</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
