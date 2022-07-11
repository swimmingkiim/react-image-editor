import { useTranslation } from "react-i18next";

export type Category = "widget" | "hotkey" | "workMode";

const useI18n = () => {
  const { t } = useTranslation(["widget", "hotkey", "workMode"]);

  const getTranslation = (category: "widget" | "hotkey" | "workMode", ...values: string[]) =>
    t(`${category}:${values.join(":")}`);

  return { getTranslation };
};

export default useI18n;
