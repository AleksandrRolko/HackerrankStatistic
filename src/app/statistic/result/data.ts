export class Data {
  models: Model[];
  total: number;
}

export class Model {
  id: number;
  challenge_id: number;
  contest_id: number;
  hacker_id: number;
  status: string;
  kind: string;
  created_at: number;
  language: string;
  hacker_username: string;
  time_ago: string;
  in_contest_bounds: boolean;
  status_code: number;
  score: string;
  is_preliminary_score: string;
  challenge: Challenge;
  inserttime: number;
}

export class Challenge {
  name: string;
  slug: string;
}
