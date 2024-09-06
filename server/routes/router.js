const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

// Handle user registration
router.post("/register", async (req, res) => {
    const { name, email, age, mobile, work, add, desc } = req.body;

    // Check for missing fields
    if (!name || !email || !age || !mobile || !work || !add || !desc) {
        return res.status(422).json({ error: "Please fill all the required fields." });
    }

    try {
        // Check if the user already exists
        const preuser = await users.findOne({ email: email });
        if (preuser) {
            return res.status(422).json({ error: "User already exists." }); // 409 Conflict status
        }

        // Create and save new user
        const newUser = new users({ name, email, age, mobile, work, add, desc });
        await newUser.save();

        // Send success response
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ error: "Internal Server Error" }); // Return a generic server error message
    }
});

//get userdata

router.get("/getdata",async(req,res)=>{
    try{
        const userdata=await users.find();
        res.status(201).json(userdata);
       
    }catch(error){
        res.status(422).json(error);
    }
})

//get individual user

router.get("/getuser/:id",async(req,res)=>{
    try{
        
        const {id} = req.params;
        const userindividual=await users.findById({_id:id});
    
        res.status(201).json(userindividual);
    }
    catch(error){
        res.status(422).json(error);
    }


})

//update user data

router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const { id } = req.params;
        const updateUser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });
        
        res.status(201).json(updateUser);
    } catch (error){
        res.status(422).json(error);
    }
})

// delete user
router.delete("/deleteuser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        // Use findByIdAndDelete to delete the user by ID
        const deleteUser = await users.findByIdAndDelete(id);

        if (!deleteUser) {
            // If the user is not found, return a 404 error
            return res.status(404).json({ error: "User not found" });
        }

        
        res.status(200).json(deleteUser); // Send 200 for a successful deletion
    } catch (error) {
        console.error("Error during deletion:", error);
        res.status(422).json({ error: error.message }); // Include error message in the response
    }
});

module.exports = router;

