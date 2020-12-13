import {Request, Response} from 'express'
import knex from '../database/connection'

class PointsController {

    async index(request:Request, response:Response){

        // cidade, uf, items (Query params para filtros e paginação)
        const {city, uf, items} = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items','points.id','=','point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city',String(city))
            .where('uf',String(uf))
            .distinct()
            .select('points.*')
     
        return response.json(points)
    }

    async show(request:Request, response:Response){
        const {id} = request.params;
        const point = await knex('points').where('id', id).first();

        if(!point){
            return response.status(400).json({message:"Point not found."})
        }
        /*  SELECT * FROM items
        *       JOIN points_items ON items.id = points_items.item_id
        *      WHERE point_items.point_id = [id]
        */
        const items = await knex('items')
            .join('point_items','items.id',"=",'point_items.item_id')
            .where('point_items.point_id',id)
            .select('items.title')

        return response.json({point, items});
        
    }

    async create(request:Request, response:Response){
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items,
            complemento
        } = request.body;
        // caso o segundo await falhar o primeiro tb não executa
        const trx = await knex.transaction();
    
        const point = {
            image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            complemento
        }

        const insertedIds = await trx('points').insert(point)

        const point_id = insertedIds[0]
        // para o relacionamento com a tabela de items
        const pointItems = items.map((item_id: number) =>{
            return ({
                item_id,
                point_id,
            })
        })
        await trx('point_items').insert(pointItems);
    
        await trx.commit();

        return response.json({
            id:point_id,
            ...point,
        })    
    }
}

export default PointsController;