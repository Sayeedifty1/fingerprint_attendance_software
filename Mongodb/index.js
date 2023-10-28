const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;

// ! Middleware
app.use(cors());
app.use(express.json());



// ! MongoDB Connection
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nsyuaxc.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 50,
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        client.connect((err => {
            if (err) {
                console.log(err);
                return;
            }
        }));
        const usersCollection = client.db("premier").collection("Users");
        const newPrintCollection = client.db("premier").collection("newReg");

        // get data from newReg collection
        app.get('/newReg', async (req, res) => {
            const result = await newPrintCollection.find().toArray();
            res.send(result);
        });

        // delete data from newReg collection
        app.delete("/newReg", async (req, res) => {
            try {
                const result = await newPrintCollection.deleteMany({});

                if (result.deletedCount > 0) {
                    res.json({ message: "NewPrint data deleted successfully" });
                } else {
                    res.status(404).json({ message: "No newPrint data found" });
                }
            } catch (error) {
                console.error("Error:", error);
                res.status(500).json({ message: "Internal Server Error" });
            }
        });




        app.post('/users', (req, res) => {
            const { name, email, category, password, fingerprint } = req.body;

            if (!name || !email || !category || !password) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            const user = { name, email, category, password, fingerprint };

            usersCollection.insertOne(user, (err, result) => {
                if (err) {
                    console.error('Error inserting user into MongoDB:', err);
                    return res.status(500).json({ error: 'Failed to register user' });
                }
                console.log('User registered successfully');
                res.status(200).json({ message: 'User registered successfully' });
            });
        });

        app.post('/authenticate', async (req, res) => {
            try {
                const { email, password } = req.body;

                if (!email || !password) {
                    return res.status(400).json({ error: 'Email and password are required' });
                }

                await client.connect();
                const db = client.db('premier');
                const usersCollection = db.collection('Users');

                const user = await usersCollection.findOne({ email, password });

                if (!user) {
                    console.log('Authentication failed for email:', email);
                    return res.status(401).json({ error: 'Authentication failed' });
                }

                console.log('Authentication successful for email:', email);
                res.status(200).json(user);

            } catch (error) {
                console.error('Error authenticating user:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } finally {
                await client.close();
            }
        });


        // get all users from database
        app.get('/users', async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result);
        });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
        console.log('never stops')
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Robazz server is running')
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})