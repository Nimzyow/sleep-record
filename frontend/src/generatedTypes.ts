import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  recordSleep: User;
};


export type MutationRecordSleepArgs = {
  gender: Scalars['String']['input'];
  name: Scalars['String']['input'];
  sleepDuration?: InputMaybe<Scalars['Float']['input']>;
  sleptAt: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
};

export type Sleep = {
  __typename?: 'Sleep';
  id?: Maybe<Scalars['String']['output']>;
  sleepDuration: Scalars['Float']['output'];
  sleptAt: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  gender: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  sleeps: Array<Maybe<Sleep>>;
};

export type RecordSleepMutationVariables = Exact<{
  name: Scalars['String']['input'];
  sleepDuration: Scalars['Float']['input'];
  sleptAt: Scalars['String']['input'];
  gender: Scalars['String']['input'];
}>;


export type RecordSleepMutation = { __typename?: 'Mutation', recordSleep: { __typename?: 'User', gender: string, id: string, name: string, sleeps: Array<{ __typename?: 'Sleep', id?: string | null, sleepDuration: number, sleptAt: string } | null> } };


export const RecordSleepDocument = gql`
    mutation RecordSleep($name: String!, $sleepDuration: Float!, $sleptAt: String!, $gender: String!) {
  recordSleep(
    name: $name
    sleepDuration: $sleepDuration
    sleptAt: $sleptAt
    gender: $gender
  ) {
    gender
    id
    name
    sleeps {
      id
      sleepDuration
      sleptAt
    }
  }
}
    `;
export type RecordSleepMutationFn = Apollo.MutationFunction<RecordSleepMutation, RecordSleepMutationVariables>;

/**
 * __useRecordSleepMutation__
 *
 * To run a mutation, you first call `useRecordSleepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRecordSleepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [recordSleepMutation, { data, loading, error }] = useRecordSleepMutation({
 *   variables: {
 *      name: // value for 'name'
 *      sleepDuration: // value for 'sleepDuration'
 *      sleptAt: // value for 'sleptAt'
 *      gender: // value for 'gender'
 *   },
 * });
 */
export function useRecordSleepMutation(baseOptions?: Apollo.MutationHookOptions<RecordSleepMutation, RecordSleepMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RecordSleepMutation, RecordSleepMutationVariables>(RecordSleepDocument, options);
      }
export type RecordSleepMutationHookResult = ReturnType<typeof useRecordSleepMutation>;
export type RecordSleepMutationResult = Apollo.MutationResult<RecordSleepMutation>;
export type RecordSleepMutationOptions = Apollo.BaseMutationOptions<RecordSleepMutation, RecordSleepMutationVariables>;