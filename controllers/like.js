const Like = require("../models/like")
function addLike(idPublication, ctx){

   try {
      const like = new Like({
         idPublication,
         idUser: ctx.user.id
      });
      like.save();
      return true
   } catch (error) {
      console.log(error);
      return false
   }
}
async function deleteLike(idPublication, ctx){
   try {
      await Like.findOneAndDelete({idPublication}).where({idUser: ctx.user.id})
      return true;
   } catch (error) {
      console.log(error);
      return false
   }
}

async function isLike(idPublication, ctx){
   try {
      const result = await Like.findOne({idPublication}).where({idUser: ctx.user.id});
      if(!result){
         // throw new Error("No le ah dado a like");
         return false
      }
      return true;
   } catch (error) {
      console.log(error);
      return false
   }
}

async function countLikes(idPublication){
   try {
      const result = await Like.countDocuments({idPublication});
      return result;
   } catch (error) {
      console.log(error);
      return 0;
   }
}

module.exports = {
   addLike,
   deleteLike,
   isLike,
   countLikes
}