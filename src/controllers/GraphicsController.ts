import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Patient } from "../entities/Patient";
import { Categorias } from "../entities/Category";

class GraphicsController {
    async handleListGraphics(request: Request, response: Response) {
        return response.render("graphics/index");
    }

    async getChartData(request: Request, response: Response) {
        const patientRepository = getRepository(Patient);
        const categoryRepository = getRepository(Categorias);

        const patientsByProvince = await patientRepository
            .createQueryBuilder("patient")
            .select("patient.provincia", "province")
            .addSelect("COUNT(patient.id)", "count")
            .groupBy("patient.provincia")
            .getRawMany();

        const categoriesByProvince = await patientRepository
            .createQueryBuilder("patient")
            .leftJoinAndSelect("patient.category", "category")
            .select("patient.provincia", "province")
            .addSelect("category.nombre", "category")
            .addSelect("COUNT(patient.id)", "count")
            .groupBy("patient.provincia")
            .addGroupBy("category.nombre")
            .getRawMany();

        response.json({ patientsByProvince, categoriesByProvince });
    }
}

export{GraphicsController}