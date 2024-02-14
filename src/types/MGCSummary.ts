import { LanguageTypes, MGCTypes, StudyTypes } from '@/constants/types';

export interface MGCSummary {
  title: string;
  location: number[];
  createdAt: string;
  likeCount: number;
  studyTypes: (keyof typeof StudyTypes)[];
  languageTypes: (keyof typeof LanguageTypes)[];
  currentParticipantsCount: number;
  maxParticipantsCount: number;
  MGSType: (typeof MGCTypes)[keyof typeof MGCTypes];
}
