import AutoPaginator from "../src/auto-paginator";

const PER_PAGE = 5;
const EVENTS = [];

for (let idx = 0; idx < 18; idx += 1) {
  EVENTS.push({ idx, name: `Event ${idx}` });
}

const client = {
  listEvents: ({ page }) => {
    const events = EVENTS.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(EVENTS.length / PER_PAGE),
      totalCount: EVENTS.length
    };

    return Promise.resolve({ events, pagination });
  }
};

test("concatenates all results together", async () => {
  const paginator = new AutoPaginator(client, "events");
  const { events } = await paginator.listEvents();

  expect(events.length).toEqual(EVENTS.length);
});
