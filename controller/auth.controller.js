import bcrypt from 'bcrypt'

import assignmentModel from '../models/assignment.model.js';
import adminModel from '../models/admin.model.js'
import { generateTokenAndSetCookie } from '../utilis/generateTokenAndSetCookie.js';

export const register = async(req,res)=>{
    const {name,email,password} = req.body;
    try {
        if(!name ,!email ,!password ){
            return res.status(400).json({success : false , message : "All fields are required"});
        }
        const allreadyEsisted = await adminModel.findOne({email});

        if(allreadyEsisted) return res.status(400).json({success : false , message : "Allready existed"});

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        if(!hashPassword) return res.status(400).json({success : false , message : "no hash password"});

        const admin = new adminModel({name,email,password:hashPassword});

        admin.save();

        if(!admin) return res.status(400).json({success : false , message : "error register admin"});

        generateTokenAndSetCookie(res,admin._id);

        res.status(200).json({
            success : true,
            message : "admin registered",
            admin : {
                ...admin._doc,
                password : undefined
            }
        })
        
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

export const login = async(req,res)=>{
    const {email,password} = req.body;
    try {
        if(!email || !password) return res.status(400).json({success : true, message : "All fields are required"});

        const admin = await adminModel.findOne({email});

        if(!admin)return res.status(400).json({success : true, message : "Invalid Credentials"});

        const passwordIsMatch = await bcrypt.compare(password,admin.password);

        if(!passwordIsMatch) return res.status(400).json({success : true, message : "Invalid Credentials"});

        generateTokenAndSetCookie(res,admin._id);

        res.status(200).json({
            success : true,
            message : "you are looged in",
            admin : {
                ...admin._doc,
                password:undefined
            }
        })

    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

export const assignments_accept = async(req,res)=>{
    try {
        const {id} = req.params;
        
        const updatedAssignment = await assignmentModel.findOneAndUpdate(
            { _id: id },
            { status: "accepted" },
            { new: true } 
        );

        if (!updatedAssignment) {
            return res.status(404).json({ success: false, message: "Assignment not found" });
        }

        res.status(200).json({success : true , message : "Assignment accepted"});
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

export const assignments_reject = async(req,res)=>{
    try {
        const {id} = req.params;
        
        const updatedAssignment = await assignmentModel.findOneAndUpdate(
            { _id: id },
            { status: "rejected" },
            { new: true } 
        );

        if (!updatedAssignment) {
            return res.status(404).json({ success: false, message: "Assignment not found" });
        }


        res.status(200).json({success : true , message : "Assignment rejected"});
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}


