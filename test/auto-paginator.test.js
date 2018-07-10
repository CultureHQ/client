import AutoPaginator from "../src/auto-paginator";

const PER_PAGE = 5;
const EVENTS = [];

for (let idx = 0; idx < 18; idx += 1) {
  EVENTS.push({ idx, name: `Event ${idx}` });
}

const singlePageClient = {
  listEvents: ({ page }) => Promise.resolve({
    events: EVENTS,
    pagination: { currentPage: page, totalPages: 1, totalCount: EVENTS.length }
  })
};

const multiplePageClient = {
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

test("exits early if there's only one page of responses", async () => {
  const paginator = new AutoPaginator(singlePageClient, "events");
  const { events } = await paginator.listEvents();

  expect(events.length).toEqual(EVENTS.length);
});

test("concatenates all results together", async () => {
  const paginator = new AutoPaginator(multiplePageClient, "events");
  const { events } = await paginator.listEvents();

  expect(events.length).toEqual(EVENTS.length);
});
