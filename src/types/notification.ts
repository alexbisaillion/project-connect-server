// xxx has requested to join your project yyy
// zzz has accepted your request to join project yyy
// zzz has invited you to the project yyy
// xxx has accepted your invitation to join project yyy

export enum Operation {
  NewRequest = "NewRequest",
  AcceptedRequest = "AcceptedRequest",
  RejectedRequest = "RejectedRequest",
  NewInvite = "NewInvite",
  AcceptedInvite = "AcceptedInvite",
  RejectedInvite = "RejectedInvite"
}

export type Notification = {
  sender: string;
  operation: Operation;
  timestamp: Date;
  project: string;
}