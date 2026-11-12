import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import React from "react";
import { getTikTokVideoId, TikTokEmbed } from "@/components/embeds/tiktokEmbed";

const videoUrl = "https://www.tiktok.com/@microburbs/video/7700040809642511637";

describe("getTikTokVideoId", () => {
  it("reads the id from a full video URL", () => {
    expect(getTikTokVideoId(videoUrl)).toBe("7700040809642511637");
  });

  it("ignores the query string and the missing www", () => {
    expect(
      getTikTokVideoId(
        "https://tiktok.com/@ssw.tv/video/123?_r=1&_t=ZS-9BCJkYdTyio"
      )
    ).toBe("123");
  });

  it("returns undefined for a short share link and other sites", () => {
    expect(
      getTikTokVideoId("https://vt.tiktok.com/ZSprXmVPK/")
    ).toBeUndefined();
    expect(
      getTikTokVideoId("https://evil.example/www.tiktok.com/@a/video/1")
    ).toBeUndefined();
    expect(getTikTokVideoId(undefined)).toBeUndefined();
  });
});

describe("TikTokEmbed", () => {
  it("renders the TikTok player with the caption and duration", () => {
    render(
      <TikTokEmbed
        url={videoUrl}
        caption="Moving to Newcastle"
        duration="52 sec"
      />
    );

    const player = screen.getByTitle("TikTok video: Moving to Newcastle");
    expect(player.getAttribute("src")).toBe(
      "https://www.tiktok.com/player/v1/7700040809642511637?description=1&music_info=1&rel=0"
    );
    expect(
      screen.getByText("Video: Moving to Newcastle (52 sec)")
    ).toBeTruthy();
  });

  it("renders no caption when none is set", () => {
    const { container } = render(<TikTokEmbed url={videoUrl} />);

    expect(screen.getByTitle("TikTok video")).toBeTruthy();
    expect(container.querySelector("figcaption")).toBeNull();
  });

  it("links to the video when the URL has no video id", () => {
    render(<TikTokEmbed url="https://vt.tiktok.com/ZSprXmVPK/" />);

    expect(screen.queryByTitle("TikTok video")).toBeNull();
    expect(
      screen.getByRole("link", { name: "Watch the video on TikTok" })
    ).toHaveProperty("href", "https://vt.tiktok.com/ZSprXmVPK/");
  });
});
