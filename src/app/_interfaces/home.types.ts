export type TypePost = {
  _id: string;
  body: string;
  image?: string;
  user: TypeUser;
  createdAt: string;
  comments: TypeComments[];
};

export type TypeUser = {
  _id: string;
  name: string;
  photo: string;
};

export type TypeComments = {
  _id: string;
  content: string;
  commentCreator: TypeUser;
  post: string;
  createdAt: string;
};
