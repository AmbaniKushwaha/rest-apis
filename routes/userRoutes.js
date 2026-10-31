import express from "express";
import User from "../models/User.js";

 export const router = express.Router();


// DASHBOARD - SHOW ALL USERS
router.get("/", async (req, res) => {
    try {
        const users = await User.find();

        res.json(users);

        res.render("dashboard", {
            users
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
});


// SHOW ADD USER FORM
router.get("/api/add-user", (req, res) => {
    res.render("add-user");
});


// CREATE USER
router.post("/api/add-user", async (req, res) => {
    try {
     const { name, email, phone , age , city } = req.body;
        const exitUser = await User.findOne({email});
        if(exitUser){
            res.json({ message : "user already exists"})
        }
        else{
            
     const user = await User.create(
            {
                name, 
                email, 
                phone , 
                age , 
                city
            });
        res.redirect("/");
        res.json({message : "user created successfully"})
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
});


// SHOW EDIT USER FORM
router.get("/api/edit-user/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
       
        res.json(user)
        if (!user) {
            return res.status(404).send("User not found");
        }

        res.render("edit-user", {
            user
        });



    } catch (error) {
        res.status(400).send("Invalid user ID");
    }
});


// UPDATE USER
router.put("/api/edit-user/:id", async (req, res) => {
    try {
        const {name,email,phone,age,city} =  req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: 
                { 
                    name, 
                    email, 
                    phone, 
                    age, 
                    city 
                } 
            }

        );


        if (!user) {
            return res.status(404).send("User not found");
        }

        res.redirect("/");

    } catch (error) {
        res.status(400).send(error.message);
    }
});


// DELETE USER
router.delete("/api/delete-user/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.json(user)
        if (!user) {
            return res.status(404).send("User not found");
        }

        res.redirect("/");

    } catch (error) {
        res.status(400).send(error.message);
    }
});
