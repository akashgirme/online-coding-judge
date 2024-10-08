import { StatusMessage } from '@code-judge/common';
import { SubmissionState } from '../enums';

export interface UpdateSubmission {
  submissionId: number;
  totalTestCases?: number;
  testCasesPassed?: number;
  statusMessage?: StatusMessage;
  state: SubmissionState;
  stderr?: string;
  time?: number;
  memory?: number;
  finished?: boolean;
}
