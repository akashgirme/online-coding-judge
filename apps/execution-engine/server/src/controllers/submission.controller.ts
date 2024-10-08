import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { SubmissionService } from '../services';
import { ExecutionRequestSchema } from '@code-judge/common';
import { logger } from '../utils';

@injectable()
export class SubmissionController {
  constructor(private submissionService: SubmissionService) {}

  async executeCode(req: Request, res: Response) {
    try {
      const result = ExecutionRequestSchema.safeParse(req.body);
      if (!result.success) {
        res.status(400).json({ errors: result.error.errors });
        return;
      }

      await this.submissionService.executeCode(req.body);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ message: 'Execution request received successfully' });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
