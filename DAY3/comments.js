
var comments = [
    
  ]

var id=0
var targetID = 1
var condition = false
function mutate(comments,depth,targetID){
    
    if (!( targetID == undefined)){
        for(const reply of comments){
            if(depth==0){
                if(targetID == reply.id){
               
                    id=id+1
                    reply.replies.push({
                        id: (id),
                        text: "This child node.",
                        replies:[]
                    })
                    condition = true
                }
            }else {
                mutate(reply.replies,depth-1,targetID)
            }}   
    }
    else{
        id=id+1
        comments.push({   
            id: (id),
            text: "This is a reply to the root comment.",
            replies:[]})
           
    }
      
}





mutate(comments,0,undefined)

mutate(comments,0,1)

mutate(comments,0,undefined)





mutate(comments,0,3)
console.log(comments)
console.log(comments[0].replies)
console.log(comments[1].replies)

console.log("Ehre is the Inpt");
console.log(comments);
mutate(comments,1,2)
console.log(comments)
console.log(comments[0].replies)
console.log(comments[1].replies)
mutate(comments,2,5)
 console.log(comments) 

 console.log(comments)
console.log(comments[0].replies[0].replies[0])




  