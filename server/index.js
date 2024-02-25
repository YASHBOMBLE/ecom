import express from 'express';
import mongoose from 'mongoose';

const app =express();
app.use(express.json())

const PORT = process.env.PORT || 5000;


mongoose.connect("", () => {
    console.log('Connected to MongoDB');
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})