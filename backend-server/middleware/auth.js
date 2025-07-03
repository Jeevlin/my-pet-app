require('dotenv').config()
const multer =require('multer')
const jwt  = require('jsonwebtoken')
const AdminSchema = require('../models/adminModel')


const verifyjwt = async(req, res, next) => {
    try{
        const authHeader = req.header('Authorization')
        const token = authHeader && authHeader.split(' ')[1]
        
        if (!token || !authHeader) {
                return res.status(401).json({ error: 'Token is missing' });
              }

        const decode = jwt.verify(token, process.env.JWT_SECRET, { complete: true })
        console.log(decode.payload); 

        const user = await AdminSchema.findById(decode._id)

        if(!user){
            return res.status(404).json({
                success : false,
                message : 'User not found'
            })
        }
        req.user = user
        next()
    }catch(err){
       
        res.status(500).json({
            success : false,
            message : err.message
        })
    }
}
const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const authenticateFirebaseUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
  
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }
  
    try {
      // Verify the Firebase ID token
      const decodedToken = await admin.auth().verifyIdToken(token);
  
      // Attach user information (UID) to the request object
      req.user = { uid: decodedToken.uid };
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error("Error verifying Firebase ID token:", error);
      res.status(403).json({ message: "Invalid or expired token" });
    }
  };
  


const verifyDoc= multer({
    limits:{
        fileSize:10000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.jpg|\.png|\.jpeg/)){
            return cb (new Error("incorrect format"))
        }
        cb(undefined,true)
        },
        storage: multer.memoryStorage()// Store the file in memory
})

module.exports ={verifyDoc,verifyjwt,authenticateFirebaseUser }