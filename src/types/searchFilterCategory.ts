export type TagInfo = {
  tagId: number;
  tagName: string;
};

export interface SelectedCategoryData {
  mgcType: TagInfo[];
  language: TagInfo[];
  area: TagInfo[];
  searchType: TagInfo[];
}
