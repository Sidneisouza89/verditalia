export default function DestinoCard({ icon, image, title, description, stats, checkoutUrl, comingSoon }) {
  return (
    <div className="relative rounded-2xl overflow-hidden h-[420px] group">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-900/95 via-forest-900/40 to-forest-900/10" />

      <div className="absolute top-5 left-5 w-11 h-11 rounded-full bg-forest-800/80 backdrop-blur-sm flex items-center justify-center text-cream-100">
        {icon}
      </div>

      {comingSoon && (
        <span className="absolute top-5 right-5 bg-cream-100 text-forest-900 text-[11px] font-medium px-3 py-1.5 rounded-full">
          Em breve
        </span>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="font-display text-2xl mb-2 tracking-wide">{title}</h3>
        <p className="text-white/85 text-sm leading-relaxed mb-4">{description}</p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/75 mb-4 pb-4 border-b border-white/15">
          {stats.map((s) => (
            <span key={s} className="flex items-center gap-1">
              {s}
            </span>
          ))}
        </div>

        {comingSoon ? (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60">
            Guia em produção
          </span>
        ) : (
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
          >
            Conhecer guia <span aria-hidden>→</span>
          </a>
        )}
      </div>
    </div>
  );
}
