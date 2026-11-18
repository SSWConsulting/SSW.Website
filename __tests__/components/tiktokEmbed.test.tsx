import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import React from "react";
import {
  getTikTokVideoId,
  TikTokEmbed,
  tikTokEmbedSchema,
  validateTikTokVideoUrl,
} from "@/components/embeds/tiktokEmbed";

const videoUrl = "https://www.tiktok.com/@microburbs/video/7700040809642511637";
const shortUrl = "https://vt.tiktok.com/ZSprXmVPK/";

describe("getTikTokVideoId", () => {
  it.each([
    [videoUrl, "7700040809642511637"],
    ["https://tiktok.com/@ssw.tv/video/123?_r=1&_t=ZS-9BCJkYdTyio", "123"],
    ["https://www.tiktok.com/@a/video/123/", "123"],
    ["https://www.tiktok.com/@a/video/123#top", "123"],
    ["HTTPS://WWW.TikTok.com/@a/video/123", "123"],
    [`  ${videoUrl}  `, "7700040809642511637"],
  ])("reads the id from %s", (url, id) => {
    expect(getTikTokVideoId(url)).toBe(id);
  });

  it.each([
    shortUrl,
    "http://www.tiktok.com/@a/video/123",
    "https://www.tiktok.com/@a/video/123abc",
    "https://www.tiktok.com/@a/video/",
    "https://www.tiktok.com/@a/photo/123",
    "https://www.tiktok.com.evil.example/@a/video/123",
    "https://evil.example/www.tiktok.com/@a/video/123",
    "",
    undefined,
  ])("returns undefined for %s", (url) => {
    expect(getTikTokVideoId(url)).toBeUndefined();
  });
});

describe("validateTikTokVideoUrl", () => {
  it("accepts an empty value and a full video URL", () => {
    expect(validateTikTokVideoUrl("")).toBeUndefined();
    expect(validateTikTokVideoUrl(undefined)).toBeUndefined();
    expect(validateTikTokVideoUrl(videoUrl)).toBeUndefined();
  });

  it("rejects a short link with a message that shows the full URL form", () => {
    expect(validateTikTokVideoUrl(shortUrl)).toMatch(
      /^Use the full TikTok video URL, like https:\/\/www\.tiktok\.com\/@/
    );
  });

  it("is the validator of the schema's URL field", () => {
    const urlField = tikTokEmbedSchema.fields[0] as {
      name: string;
      ui: { validate: unknown };
    };

    expect(urlField.name).toBe("url");
    expect(urlField.ui.validate).toBe(validateTikTokVideoUrl);
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

  it("renders the caption without a duration", () => {
    render(<TikTokEmbed url={videoUrl} caption="Moving to Newcastle" />);

    expect(screen.getByText("Video: Moving to Newcastle")).toBeTruthy();
  });

  it("renders no caption when none is set", () => {
    const { container } = render(<TikTokEmbed url={videoUrl} />);

    expect(screen.getByTitle("TikTok video")).toBeTruthy();
    expect(container.querySelector("figcaption")).toBeNull();
  });

  it("links to the video and keeps the caption when the URL has no video id", () => {
    render(<TikTokEmbed url={` ${shortUrl} `} caption="Moving to Newcastle" />);

    expect(screen.queryByTitle(/TikTok video/)).toBeNull();
    const link = screen.getByRole("link", {
      name: "Watch the video on TikTok",
    });
    expect(link.getAttribute("href")).toBe(shortUrl);
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    expect(screen.getByText("Video: Moving to Newcastle")).toBeTruthy();
  });

  it.each(["", "   ", "www.tiktok.com/@a/video/1", "javascript:alert(1)"])(
    "renders nothing for the URL %j",
    (url) => {
      const { container } = render(
        <TikTokEmbed url={url} caption="Moving to Newcastle" />
      );

      expect(container.innerHTML).toBe("");
    }
  );
});
