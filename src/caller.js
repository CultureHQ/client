import commentCalls from "./calls/comment";
import departmentCalls from "./calls/department";
import eventCalls from "./calls/event";
import feedbackCalls from "./calls/feedback";
import inviteCalls from "./calls/invite";
import organizationCalls from "./calls/organization";
import passwordCalls from "./calls/password";
import redemptionCalls from "./calls/redemption";
import rewardCalls from "./calls/reward";
import userCalls from "./calls/user";

export default object => {
  commentCalls(object);
  departmentCalls(object);
  eventCalls(object);
  feedbackCalls(object);
  inviteCalls(object);
  organizationCalls(object);
  passwordCalls(object);
  redemptionCalls(object);
  rewardCalls(object);
  userCalls(object);
  return object;
};
