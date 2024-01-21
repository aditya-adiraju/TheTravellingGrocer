import { ObjectId } from 'mongodb';

export default class Item{
    constructor(public name: string, public price: number, public polygonName: string, public id?: ObjectId) {}
}