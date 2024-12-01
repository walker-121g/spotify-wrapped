export type Following = {
  id: number;
  following: {
    id: number;
    email: string;
    name: string;
    created_at: string;
  };
  created_at: string;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  likes: number;
  comments: number;
  created_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export type PostDetail = Post & {
  wrap_id: number;
  comments: {
    id: number;
    content: string;
    user: {
      id: number;
      name: string;
      email: string;
    };
    created_at: string;
  }[];
};
