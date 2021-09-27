import express, { Router, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { UserModel } from './model'

const app = express();
const router = Router();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', router);

const PORT = process.env.PORT || 3000;

const dbHost = 'localhost';
const dbPort = 27017;
const dbName = 'user-mgmt';
const dbUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`;

// mongodb connection
mongoose.connect(dbUrl)
    .then(res => console.log(`✅ db connection success`))
    .catch(error => console.log(`❌ db connection fails: ${error.message}`));

app.listen(PORT, () => {
    console.log(`✅✅ App is running on port ${PORT}.`);
});

router.get('/user', async(req: Request, res: Response, next: NextFunction) => {
    const users = await UserModel.find({});

    return res.json({
        success: true,
        data: users
    });
});

router.post('/user', async(req: Request, res: Response, next: NextFunction) => {
    const {
        mobileNumber,
        name,
        email,
        address,
        region,
        country,
        message
    } = req.body;

    const oldUser = await UserModel.findOne({ mobileNumber, email });

    if (oldUser) {
        return res.json({
            success: false,
            message: "User Already Exist. Please Login"
        })
    }

    const response = await new UserModel({
        mobileNumber,
        name,
        email,
        address,
        region,
        country,
        message
    }).save();

    if (!!response) {
        return res.json({
            success: true,
            message: "User created successfully!",
            response
        })
    } else {
        return res.json({
            success: false,
            message: "User Creation fails"
        })
    }
});

router.put('/user', async (req: Request, res: Response, next: NextFunction) => {
    const {
        _id,
        mobileNumber,
        name,
        email,
        address,
        region,
        country,
        message
    } = req.body;

    const oldUser = await UserModel.findOne({ _id });

    if (!oldUser) {
        return res.json({
            success: false,
            message: "User not found"
        })
    }


    oldUser.mobileNumber = mobileNumber
    oldUser.name = name
    oldUser.email = email
    oldUser.address = address
    oldUser.region = region
    oldUser.country = country
    oldUser.message = message
    const response: any = await oldUser.save();

    if (!!response) {
        return res.json({
            success: true,
            message: "User updated successfully!",
            data: response
        })
    } else {
        return res.json({
            success: false,
            message: "User updates fails"
        })
    }
});

router.delete('/user', async (req: Request, res: Response, next: NextFunction) => {
    var _id = req.query.id;

    const response = await UserModel.findByIdAndRemove({ _id });

    if (!!response) {
        return res.json({
            success: true,
            message: "User deleted successfully!",
            data: response
        })
    } else {
        return res.json({
            success: false,
            message: "User deletion fails"
        })
    }
});