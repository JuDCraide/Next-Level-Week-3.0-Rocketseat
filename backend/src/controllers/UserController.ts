import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
//import OrphanageView from '../views/OrphanagesView';
import * as Yup from 'yup';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {

    async create(req: Request, res: Response) {
        const {
            name,
            email,
            password,
        } = req.body;

        const userRepository = getRepository(User);

        const hashPassword = await bcrypt.hash(password, 8);
        console.log(hashPassword);


        const data = {
            name,
            email,
            password: hashPassword,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const user = userRepository.create(data);

        await userRepository.save(user);

        return res.status(201).json(user);
    },


    async login(req: Request, res: Response) {
        const {
            email,
            password,
        } = req.body;

        const userRepository = getRepository(User);

        const userInfo = await userRepository.findOneOrFail({ email: email });

        if (!userInfo) {
            return res.status(400).json({ error: "User not found" });
        }

        if (!bcrypt.compare(userInfo.password, password)) {
            return res.status(400).json({ error: "Invalid password" });
        }

        return res.json({
            userInfo,
            token: jwt.sign({ id: userInfo.id }, "secret", {
                expiresIn: 86400
            })
        })

    }
}
