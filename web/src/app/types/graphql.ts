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
  getSingleCharacter: Character;
  getCharactersFromSearch: Array<SearchCharacter>;
  getAllUserDetails: User;
};


export type QueryLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type QueryGetSingleCharacterArgs = {
  apiId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};


export type QueryGetCharactersFromSearchArgs = {
  searchTerm: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  name: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  authToken: Scalars['String'];
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
  appearance: Appearance;
  work: Work;
  connections: Connections;
  biography: Biography;
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

export type Appearance = {
  __typename?: 'Appearance';
  id: Scalars['Float'];
  gender: Scalars['String'];
  race: Scalars['String'];
  height: Scalars['String'];
  weight: Scalars['String'];
  eyeColor: Scalars['String'];
  hairColor: Scalars['String'];
  character: Character;
};

export type Work = {
  __typename?: 'Work';
  id: Scalars['Float'];
  occupation: Scalars['String'];
  base: Scalars['String'];
  character: Character;
};

export type Connections = {
  __typename?: 'Connections';
  id: Scalars['Float'];
  groupAffiliations: Scalars['String'];
  relatives: Scalars['String'];
  character: Character;
};

export type Biography = {
  __typename?: 'Biography';
  id: Scalars['Float'];
  alterEgos: Scalars['String'];
  aliases: Scalars['String'];
  placeOfBirth: Scalars['String'];
  firstAppearance: Scalars['String'];
  character: Character;
};

export type SearchCharacter = {
  __typename?: 'SearchCharacter';
  apiId: Scalars['Float'];
  name: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  alignment: Scalars['String'];
  publisher: Scalars['String'];
  averageRating: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: User;
  updateTrendingCharacters: Array<Character>;
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  name: Scalars['String'];
};
