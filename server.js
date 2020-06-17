const express = require('express');
const cors = require('cors');
const { buildSchema } = require('graphql');
const express_graphql = require('express-graphql');
const coursesData = require('./courseList');

const schema = buildSchema(`
    type Query{
        courses: [Course]
    }
    type Course{
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`)

const getCourses = () => {
    return coursesData;
}
//root resolver
const root = {
    courses: getCourses
}

const app = express();
app.use(cors());
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(4200, console.log('GraphQL server is running at http://localhost:4200/graphql'));