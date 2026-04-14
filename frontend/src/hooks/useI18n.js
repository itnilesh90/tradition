import { useSelector } from "react-redux";
import { translations } from "../i18n/translations";

export const useI18n = () => {
  const language = useSelector((state) => state.settings.language);

  const t = (key) =>
    translations[language]?.[key] ?? translations.en[key] ?? key;

  return { t, language };
};

export default useI18n;
