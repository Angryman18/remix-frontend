export interface PostItem {
  title: string;
  description: string;
  auther: string;
  tags: string[];
  posted: string;
}

export interface CreatePost extends Omit<PostItem, "posted"> {}

export interface FormData extends Omit<PostItem, "posted" | "tags"> {
  tags: string;
}
