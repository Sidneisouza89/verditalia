# Verditalia

Site institucional — Vida com natureza e beleza.

Stack: React + Vite + Tailwind CSS.

## Rodando localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
npm run preview
```

## Estrutura

```
src/
  components/   -> Header, DestinoCard (reutilizáveis)
  sections/     -> Hero, Destinos, PlanejamentoConteudo, NossaCasa, Footer
  App.jsx       -> composição da home
```

## Deploy no Railway

1. Suba este repositório no GitHub.
2. No Railway: New Project → Deploy from GitHub repo.
3. Railway detecta o Vite automaticamente. Se precisar, configure:
   - Build command: `npm run build`
   - Start command: `npx serve dist -s -l $PORT` (ou usar um Static Site service)
4. Adicione domínio customizado depois do primeiro deploy.

## Notas

- As imagens usadas neste scaffold são placeholders do Unsplash — substituir
  pelas fotos originais da Lídice (créditos autorais) antes de publicar.
- Paleta e tipografia (Fraunces + Work Sans) seguem o design de referência
  enviado pela cliente. Ajustar `tailwind.config.js` caso a marca evolua.
