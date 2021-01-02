const Comment = require("../models/comment");


function addComment(input, ctx){
   try {
      const comment = new Comment({
         idPublication: input.idPublication,
         idUser: ctx.user.id,
         comment: input.comment
      });
      comment.save()
      return comment;
   } catch (error) {
      console.log(error);
   }
}

async function getComments(idPublication){
   try {
      const result = await Comment.find({idPublication}).populate("idUser");
      return result
   } catch (error) {
      console.log(error);
   }
}

module.exports = {
   addComment,
   getComments
}
