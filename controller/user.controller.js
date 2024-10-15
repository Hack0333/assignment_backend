import userModel from '../models/user.model.js'
import bcrypt from 'bcrypt'
import adminModel from '../models/admin.model.js';
import assignmentModel from '../models/assignment.model.js'
import { generateTokenAndSetCookie } from '../utilis/generateTokenAndSetCookie.js';

export const userRegister = async(req,res)=>{
    const {name , email , password} = req.body;
    try {
        if(!name || !email || !password){
            return res.status(400).send("All fields are required");
        }
        const allreadyEsisted = await userModel.findOne({email});
        if(allreadyEsisted) return res.status(400).json({success : false , message : "Allready existed"});
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        if(!hashPassword) return res.status(400).send("Error hash");

        const user = new userModel({name,email,password:hashPassword});
        await user.save();

        generateTokenAndSetCookie(res,user._id);

        console.log("User Created");

        res.status(200).json({
            success : true,
            message : "user created successfully",
            user : {
                ...user._doc,
                password:undefined
            }
        })
    } catch (error) {
        console.log("Error is userRegister", error.message);
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

export const userLogin = async(req,res)=>{
    const {email , password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({success:false , message : "All field is required"})
        }
        const user = await userModel.findOne({email});
        if(!user) return res.status(400).json({success:false , message : "invalid credentials"});
        
        const passwordIsMatch = await bcrypt.compare(password,user.password);

        if(!passwordIsMatch) return res.status(400).json({success:false , message : "invalid credentials"});

        generateTokenAndSetCookie(res,user._id);

        res.status(200).json({
            success : true,
            message : "Logged In succcessfully",
            user : {
                ...user._doc,
                password : undefined
            }
        })
        
    } catch (error) {
        
    }
}

export const userLogout = async (req, res) => {
    try {
      res.clearCookie('token');
  
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      console.error("Error in userLogout:", error.message);
      res.status(500).json({
        success: false,
        message: "An error occurred during logout",
        error: error.message,
      });
    }
};

export const userUpload = async(req,res)=>{
    const {task , adminName} = req.body;
    try {
        if(!task || !adminName) return res.status(400).json({success : false , message : "All field is required"});

        const isAdmin = await adminModel.findOne({name : adminName});

        if(!isAdmin) return res.status(400).json({success : false , message : "Enter a valid admin"});

        const userId = req.userId;
        const user = await userModel.findById(userId);


        const newAssignment = new assignmentModel({
            user : userId,
            task,
            admin : isAdmin._id
        })
        await newAssignment.save();
        
        user.assignments.push(newAssignment._id);
        isAdmin.assignments.push(newAssignment._id);

        await Promise.all([user.save(), isAdmin.save()]);

        res.status(200).json({success:true , message : "assigment uploaded"});

    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

export const allAdmins = async (req, res) => {
    try {
        const allAdmins = await adminModel.find().select("name");

        if (allAdmins.length === 0) {
            return res.status(404).json({ success: false, message: "No admins found" });
        }

        res.status(200).json({
            success: true,
            message: "All admins listed",
            admins: allAdmins,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};