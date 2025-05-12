const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
var jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId, serialize } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());
app.use(cors({ origin: ['https://hostel-management-32.web.app', 'http://localhost:5173', 'https://hostel-management-32.vercel.app'] }));
const stripe = require('stripe')(process.env.STRIPE_SECRET)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ueh5c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const dataBase = client.db('Hostel-Management');
        const mealCollection = dataBase.collection('meals');
        const userCollection = dataBase.collection('users');
        const reviewCollection = dataBase.collection('reviews');
        const upcomingCollection = dataBase.collection('upcoming');
        const paymentCollection = dataBase.collection('payment');
        const requestedCollection = dataBase.collection('RequestedMeal');

        //custom middleware
        //if you face any issue it will be because of verify token middleware next
        const verifyToken = (req, res, next) => {

            const token = req?.headers?.auth; //console.log('token from middle ware ', token)

            if (!token) {
                return res.status(401).send({ message: 'unauthorized access ? no token' })
            }

            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

                if (err) {
                    return res.status(401).send({ message: 'unauthorized access ? invalid token' })
                }

                req.decoded = decoded;// console.log('decoded from verify token ', req.decoded)

                next();
            })

        }
        const verifyAdmin = async (req, res, next) => {

            const user = await userCollection.findOne({ email: req.decoded.email });

            const isAdmin = user?.role === 'Admin' || user?.role === 'admin';

            //this lines of code below creating error when a logged in user is not admin  and interceptor taking the 403 and navigating to login

            if (!isAdmin) {
                return res.status(403).send({ message: 'forbidden access' })
            }

            req.isAdmin = isAdmin;

            next()

        }

        //jwt related api
        app.post('/jwt', async (req, res) => {
            const user = req.body;

            //encrypting users data as a token
            const token = jwt.sign(user, process.env.JWT_SECRET, {
                expiresIn: '1h'
            })
            res.send({ token })
        })

        // meal related api 

        //api for getting all meals
        app.get('/meals', async (req, res) => {

            const { search, category, min, max, sortByLikes, sortByReviewCount, email } = req?.query; //console.log(req.query);

            let searchQuery = {};
            let sortQuery = {};

            // sort queries 

            if (sortByLikes == 'true') {
                sortQuery = { reactionCount: -1 }
            }
            if (sortByReviewCount == 'true') {
                sortQuery = { reviews_count: -1 }
            }
            //search queries

            if (email && email !== 'undefined') {
                searchQuery.distributorEmail = email
            }
            if (search && search !== 'undefined') {
                searchQuery = { name: { $regex: new RegExp(search, 'i') } };
            }

            if (category && category !== 'undefined') {
                searchQuery.category = category;
            }

            if ((min || max) && (min !== 'undefined' && max !== 'undefined')) {

                searchQuery.price = {};

                if (min) searchQuery.price.$gte = parseFloat(min);
                if (max) searchQuery.price.$lte = parseFloat(max);
            }

            //console.log('search and sort queries', searchQuery, sortQuery)

            const cursor = mealCollection.find(searchQuery).sort(sortQuery);

            const result = await cursor.toArray(); //console.log(result);

            res.send(result);
        })
        // api for getting a specific meal based on id 
        app.get('/meals/:id', async (req, res) => {

            const id = req.params.id;// console.log(id);

            const query = { _id: new ObjectId(id) }; //console.log(query);

            let result = await mealCollection.findOne(query);

            //taking precaution if some has inserted a object in mongodb with a _id: in the object ;
            if (!result) {
                result = await mealCollection.findOne({ _id: id });
            }

            res.send(result);

        })