import { Request, Response } from 'express';
import { ListUserSenderComplimentsService } from '../services/ListUserSenderComplimentsService';

export class ListUserSenderComplimentsController {
  async handle (req: Request, res: Response) {
    const { user_id } = req
    const listUserSenderComplimentsService = new ListUserSenderComplimentsService()
    const compliments = await listUserSenderComplimentsService.execute(user_id)
    return res.json(compliments)
  }
}
