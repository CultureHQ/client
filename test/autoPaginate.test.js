import apiCalls from "../src/apiCalls";
import { autoPaginate } from "../src/client";

jest.mock("../src/apiCalls", () => ({ listEvents: jest.fn() }));

const PER_PAGE = 5;
const EVENTS = [...Array(18)].map((empty, idx) => ({ idx, name: `Event ${idx}` }));

test("exits early if there's only one page of responses", async () => {
  apiCalls.listEvents.mockImplementation(({ page }) => Promise.resolve({
    events: EVENTS,
    pagination: { currentPage: page, totalPages: 1, totalCount: EVENTS.length }
  }));

  const { events, pagination } = await autoPaginate("events").listEvents();

  expect(events.length).toEqual(EVENTS.length);
  expect(pagination.totalPages).toEqual(1);
});

test("concatenates all results together", async () => {
  apiCalls.listEvents.mockImplementation(({ page }) => {
    const events = EVENTS.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(EVENTS.length / PER_PAGE),
      totalCount: EVENTS.length
    };

    return Promise.resolve({ events, pagination });
  });

  const { events, pagination } = await autoPaginate("events").listEvents();

  expect(events.length).toEqual(EVENTS.length);
  expect(pagination.totalPages).toEqual(Math.ceil(EVENTS.length / PER_PAGE));
});
