const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolver");
const jwt = require("jsonwebtoken")
require("dotenv").config({ path:".env" });

mongoose.connect(process.env.DB, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false,
   useCreateIndex: true
}, (err, _) => {
   if(err){
      throw new Error(err)
   }else{
      server()
   }
})

function server(){
   const serverApollo = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({req}) => {
         const token = req.headers.authorization;
         if(token){
            try {
               const user = jwt.verify(
                  token.replace("Bearer ", ""),
                  process.env.SECRET_KEY
               );
               return {
                  user
               }
            } catch (error) {
               console.log("### ERROR ###");
               console.log(error);
               throw new Error("Token invalido");
            }
         }
      }
   })
   serverApollo.listen({port: process.env.PORT || 5000}).then(({url})=>{
      console.log(`###### Server on ${url} ######`);
   })
}