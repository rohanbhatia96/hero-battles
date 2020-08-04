export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  requiredQuery: Scalars['String'];
  login: User;
  getTrendingCharacters: Array<Character>;
  getAllCharacters: Array<Character>;
  getAllUserDetails: User;
};


export type QueryLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  firstName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  auth_token: Scalars['String'];
};

export type Character = {
  __typename?: 'Character';
  id: Scalars['Float'];
  name: Scalars['String'];
  realName?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  alignment: Scalars['String'];
  publisher: Scalars['String'];
  isTrending: Scalars['Boolean'];
  powerStats: PowerStats;
};

export type PowerStats = {
  __typename?: 'PowerStats';
  id: Scalars['Float'];
  intelligence: Scalars['Float'];
  strength: Scalars['Float'];
  speed: Scalars['Float'];
  durability: Scalars['Float'];
  power: Scalars['Float'];
  combat: Scalars['Float'];
  character: Character;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: User;
  updateTrendingCharacters: Array<Character>;
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
};
