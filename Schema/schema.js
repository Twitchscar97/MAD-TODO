import mongoose from 'mongoose';

const {Schema, model} = mongoose;

const todoSchema = Schema({
    todoTitle: {
        type: 'string',
        required: true
    },
     category: {
         type: 'string',
         required: true
     }
});

 const todoModel = model('MAD-TODOS', todoSchema);

export default todoModel;