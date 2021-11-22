import gql from "graphql-tag";

export const UserResourceFragment = gql`
    fragment UserResource on User{
        id
        email
        name
        image
    }
`

export const UsersQuery = gql`
    query getUsers {
        users {
            ...UserResourceFragment
        }
    }
    ${UserResourceFragment}
`

export const LoginMutation = gql`
    mutation login($input: LoginInput) {
        login(input: $input) {
            access_token
            refresh_token
            expires_in
            token_type
            user {
                ...UserResourceFragment
            }
        }
    }
    ${UserResourceFragment}
`
