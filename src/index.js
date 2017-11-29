const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./schema');
const { authenticate } = require('./authentication');

// 1
const connectMongo = require('./mongo-connector');

const start = async () => {
    const mongo = await connectMongo();
    const app = express();

    const buildOptions = async (req, res) => {
        const user = await authenticate(req, mongo.Users);
        return {
            context: {mongo, user}, // This context object is passed to all resolvers.
            schema,
        };
    };

    app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));

    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql',
        passHeader: `'Authorization': 'bearer token-gav@pes.ua'`,
    }));

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Hackernews GraphQL server running on port ${PORT}.`)
    });
};

// 5
start();