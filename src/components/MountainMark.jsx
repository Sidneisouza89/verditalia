// Ícone de montanha (line-art) baseado no logo desenhado da Lídice.
// Recriado à mão como aproximação — se ela exigir fidelidade exata de
// traço, o ideal é exportar o SVG/PNG direto do Canva e substituir aqui.
export default function MountainMark({ className = 'h-7 w-auto', color = 'currentColor' }) {
  return (
    <svg
      viewBox="0 0 200 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 48 C10 46 16 44 22 45 C28 46 32 42 37 40 C42 38 46 41 51 39
           C58 36 62 20 68 12 C73 5 77 4 82 10 C86 15 88 24 92 28
           C96 32 99 26 103 22 C108 17 111 8 116 6 C121 4 125 12 129 18
           C133 24 136 30 141 32 C146 34 150 30 155 32
           C160 34 163 40 168 42 C174 44 180 43 186 45 C192 47 196 46 198 47"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
