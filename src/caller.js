import analyticsCalls from "./calls/analytics";
import announcementCalls from "./calls/announcement";
import commentCalls from "./calls/comment";
import departmentCalls from "./calls/department";
import eventCalls from "./calls/event";
import expenseCalls from "./calls/expense";
import feedbackCalls from "./calls/feedback";
import interestCalls from "./calls/interest";
import inviteCalls from "./calls/invite";
import organizationCalls from "./calls/organization";
import organizationValueCalls from "./calls/organization-value";
import passwordCalls from "./calls/password";
import recognitionCalls from "./calls/recognition";
import redemptionCalls from "./calls/redemption";
import rewardCalls from "./calls/reward";
import rsvpCalls from "./calls/rsvp";
import surveyCalls from "./calls/survey";
import surveyItemCalls from "./calls/survey-item";
import surveyItemResponseOptionCalls from "./calls/survey-item-response-option";
import userCalls from "./calls/user";

export default object => {
  analyticsCalls(object);
  announcementCalls(object);
  commentCalls(object);
  departmentCalls(object);
  eventCalls(object);
  expenseCalls(object);
  feedbackCalls(object);
  interestCalls(object);
  inviteCalls(object);
  organizationCalls(object);
  organizationValueCalls(object);
  passwordCalls(object);
  recognitionCalls(object);
  redemptionCalls(object);
  rewardCalls(object);
  rsvpCalls(object);
  surveyCalls(object);
  surveyItemCalls(object);
  surveyItemResponseOptionCalls(object);
  userCalls(object);
  return object;
};
