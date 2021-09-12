export class User{
  name: string;
  email: string;
}

export class UserBidConfig{
  user: User;
  max_bid_amount: number;
  created_at: string;
}

export class UserAutoBidConfigRequest{
  user: User;
  amount: number;
}
