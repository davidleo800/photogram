export interface responsePosts {
  state: boolean;
  page: number;
  posts: Post[];
}

export interface Post {
  _id?: string;
  message?: string;
  imgs?: string[];
  coords?: string;
  user?: User;
  created?: string;
}

export interface User {
  _id?: string;
  name?: string;
  avatar?: string;
  email?: string;
  password?: string; 
}