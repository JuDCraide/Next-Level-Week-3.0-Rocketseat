import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import OrphanageView from '../views/OrphanagesView';
import * as Yup from 'yup';

export default {

    async index(req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return res.json(OrphanageView.renderApproved(orphanages));
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return res.json(OrphanageView.render(orphanage));
    },

    async create(req: Request, res: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            phone,
            open_hours,
            open_on_weekends,
        } = req.body;

        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = req.files as Express.Multer.File[];
        const images = requestImages.map(img => {
            return { path: img.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            phone,
            open_hours,
            open_on_weekends: open_on_weekends === "true",
            approved: false,
            images,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            phone: Yup.string().required().min(10).max(10),
            open_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            approved: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required(),
                })
            ),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const orphanage = orphanagesRepository.create(data);

        await orphanagesRepository.save(orphanage);

        return res.status(201).json(orphanage);
    },

    async update(req: Request, res: Response) {
        const {
            id,
            name,
            latitude,
            longitude,
            about,
            instructions,
            phone,
            open_hours,
            open_on_weekends,
            approved,
        } = req.body;

        const orphanagesRepository = getRepository(Orphanage);

        // const requestImages = req.files as Express.Multer.File[];
        // const images = requestImages.map(img => {
        //     return { path: img.filename }
        // })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            phone,
            open_hours,
            open_on_weekends: open_on_weekends === "true",
            approved: approved === "true",
            // images,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            phone: Yup.string().required().min(10).max(10),
            open_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            approved: Yup.boolean().required(),
            // images: Yup.array(
            //     Yup.object().shape({
            //         path: Yup.string().required(),
            //     })
            // ),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const orphanage = await orphanagesRepository.update({ id: id }, data);

        return res.status(201).json(orphanage);
    }
}