export interface Lesson {
  fr: string;
  es: string;
  audio?: string;
}

export interface Module {
  id: number;
  title: string;
  icon: string;
  description: string;
  lessons: Lesson[];
  category: string;
}

import { a0ModulesComplete } from './a0-modules-complete';

export const a0Modules: Module[] = [
  {
    id: 1,
    title: "Se Présenter",
    icon: "👋",
    description: "Les bases pour se présenter",
    category: "introduction",
    lessons: [
      { fr: "Comment tu t'appelles ?", es: "¿Cómo te llamas?" },
      { fr: "Je m'appelle...", es: "Me llamo..." },
      { fr: "Quel âge as-tu ?", es: "¿Cuántos años tienes?" },
      { fr: "J'ai ... ans", es: "Tengo ... años" },
      { fr: "D'où viens-tu ?", es: "¿De dónde eres?" },
      { fr: "Je viens de...", es: "Soy de... / Vengo de..." },
      { fr: "Où habites-tu ?", es: "¿Dónde vives?" },
      { fr: "J'habite à...", es: "Vivo en..." },
      { fr: "Quelle est ta profession ?", es: "¿Cuál es tu profesión?" },
      { fr: "Je suis...", es: "Soy..." },
      { fr: "Enchanté(e)", es: "Encantado/a" },
      { fr: "Ravi de te rencontrer", es: "Mucho gusto" }
    ]
  },
  {
    id: 2,
    title: "La Famille",
    icon: "👨‍👩‍👧‍👦",
    description: "Membres de la famille",
    category: "relations",
    lessons: [
      { fr: "Père", es: "Padre / Papá" },
      { fr: "Mère", es: "Madre / Mamá" },
      { fr: "Fils", es: "Hijo" },
      { fr: "Fille", es: "Hija" },
      { fr: "Frère", es: "Hermano" },
      { fr: "Sœur", es: "Hermana" },
      { fr: "Mari", es: "Marido / Esposo" },
      { fr: "Femme", es: "Mujer / Esposa" },
      { fr: "Grand-père", es: "Abuelo" },
      { fr: "Grand-mère", es: "Abuela" },
      { fr: "Oncle", es: "Tío" },
      { fr: "Tante", es: "Tía" },
      { fr: "J'ai deux frères", es: "Tengo dos hermanos" },
      { fr: "Ma famille est grande", es: "Mi familia es grande" }
    ]
  },
  ...a0ModulesComplete
];
