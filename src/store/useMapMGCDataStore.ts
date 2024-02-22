import { LanguageTypes, MGCTypes, StudyTypes } from '@/constants/types';
import { MGCDetail } from '@/types/MGCList';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface MapMGCDataStore {
  mapMGCData: MGCDetail[];
  setMapMGCData: (newMapMGCData: MGCDetail[]) => void;
}

export const DUMMYDATAS = [
  {
    id: 1,
    title: '장소미정/BE/자바',
    location: [] as number[],
    createdAt: '2023-02-12',
    likeCount: 3,
    studyTypes: [StudyTypes.BE],
    languageTypes: [LanguageTypes.JAVA],
    currentParticipantsCount: 2,
    maxParticipantsCount: 3,
    MGSType: MGCTypes.LocationNotConfirmed,
  },
  {
    id: 2,
    title: '장소확정/FE/자스',
    location: [35.165763, 128.688634],
    createdAt: '2023-02-12',
    likeCount: 3,
    studyTypes: [StudyTypes.FE],
    languageTypes: [LanguageTypes.JAVASCRIPT],
    currentParticipantsCount: 2,
    maxParticipantsCount: 3,
    MGSType: MGCTypes.LocationConfirmed,
  },
  {
    id: 3,
    title: '번개/BE/파이썬',
    location: [35.166368, 128.689718],
    createdAt: '2023-02-12',
    likeCount: 3,
    studyTypes: [StudyTypes.BE],
    languageTypes: [LanguageTypes.PYTHON],
    currentParticipantsCount: 2,
    maxParticipantsCount: 3,
    MGSType: MGCTypes.ThunderMGC,
  },
  {
    id: 4,
    title: '번개/BE/파이썬2',
    location: [35.166, 128.66],
    createdAt: '2023-02-12',
    likeCount: 3,
    studyTypes: [StudyTypes.BE],
    languageTypes: [LanguageTypes.PYTHON],
    currentParticipantsCount: 2,
    maxParticipantsCount: 3,
    MGSType: MGCTypes.ThunderMGC,
  },
  {
    id: 5,
    title: '장소확정/FE/자스2',
    location: [35.165763, 128.66],
    createdAt: '2023-02-12',
    likeCount: 3,
    studyTypes: [StudyTypes.FE],
    languageTypes: [LanguageTypes.JAVASCRIPT],
    currentParticipantsCount: 2,
    maxParticipantsCount: 3,
    MGSType: MGCTypes.LocationConfirmed,
  },
  {
    id: 6,
    title: '번개/BE/자바',
    location: [35.166368, 128.66],
    createdAt: '2023-02-12',
    likeCount: 3,
    studyTypes: [StudyTypes.BE],
    languageTypes: [LanguageTypes.JAVA],
    currentParticipantsCount: 2,
    maxParticipantsCount: 3,
    MGSType: MGCTypes.ThunderMGC,
  },
  {
    id: 7,
    title: '번개/BE/파이썬22',
    location: [35.166, 128.689718],
    createdAt: '2023-02-12',
    likeCount: 3,
    studyTypes: [StudyTypes.BE],
    languageTypes: [LanguageTypes.PYTHON],
    currentParticipantsCount: 2,
    maxParticipantsCount: 3,
    MGSType: MGCTypes.ThunderMGC,
  },
];

export const useMapMGCDataStore = create<MapMGCDataStore>()(
  devtools(
    (set) => ({
      mapMGCData: [],
      setMapMGCData: (newMapMGCDatas: MGCDetail[]) => set({ mapMGCData: newMapMGCDatas }),
    }),
    {
      name: 'current-mapData',
    },
  ),
);

export default useMapMGCDataStore;
