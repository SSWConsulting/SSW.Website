import { PresenterList } from "@/components/presenters/presenterList";
import { render, screen } from "@testing-library/react";
// This repo leaves setupFilesAfterEnv commented out in jest.config.ts, so the
// jest-dom matchers are not registered globally. Import them here.
import "@testing-library/jest-dom";

// Regression guard for the `linkless` prop.
//
// The /events index cards are a single anchor over the whole card. A presenter
// profile link inside that anchor would be unreachable by pointer while still
// sitting in the tab order, so the card passes `linkless`. These tests pin the
// anchor count either way, so removing the prop cannot quietly reintroduce
// focusable-but-unclickable links.

const presenters = [
  {
    presenter: {
      presenter: { name: "Jack Bear", peopleProfileURL: "/people/jack-bear" },
    },
  },
  {
    presenter: {
      presenter: { name: "Adam Cogan", peopleProfileURL: "/people/adam-cogan" },
    },
  },
];

describe("PresenterList", () => {
  test("links each presenter with a profile url by default", () => {
    const { container } = render(<PresenterList presenters={presenters} />);

    const links = container.querySelectorAll("a");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "/people/jack-bear");
    expect(screen.getByText("Jack Bear")).toBeInTheDocument();
  });

  test("renders no anchors at all when linkless", () => {
    const { container } = render(
      <PresenterList linkless presenters={presenters} />
    );

    expect(container.querySelectorAll("a")).toHaveLength(0);
    // The names must still be there - linkless drops the link, not the text.
    // They render as bare text nodes with no element of their own, so read the
    // container's text rather than querying for elements.
    expect(container.textContent).toContain("Jack Bear");
    expect(container.textContent).toContain("Adam Cogan");
  });

  test("renders nothing when no presenter has a name", () => {
    const { container } = render(
      <PresenterList presenters={[{ presenter: { presenter: {} } }]} />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
