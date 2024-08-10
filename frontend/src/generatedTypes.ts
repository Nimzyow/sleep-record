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

export type SleepCount = {
  __typename?: 'SleepCount';
  sleeps: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  _count: SleepCount;
  gender: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  sleeps: Array<Sleep>;
};

export type RecordSleepMutationVariables = Exact<{
  name: Scalars['String']['input'];
  sleepDuration: Scalars['Float']['input'];
  sleptAt: Scalars['String']['input'];
  gender: Scalars['String']['input'];
}>;


export type RecordSleepMutation = { __typename?: 'Mutation', recordSleep: { __typename?: 'User', gender: string, id: string, name: string, sleeps: Array<{ __typename?: 'Sleep', id?: string | null, sleepDuration: number, sleptAt: string }> } };

export type GetAllUsersSleepRecordsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersSleepRecordsQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', gender: string, id: string, name: string, sleeps: Array<{ __typename?: 'Sleep', id?: string | null, sleepDuration: number, sleptAt: string }>, _count: { __typename?: 'SleepCount', sleeps: number } }> };


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
export const GetAllUsersSleepRecordsDocument = gql`
    query getAllUsersSleepRecords {
  users {
    gender
    id
    name
    sleeps {
      id
      sleepDuration
      sleptAt
    }
    _count {
      sleeps
    }
  }
}
    `;

/**
 * __useGetAllUsersSleepRecordsQuery__
 *
 * To run a query within a React component, call `useGetAllUsersSleepRecordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersSleepRecordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersSleepRecordsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersSleepRecordsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersSleepRecordsQuery, GetAllUsersSleepRecordsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersSleepRecordsQuery, GetAllUsersSleepRecordsQueryVariables>(GetAllUsersSleepRecordsDocument, options);
      }
export function useGetAllUsersSleepRecordsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersSleepRecordsQuery, GetAllUsersSleepRecordsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersSleepRecordsQuery, GetAllUsersSleepRecordsQueryVariables>(GetAllUsersSleepRecordsDocument, options);
        }
export function useGetAllUsersSleepRecordsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllUsersSleepRecordsQuery, GetAllUsersSleepRecordsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllUsersSleepRecordsQuery, GetAllUsersSleepRecordsQueryVariables>(GetAllUsersSleepRecordsDocument, options);
        }
export type GetAllUsersSleepRecordsQueryHookResult = ReturnType<typeof useGetAllUsersSleepRecordsQuery>;
export type GetAllUsersSleepRecordsLazyQueryHookResult = ReturnType<typeof useGetAllUsersSleepRecordsLazyQuery>;
export type GetAllUsersSleepRecordsSuspenseQueryHookResult = ReturnType<typeof useGetAllUsersSleepRecordsSuspenseQuery>;
export type GetAllUsersSleepRecordsQueryResult = Apollo.QueryResult<GetAllUsersSleepRecordsQuery, GetAllUsersSleepRecordsQueryVariables>;