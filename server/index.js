import express from 'express';
import mongoose from 'mongoose';
import newItem from './models/Newitem.js'
import Newitem from './models/Newitem.js';
const app =express();
app.use(express.json())

const PORT = process.env.PORT || 5000;


mongoose.connect("mongodb+srv://yashbomble:yash2002@cluster0.mt2buo2.mongodb.net/ecom", () => {
    console.log('Connected to MongoDB');
})

//api routes here

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    

    if (!email || !password) {
        return res.json({
            success: false,
            message: "Email and password are required"
        })
    }

    const existingUser = await User.findOne({ email: email, password: password });

    if (existingUser) {
        return res.json({
            success: true,
            message: "Login successful",
            data: existingUser
        })
    }
    else {
        return res.json({
            success: false,
            message: "Invalid email or password"
        })
    }
})

app.post('/adddata',async (req,res) => {
    const{title,imgurl,prize,delprize,offper} = req.body;

    const newitem = new newItem({
        title : title,
        imgurl : imgurl,
        prize:prize,
        delprize : delprize,
        offper : offper
    })

    const savedItem = await newitem.save();

        res.json({
            success: true,
            message: "Item added successfully",
            data: savedItem
        })


})

app.get('/allitem', async(req,res) => {
    const items = await Newitem.find();

    res.json({
        success : true,
        message : "Items fetch successfully",
        data : items
    })
})

app.post('/signup', async (req, res) => {
    const { name, phone, email, password, weight, age, role } = req.body;
   
    // validation to check if all fields are filled starts here
   

    // validation to check if all fields are filled ends here

    if(!validator.isEmail(email))

    {
        return res.json({
            success: false,
            message: "Please enter valid email",
            
        })
    } 
if(!validator.isMobilePhone(phone))
    {
        return res.json({
            success: false,
            message: "Mobile must contain 10 digit",
            
        })
    }


  if(!validator.isStrongPassword(password))
    {
      return res.json({
          success: false,
          message: "Password contains A-Z,0-9 ,a-z, @"
      })
    }

    // validation to check if email already exists starts here
     const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return res.json({
            success: false,
            message: "Email already exists"
        })
    }
    // validation to check if email already exists ends here

    // validation to check if phone already exists starts here
    
    const existingUserPhone = await User.findOne({ phone: phone });
    if (existingUserPhone) {
        return res.json({
            success: false,
            message: "Phone already exists"
        })
    }
    // validation to check if phone already exists ends here


    const user = new User({
    
        name: name,
        email: email,
        phone: phone,
        password: password,
        weight: weight,
        age: age,
        role: role
    })

    const savedUser = await user.save();

        res.json({
            success: true,
            message: "User created successfully",
            data: savedUser
        })
   

})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})