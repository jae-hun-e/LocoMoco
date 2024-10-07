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

export interface FilterCategoryList {
  tagId: number;
  tagName: string;
  categoryName: string;
  queryParamerter?: 'titleAndContent' | 'nickname' | 'location';
}
