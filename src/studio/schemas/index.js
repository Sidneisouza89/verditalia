// Formulários do painel de conteúdo (Sanity Studio).
// Cada documento é único ("singleton"): Página inicial e Sobre.
// Os campos são bilíngues (Português / English). Campo vazio = o site usa o texto padrão.
// Os formulários já começam preenchidos com o texto atual do site (initialValue).
import { defineArrayMember, defineField, defineType } from 'sanity';
import { TEXT as HERO } from '../../sections/Hero';
import { TEXT as GUIAS, DESTINOS } from '../../sections/Destinos';
import { TEXT as PLAN, VIDEO } from '../../sections/PlanejamentoConteudo';
import { TEXT as CASA } from '../../sections/NossaCasa';
import { TEXT as SOBRE } from '../../sections/Sobre';

// ---------- tipos bilíngues ----------

const textoBilingue = (name, title, linhas) =>
  defineType({
    name,
    title,
    type: 'object',
    options: { columns: 2 },
    fields: [
      defineField({ name: 'pt', title: 'Português', type: linhas ? 'text' : 'string', rows: linhas }),
      defineField({ name: 'en', title: 'English', type: linhas ? 'text' : 'string', rows: linhas }),
    ],
    preview: { select: { title: 'pt', subtitle: 'en' } },
  });

const localeString = textoBilingue('localeString', 'Texto curto');
const localeText = textoBilingue('localeText', 'Texto', 4);

// valores iniciais a partir dos textos do site
const par = (pt, en) => ({ _type: 'localeString', pt, en });
const parLongo = (pt, en) => ({ _type: 'localeText', pt, en });
const lista = (pts, ens, longo) =>
  pts.map((pt, i) => ({ _key: `i${i}`, ...(longo ? parLongo(pt, ens[i]) : par(pt, ens[i])) }));

const foto = (name, title, description) =>
  defineField({
    name,
    title,
    type: 'image',
    description,
    options: { hotspot: true },
    fields: [defineField({ name: 'alt', title: 'Descrição da foto (acessibilidade)', type: 'localeString' })],
  });

// ---------- Página inicial ----------

const guia = defineType({
  name: 'guia',
  title: 'Guia',
  type: 'object',
  fields: [
    defineField({
      name: 'id',
      title: 'Identificador',
      type: 'string',
      description: 'Usado para o ícone do card (dolomitas, umbria, roma). Não precisa mudar.',
    }),
    defineField({ name: 'titulo', title: 'Nome do guia', type: 'localeString' }),
    defineField({ name: 'descricao', title: 'Descrição curta', type: 'localeText' }),
    defineField({
      name: 'destaques',
      title: 'Destaques',
      description: 'Frases curtas que aparecem no card. Pode começar com um emoji.',
      type: 'array',
      of: [defineArrayMember({ type: 'localeString' })],
    }),
    foto('foto', 'Foto do card'),
    defineField({
      name: 'link',
      title: 'Link de compra (Hotmart)',
      type: 'url',
      description: 'Deixe vazio enquanto o guia estiver em produção.',
    }),
    defineField({
      name: 'emBreve',
      title: 'Guia em produção ("Em breve")',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: { select: { title: 'titulo.pt', subtitle: 'link', media: 'foto' } },
});

const inicio = defineType({
  name: 'inicio',
  title: 'Página inicial',
  type: 'document',
  groups: [
    { name: 'capa', title: 'Capa', default: true },
    { name: 'guias', title: 'Guias' },
    { name: 'planejamento', title: 'Consultoria' },
    { name: 'youtube', title: 'YouTube' },
    { name: 'casa', title: 'Nossa casa' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Capa',
      type: 'object',
      group: 'capa',
      fields: [
        defineField({
          name: 'titulo',
          title: 'Frase da capa',
          type: 'localeText',
          description: 'Cada linha vira uma linha na capa.',
        }),
        foto('foto', 'Foto da capa', 'Use uma foto na horizontal, de boa resolução (2000 px de largura ou mais).'),
        defineField({ name: 'credito', title: 'Crédito da foto (canto da capa)', type: 'localeText' }),
      ],
    }),
    defineField({
      name: 'guias',
      title: 'Guias autorais',
      type: 'object',
      group: 'guias',
      fields: [
        defineField({ name: 'eyebrow', title: 'Etiqueta', type: 'localeString' }),
        defineField({ name: 'titulo', title: 'Título', type: 'localeString' }),
        defineField({
          name: 'lista',
          title: 'Guias',
          description: 'A ordem aqui é a ordem no site.',
          type: 'array',
          of: [defineArrayMember({ type: 'guia' })],
        }),
      ],
    }),
    defineField({
      name: 'planejamento',
      title: 'Consultoria (planejamento personalizado)',
      type: 'object',
      group: 'planejamento',
      fields: [
        defineField({ name: 'eyebrow', title: 'Etiqueta', type: 'localeString' }),
        defineField({ name: 'titulo', title: 'Título', type: 'localeString' }),
        defineField({ name: 'texto', title: 'Texto', type: 'localeText' }),
        defineField({
          name: 'beneficios',
          title: 'Itens com ✓',
          type: 'array',
          of: [defineArrayMember({ type: 'localeString' })],
        }),
        foto('foto', 'Foto'),
      ],
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube',
      type: 'object',
      group: 'youtube',
      fields: [
        defineField({ name: 'eyebrow', title: 'Etiqueta', type: 'localeString' }),
        defineField({ name: 'titulo', title: 'Título', type: 'localeString' }),
        defineField({ name: 'texto', title: 'Texto', type: 'localeText' }),
        defineField({
          name: 'videoId',
          title: 'Código do vídeo em destaque',
          type: 'string',
          description: 'O código que vem depois de "youtu.be/" no link do vídeo. Ex.: em https://youtu.be/Wg-2UbbbzhY o código é Wg-2UbbbzhY.',
        }),
        defineField({ name: 'videoTitulo', title: 'Título do vídeo (aparece na capa)', type: 'localeString' }),
        foto('capa', 'Capa própria do vídeo (opcional)', 'Sem capa, o site usa a miniatura do próprio YouTube.'),
      ],
    }),
    defineField({
      name: 'nossaCasa',
      title: 'Nossa casa',
      type: 'object',
      group: 'casa',
      fields: [
        defineField({ name: 'eyebrow', title: 'Etiqueta', type: 'localeString' }),
        defineField({ name: 'titulo', title: 'Título', type: 'localeString' }),
        defineField({ name: 'texto', title: 'Texto', type: 'localeText' }),
        foto('foto', 'Foto', 'Foto horizontal da região.'),
      ],
    }),
  ],
  initialValue: () => ({
    hero: {
      titulo: parLongo(HERO.pt.linhas.join('\n'), HERO.en.linhas.join('\n')),
      credito: parLongo(HERO.pt.credito.join('\n'), HERO.en.credito.join('\n')),
    },
    guias: {
      eyebrow: par(GUIAS.pt.eyebrow, GUIAS.en.eyebrow),
      titulo: par(GUIAS.pt.titulo, GUIAS.en.titulo),
      lista: DESTINOS.map((d) => ({
        _key: d.slug,
        _type: 'guia',
        id: d.slug,
        titulo: par(GUIAS.pt.guias[d.slug].title, GUIAS.en.guias[d.slug].title),
        descricao: parLongo(GUIAS.pt.guias[d.slug].description, GUIAS.en.guias[d.slug].description),
        destaques: lista(GUIAS.pt.guias[d.slug].stats, GUIAS.en.guias[d.slug].stats),
        link: d.checkoutUrl,
        emBreve: Boolean(d.comingSoon),
      })),
    },
    planejamento: {
      eyebrow: par(PLAN.pt.planEyebrow, PLAN.en.planEyebrow),
      titulo: par(PLAN.pt.planTitulo, PLAN.en.planTitulo),
      texto: parLongo(PLAN.pt.planCorpo, PLAN.en.planCorpo),
      beneficios: lista(PLAN.pt.beneficios, PLAN.en.beneficios),
    },
    youtube: {
      eyebrow: par(PLAN.pt.ytEyebrow, PLAN.en.ytEyebrow),
      titulo: par(PLAN.pt.ytTitulo, PLAN.en.ytTitulo),
      texto: parLongo(PLAN.pt.ytCorpo, PLAN.en.ytCorpo),
      videoId: VIDEO.id,
      videoTitulo: par(VIDEO.titulo, VIDEO.titulo),
    },
    nossaCasa: {
      eyebrow: par(CASA.pt.eyebrow, CASA.en.eyebrow),
      titulo: par(CASA.pt.titulo, CASA.en.titulo),
      texto: parLongo(CASA.pt.corpo, CASA.en.corpo),
    },
  }),
  preview: { prepare: () => ({ title: 'Página inicial' }) },
});

// ---------- Sobre ----------

const sobre = defineType({
  name: 'sobre',
  title: 'Sobre',
  type: 'document',
  groups: [
    { name: 'quem', title: 'Quem sou eu', default: true },
    { name: 'alpes', title: 'Alpes Italianos' },
    { name: 'nasceu', title: 'E assim nasceu' },
  ],
  fields: [
    defineField({ name: 'titulo', title: 'Título', type: 'localeString', group: 'quem' }),
    foto('foto', 'Foto principal', 'Foto na vertical funciona melhor.'),
    defineField({
      name: 'bio',
      title: 'Parágrafos da história',
      type: 'array',
      group: 'quem',
      of: [defineArrayMember({ type: 'localeText' })],
    }),
    defineField({ name: 'bioFecho', title: 'Frase final (em destaque)', type: 'localeString', group: 'quem' }),
    defineField({ name: 'alpesTitulo', title: 'Título', type: 'localeString', group: 'alpes' }),
    defineField({
      name: 'alpes',
      title: 'Parágrafos',
      type: 'array',
      group: 'alpes',
      of: [defineArrayMember({ type: 'localeText' })],
    }),
    defineField({ name: 'citacao', title: 'Citação sobre a foto', type: 'localeText', group: 'alpes' }),
    { ...foto('fotoAlpes', 'Foto dos Alpes'), group: 'alpes' },
    defineField({ name: 'nasceuTitulo', title: 'Título', type: 'localeString', group: 'nasceu' }),
    defineField({
      name: 'nasceu',
      title: 'Parágrafos',
      type: 'array',
      group: 'nasceu',
      of: [defineArrayMember({ type: 'localeText' })],
    }),
    defineField({ name: 'nasceuDestaque', title: 'Frase em destaque', type: 'localeText', group: 'nasceu' }),
  ].map((f) => (f.name === 'foto' ? { ...f, group: 'quem' } : f)),
  initialValue: () => ({
    titulo: par(SOBRE.pt.titulo, SOBRE.en.titulo),
    bio: lista(SOBRE.pt.bio, SOBRE.en.bio, true),
    bioFecho: par(SOBRE.pt.bioFecho, SOBRE.en.bioFecho),
    alpesTitulo: par(SOBRE.pt.alpesTitulo, SOBRE.en.alpesTitulo),
    alpes: lista(SOBRE.pt.alpes, SOBRE.en.alpes, true),
    citacao: parLongo(SOBRE.pt.citacao, SOBRE.en.citacao),
    nasceuTitulo: par(SOBRE.pt.nasceuTitulo, SOBRE.en.nasceuTitulo),
    nasceu: lista(SOBRE.pt.nasceu, SOBRE.en.nasceu, true),
    nasceuDestaque: parLongo(SOBRE.pt.nasceuDestaque, SOBRE.en.nasceuDestaque),
  }),
  preview: { prepare: () => ({ title: 'Sobre' }) },
});

export const schemaTypes = [localeString, localeText, guia, inicio, sobre];
export const SINGLETONS = ['inicio', 'sobre'];
