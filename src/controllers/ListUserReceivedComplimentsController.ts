import { Request, Response } from 'express';
import { ListUserReceivedComplimentsService } from '../services/ListUserReceivedComplimentsService';

export class ListUserReceivedComplimentsController {
  async handle (req: Request, res: Response) {
    const { user_id } = req
    const listUserReceivedComplimentsController = new ListUserReceivedComplimentsService()
    const compliments = await listUserReceivedComplimentsController.execute(user_id)
    return res.json(compliments)
  }
}
