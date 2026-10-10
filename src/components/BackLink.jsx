import { Link } from 'react-router-dom';
import { useText } from '../i18n/LanguageContext';

const TEXT = {
  pt: { voltar: '← Voltar para o site' },
  en: { voltar: '← Back to the site' },
};

export default function BackLink() {
  const t = useText(TEXT);
  return (
    <Link to="/" className="text-sm text-forest-700 hover:underline">
      {t.voltar}
    </Link>
  );
}
