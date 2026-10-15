import { Studio } from 'sanity';
import config from './sanity.config';
import { cmsAtivo } from '../cms/config';

// Painel de edição do conteúdo, em /studio. Carregado só quando alguém abre essa página,
// então não pesa no site para os visitantes.
export default function StudioPage() {
  if (!cmsAtivo) {
    return (
      <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 560, margin: '80px auto', padding: '0 16px', lineHeight: 1.5 }}>
        <h1 style={{ fontSize: 22 }}>Painel de conteúdo ainda não configurado</h1>
        <p>
          Falta a variável <code>VITE_SANITY_PROJECT_ID</code> no Railway com o ID do projeto do Sanity. Depois de
          adicionar, faça um novo deploy.
        </p>
      </main>
    );
  }
  return (
    <div style={{ height: '100vh' }}>
      <Studio config={config} />
    </div>
  );
}
