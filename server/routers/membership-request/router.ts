import { createMembershipRequest } from "./mutations/create-request";
import { dismissMembershipRequest } from "./mutations/dismiss-request";
import { respondToMembershipRequest } from "./mutations/respond-to-request";
import { listMembershipRequests } from "./queries/list-requests";
import { getMembershipRequest } from "./queries/get-request";
import { getMyMembershipRequest } from "./queries/get-my-request";

export const membershipRequestRouter = {
  create: createMembershipRequest,
  dismiss: dismissMembershipRequest,
  respond: respondToMembershipRequest,
  list: listMembershipRequests,
  getById: getMembershipRequest,
  getMy: getMyMembershipRequest,
};

