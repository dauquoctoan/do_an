import { _Creates } from '../service'
import Card from '../models/Card'

class lessonController {
    async createCard(req: any, res: any, next: any) {
        const result = await _Creates(Card, 'Card', req.body)
        res.json(result)
    }
}

export default new lessonController()
