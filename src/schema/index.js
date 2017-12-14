const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

// Define your types here.
const typeDefs = `
    type Link {
        id: ID!
        url: String!
        description: String!
        postedBy: User
        votes: [Vote!]!
    }

    type Query {
        allLinks(filter: LinkFilter, skip: Int, first: Int): [Link!]!
    }
    
    input LinkFilter {
        OR: [LinkFilter!]
        description_contains: String
        url_contains: String
    }

    type Mutation {
        createLink(url: String!, description: String!): Link
        createUser(name: String!, authProvider: AuthProviderSignupData!): User
        signinUser(email: AUTH_PROVIDER_EMAIL): SigninPayload!
        createVote(linkId: ID!): Vote
    }

    type User {
        id: ID!
        name: String!
        email: String
        votes: [Vote!]!
    }

    input AuthProviderSignupData {
        email: AUTH_PROVIDER_EMAIL
    }

    input AUTH_PROVIDER_EMAIL {
        email: String!
        password: String!
    }

    type SigninPayload {
        token: String
        user: User
    }

    type Vote {
        id: ID!
        user: User!
        link: Link!
    }

    type Subscription {
        Link(filter: SubscriptionFilter): LinkSubscriptionPayload
        User(filter: SubscriptionFilter): UserSubscriptionPayload
        Vote(filter: SubscriptionFilter): VoteSubscriptionPayload
    }

    input SubscriptionFilter {
        mutation_in: [_ModelMutationType!]
    }

    type LinkSubscriptionPayload {
        mutation: _ModelMutationType!
        node: Link
    }

    type UserSubscriptionPayload {
        mutation: _ModelMutationType!
        node: User
    }

    type VoteSubscriptionPayload {
        mutation: _ModelMutationType!
        node: Vote
    }

    enum _ModelMutationType {
        CREATED
        UPDATED
        DELETED
    }
`;

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({ typeDefs, resolvers });
