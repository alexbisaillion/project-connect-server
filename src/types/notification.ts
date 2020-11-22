// xxx has requested to join your project yyy
// zzz has accepted your request to join project yyy
// zzz has invited you to the project yyy
// xxx has accepted your invitation to join project yyy

export enum Operation {
  NewInvite = "NewInvite",
  AcceptedRequest = "AcceptedRequest",
  NewRequest = "NewRequest",
  AcceptedInvite = "AcceptedInvite"
}

export type Notification = {
  sender: string;
  operation: Operation;
  timestamp: Date;
  project: string;
}