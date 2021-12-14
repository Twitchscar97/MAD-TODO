import dotenv from'dotenv';
import express from 'express';
import todoModel from './Schema/schema.js';
import cors from 'cors';
import  mongoose from 'mongoose';  
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

//this sections tells us that if the port 3000 is busy  it should take an alternative which is free
const Port = 3000 || process.env.PORT;

//we used this code because we are trying to makae our database string secure ie to be exclusively visible to the user only 
const db = process.env.DB_URL;

mongoose.connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology: true,  
}).then(() => console.log('Connected to DB')).catch(eer => console.log(eer));

//Home
app.get('/', (req, res)=> {
 res.send('Welcome to Todo API');
})

//Fetch all todos 
app.get('/todos',async (req, res)=>{
const allTodos = await todoModel.find({});
if(allTodos){
    //success
    res.status(200).json({
        message: 'Todos fetched successfully',
        data: allTodos
    })
}else{
    //error
    res.status(500).json({
        message: 'Ooops!, unable to fetch todos'
    })
}
})

//Fetch category todos
app.get('/todos/:category',async (req, res)=>{
    const {category} = req.params
    const allCategoryTodos = await todoModel.find({}).where({category}).equals({category});
    if(allCategoryTodos){
        //success
        res.status(200).json({
            message: `${category}Todos fetched successfully`,
            data:allCategoryTodos
        })
    }else{
        //error
        res.status(500).json({
            message: 'Ooops!, unable to fetch todos'
        })
    }
    })
    //Creatig a todo model
    app.post('/todo',async(req, res) => {
        const{todoTitle,category}=req.body;
        const newTodo = await todoModel.create(
            {
                todoTitle,
                category,
            });
            //when task is successful
            if (newTodo) {
                res.status(200).json({
                    message: 'Todo created successfully',
                })
                //when there's an error
            } else {res.status(500).json({
                message:'Todo could not be created successfully',
            })  
            }
    })
    //how to delete a todo
    app.delete('',async(req, res)=>{
        const todoId = req.params;
        const deletedtodo = await todoModel.findByIdAndDelete({id});
    //when delete is successful
    if (deletedtodo){

           return res.status(200).json({
            message:'Todo deleted successfully',
        })
        
    } else {return res.status(500).json({
        message:'Error deleting todo',
    })
        
    }
    })


















app.listen(Port, () => {
console.log(`Your app is listening on ${Port}`);
})