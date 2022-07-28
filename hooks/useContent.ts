import { Content, getContent } from "../store/content";
import { useRecoilValue } from "recoil";
import { languageState } from "../store/content";

export function useContent(): Content {
  const language = useRecoilValue(languageState)
  return getContent(language);
}
