import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { SANITY_DATASET, SANITY_PROJECT_ID } from '../cms/config';
import { SINGLETONS, schemaTypes } from './schemas';

// Menu do painel: só os dois documentos do site, sem opção de criar outros
const estrutura = (S) =>
  S.list()
    .title('Conteúdo do site')
    .items([
      S.listItem().title('Página inicial').id('inicio').child(S.document().schemaType('inicio').documentId('inicio').initialValueTemplate('inicio')),
      S.listItem().title('Sobre').id('sobre').child(S.document().schemaType('sobre').documentId('sobre').initialValueTemplate('sobre')),
    ]);

export default defineConfig({
  name: 'verditalia',
  title: 'Verditalia',
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  basePath: '/studio',
  plugins: [structureTool({ structure: estrutura })],
  schema: {
    types: schemaTypes,
  },
  document: {
    // documentos únicos não aparecem no botão "criar novo" (mas o modelo continua existindo,
    // para o formulário abrir já preenchido com o texto atual do site)
    newDocumentOptions: (opcoes, { creationContext }) =>
      creationContext.type === 'global' ? opcoes.filter(({ templateId }) => !SINGLETONS.includes(templateId)) : opcoes,
    // nos documentos únicos, só publicar, descartar e restaurar (sem duplicar ou apagar)
    actions: (acoes, { schemaType }) =>
      SINGLETONS.includes(schemaType)
        ? acoes.filter(({ action }) => ['publish', 'discardChanges', 'restore'].includes(action))
        : acoes,
  },
});
