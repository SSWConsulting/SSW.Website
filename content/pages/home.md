---
title: Tina Cloud Starter
blocks:
  - items:
      - label: Why should you choose to build your SSW web application?
        link: >-
          https://player.vimeo.com/video/400817895?h=caf7b4856a&title=0&byline=0&portrait=0&playsinline=0&autoplay=1&autopause=0&app_id=122963
        openIn: modal
        imgSrc: /uploads/why-ssw.jpeg
      - label: Case Study - Improving Radiologists' Ability to Detect Breast Cancer
        link: >-
          https://www.ssw.com.au/SSW/Consulting/Case-Study/SydneyUni.aspx
        openIn: sameWindow
        imgSrc: /uploads/case-study.jpeg
      - label: SSW TV
        link: >-
          https://tv.ssw.com/
        openIn: newWindow
        imgSrc: /uploads/ssw-tv.png
      - label: Are your staff being driven nuts by outdated software or manual processes?
        link: >-
          https://www.ssw.com.au/ssw/Consulting/Are-You-Stuck.aspx
        openIn: sameWindow
        imgSrc: /uploads/need-help.jpeg
    _template: carousel
  - headline: Welcome to the Tina Starter
    text: >
      This project is set up to show you the basics of working with Tina. You're
      looking at the landing page, which pulls content from
      content/pages/home.md, components from components/blocks, and puts them
      all together in pages/\[filename].tsx, all based on a schema defined in
      .tina/schema.ts.
    actions:
      - label: Get Started
        type: button
        icon: true
        link: /posts
      - label: Read Blog
        type: link
        icon: false
        link: /posts
    image:
      src: /uploads/unsplash-75EFpyXu3Wg.jpg
      alt: >-
        Photo of palm trees at sunset by Adam Birkett -
        unsplash.com/photos/75EFpyXu3Wg
    color: default
    _template: hero
  - items:
      - icon:
          name: BiCodeBlock
          color: red
          style: float
        title: Amazing Feature
        text: >-
          Aliquam blandit felis rhoncus, eleifend ipsum in, condimentum nibh.
          Praesent ac faucibus risus, eu lacinia enim.
      - icon:
          name: BiLike
          color: primary
          style: float
        title: This Is a Feature
        text: Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.
      - icon:
          name: BiPalette
          color: green
          style: float
        title: Configurable Theme
        text: >-
          Edit global theme configuration with Tina. Change your theme's primary
          color, font, or icon set.
    color: tint
    _template: features
---
