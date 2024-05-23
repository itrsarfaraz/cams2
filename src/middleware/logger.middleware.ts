// logger.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityLog } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(ActivityLog)
        private readonly activityRepository: Repository<ActivityLog>,
    ) { }
    async use(req: any, res: any, next: (error?: any) => void) {
        // if (req.headers.authorization) {
        //     const token = req.headers.authorization.split(' ')[1];
        //     const decodedToken = await this.jwtService.verifyAsync(token);

        //     // Extracting module name and event from originalUrl
        //     const urlParts = req.originalUrl.split('/');
        //     const moduleName = urlParts[2];
        //     let event = urlParts[3];

        //     console.log("Original Url => ", req.originalUrl); // /api/component-detail/getAll

        //     // Checking if the event is not 'getAll' or 'getOne'
        //     // if (event !== 'getAll' && event !== 'getOne') {
        //     //     if (event == "create-or-update") {
        //     //         event = req.body.id ? "update" : "create"
        //     //     }
        //     //     const activityData = {
        //     //         activity: event, // Assuming event represents the action being performed
        //     //         user_id: decodedToken.id,
        //     //         type: moduleName // Including type with module name
        //     //     }

        //     //     const updatedUser = await this.activityRepository.save(activityData);

        //     //     if (!updatedUser) {
        //     //         res.send({
        //     //             "statusCode": 401,
        //     //             "message": "Unauthorized",
        //     //             "data": decodedToken.id
        //     //         });
        //     //     }
        //     // }
        // }
        next();
    }


}
