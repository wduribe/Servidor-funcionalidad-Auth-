import { Router, type Request, type Response } from 'express';


export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    router.use('/api/auth', (req: Request, res: Response)=> {
        res.send('<h1>Hola Mundo</h1>');
    });
    
    return router;
  }


}

