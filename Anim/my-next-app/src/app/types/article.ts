export type Article = Partial<{
  id: number;
  a_name: string;
  a_slug: string;
  a_description: string;
  a_view?: number;
  a_avatar: string;
  a_content: string;
  a_hot?: number;
  a_active?: number;
  a_menu_id?: number;
}>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TSFixMe = any;
