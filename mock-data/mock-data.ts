import { NavMenuItem } from "../models/megamanu/menuItem.model";

export const menuBarItems: NavMenuItem[] = [
  {
    name: "Services",
    menuGroup: {
      mainItems: [
        {
          heading: "Development Teams",
          items: [
            {
              name: "Website Development",
              description:
                "Professional web development service that creates stylish, functional, user-friendly websites",
              icon: "websiteDevelopment",
              href: "/consulting?tag=Website-Development",
            },
            {
              name: "Application Development",
              description:
                "Crafting innovative, reliable, and user-centric mobile applications",
              icon: "applicationDevelopment",
              href: "/consulting?tag=Application-Development",
            },
            {
              name: "Mobile Development",
              description: "Building cutting-edge apps for diverse platforms",
              icon: "mobileDevelopment",
              href: "/consulting?tag=Mobile-Development",
            },
            {
              name: "Al Development",
              description:
                "Creating intelligent, data-driven solutions for businesses",
              icon: "alDevelopment",
              href: "/consulting?tag=AI-Development",
            },
            {
              name: "Database Development",
              description:
                "Constructing robust, scalable, and efficient data management systems",
              icon: "databaseDevelopment",
              href: "/consulting?tag=Database-Development",
            },
            {
              name: "Platform Development",
              description:
                "Delivering versatile, integrated solutions that optimize business operations",
              icon: "platformDevelopment",
              href: "/consulting?tag=Platform-Development",
            },
          ],
        },
        "ColumnBreak",
        {
          heading: "Consulting Teams",
          items: [
            {
              name: "UI/UX Design",
              description:
                "Crafting visually stunning, intuitive user intertaces for seamless experiences",
              icon: "uiUXDesign",
              href: "/consulting?tag=Design",
            },
            {
              name: "Video Production",
              description:
                "Creating captivating, high-quality visual content for impactful storytelling",
              icon: "videoProduction",
              href: "/consulting?tag=Video",
            },
            {
              name: "Cloud and Infrastructure",
              description:
                "Designing scalable, secure, and resilient cloud computing environments",
              icon: "cloudAndInfrastructure",
              href: "/consulting?tag=Cloud-and+Infrastructure",
            },
            {
              name: "Other SSW Service",
              description:
                "SSW's other enterprise software development services",
              icon: "otherSSWService",
              href: "/consulting?tag=Other-SSW+Services",
            },
          ],
          viewAllLink: {
            name: "View all services",
            href: "/consulting",
          },
        },
      ],
      sideBarItems: [
        {
          heading: "Featured",
          items: [
            {
              name: "ChatGPT & GPT-4",
              description: "Unlock the power of language Al for your business",
              category: "featured",
              href: "/consulting/gpt",
            },
            {
              name: "Bring your App to China",
              description:
                "A quick and easy solution for entry into a large and juicy market",
              category: "featured",
              href: "/consulting/chinafy-app",
            },
          ],
        },
        {
          heading: "Free Initial Meeting",
          items: [
            {
              name: "Book Now",
              category: "bookNow",
              href: "/company/contact-us",
            },
          ],
        },
      ],
    },
  },
  {
    name: "Products",
    menuGroup: {
      mainItems: [
        {
          heading: "Web",
          items: [
            {
              name: "SugarLearning",
              description:
                "The next generation on-boarding & induction tool for smart companies",
              icon: "sugarLearning",
              href: "https://www.sugarlearning.com/",
            },
            {
              name: "TimePro",
              description:
                "TimePro offers everything an enterprise needs, such as invoicing, receipting, and time sheeting",
              icon: "timePro",
              href: "https://sswtimepro.com/",
            },
            {
              name: "CodeAuditor",
              description: "Scan any website for broken links and HTML Issues",
              icon: "codeAuditor",
              href: "https://codeauditor.com",
            },
          ],
        },
        "ColumnBreak",
        {
          heading: "AI",
          items: [
            {
              name: "SophieBot",
              description:
                "AI-driven solution that delivers a competitive edge through its ability to find data",
              icon: "sophieBot",
              href: "https://sswsophie.com/sophiebot",
            },
            {
              name: "SophieHub",
              description:
                "A Smart Environment System which shows user specific information based on the user",
              icon: "sophieHub",
              href: "https://sswsophie.com",
            },
          ],
        },
        {
          heading: "Apps",
          items: [
            {
              name: "SSW Rewards",
              description:
                "Scan SSW QR codes, earn SSW Points, claim rewards, and win prizes",
              icon: "sswRewards",
              href: "/products/rewards",
            },
          ],
          viewAllLink: {
            name: "View all products",
            href: "/products/",
          },
        },
      ],
      sideBarItems: [
        {
          heading: "What's New",
          items: [
            {
              name: "SugarLearning V1.50",
              description:
                "The next generation on-boarding & induction tool for smart companies.",
              category: "featured",
              href: "https://www.sugarlearning.com/",
            },
            {
              name: "TimePro V2.10",
              description:
                "TimePro offers everything an enterprise needs, such as invoicing, receipting, and time sheeting",
              category: "featured",
              href: "https://sswtimepro.com/",
            },
          ],
        },
        {
          heading: "Support",
          items: [
            {
              name: "Knowledge Base",
              category: "classicMenu",
              href: "https://pdi-ssw.zendesk.com/hc",
            },
            {
              name: "Report a bug",
              category: "classicMenu",
              href: "https://www.ssw.com.au/ssw/Standards/Support/BugReportOrEnhancement.aspx",
            },
          ],
        },
      ],
    },
  },
  {
    name: "Events & Training",
    menuGroup: {
      mainItems: [
        {
          heading: "User Groups",
          items: [
            {
              name: "Sydney .NET UG",
              href: "/netug/sydney",
            },
            {
              name: "Canberra .NET UG",
              href: "https://www.ssw.com.au/ssw/NETUG/Canberra.aspx",
            },
            {
              name: "Melbourne .NET UG",
              href: "https://www.ssw.com.au/ssw/NETUG/Melbourne.aspx",
            },
            {
              name: "Brisbane Full Stack UG",
              href: "https://www.ssw.com.au/ssw/NETUG/Brisbane.aspx",
            },
            {
              name: "China Fire User Group",
              href: "https://fireusergroup.com/",
            },
          ],
        },
        "ColumnBreak",
        {
          heading: "1-Day Training",
          items: [
            {
              name: "Angular Superpowers Tour",
              href: "/events/angular-superpowers-tour",
            },
            {
              name: "Azure Superpowers Tour",
              href: "/events/azure-superpowers-tour",
            },
            {
              name: "Clean Architecture Superpowers Tour",
              href: "/events/clean-architecture-superpowers-tour",
            },
            {
              name: ".NET Superpowers Tour",
              href: "/events/net-superpowers-tour",
            },
            {
              name: "Azure Super Skills",
              href: "/events/azure-superskills",
            },
          ],
        },
        {
          heading: "2-Day Training",
          items: [
            {
              name: "Angular Workshop",
              href: "/events/angular-workshop",
            },
            {
              name: "Clean Architecture Workshop",
              href: "/events/clean-architecture-workshop",
            },
          ],
        },
        {
          heading: "Hack Days",
          items: [
            {
              name: "Angular Hack Day",
              href: "https://angularhackday.com/",
            },
            {
              name: "MAUI Hack Day",
              href: "https://mauihackday.com/",
            },
            {
              name: "AI Hack Day",
              href: "https://aihackday.com/",
            },
          ],
        },
        "ColumnBreak",
        {
          heading: "Training Services",
          items: [
            {
              name: "Video Production & Live Streaming",
              href: "/consulting/video-production",
            },
            {
              name: "Conference Room for Hire",
              href: "http://sswchapel.com.au/",
            },
          ],
        },
        {
          heading: "SSW Internship Programs",
          items: [
            {
              name: "Full Stack Developers",
              href: "/training/internship-fullstack",
            },
          ],
          viewAllLink: {
            name: "View all events & training",
            href: "/events",
          },
        },
      ],
      sideBarItems: [
        {
          heading: "Resources",
          items: [
            {
              name: "Newsletters",
              category: "classicMenu",
              href: "/newsletters",
            },
            {
              name: "Past Sessions",
              category: "classicMenu",
              href: "https://www.ssw.com.au/ssw/NETUG/PastSessions.aspx",
            },
            {
              name: "Evaluation Survey",
              category: "classicMenu",
              href: "https://www.ssw.com.au/ssw/NETUG/Evaluation-Survey/",
            },
            {
              name: "Developer Links",
              category: "classicMenu",
              href: "https://www.ssw.com.au/ssw/NETUG/Developerlinks.aspx",
            },
          ],
        },
      ],
    },
  },
  {
    name: "About Us",
    menuGroup: {
      mainItems: [
        {
          heading: "Why Us",
          items: [
            {
              name: "About SSW",
              href: "/company/about-us",
            },
            {
              name: "Our History",
              href: "/company/history",
            },
            {
              name: "Awards",
              href: "https://www.ssw.com.au/ssw/Company/Awards",
            },
          ],
        },
        {
          heading: "Who We Are",
          items: [
            {
              name: "Our People",
              href: "https://www.ssw.com.au/people/",
            },
            {
              name: "Employment",
              href: "/employment",
            },
          ],
        },
        "ColumnBreak",
        {
          heading: "Who We Work With",
          items: [
            {
              name: "Our Clients' Stories",
              href: "/company/clients",
            },
            {
              name: "Testimonials",
              href: "https://www.ssw.com.au/ssw/Testimonials/default.aspx",
            },
            {
              name: "Finance",
              href: "/industry/finance",
            },
            {
              name: "Non-Profits",
              href: "/industry/non-profit",
            },
            {
              name: "Educational",
              href: "/industry/educational",
            },
          ],
        },
        "ColumnBreak",
        {
          heading: "Our Blogs",
          items: [
            {
              name: "News & Press",
              href: "/company/news/",
            },
            {
              name: "SSW Blog",
              href: "https://blog.ssw.com.au/",
            },
            {
              name: "Adam's Blog",
              href: "https://adamcogan.com/",
            },
            {
              name: "Newsletters",
              href: "/newsletters",
            },
          ],
        },
      ],
      sideBarItems: [
        {
          heading: "Where to find us",
          items: [
            {
              name: "Our Offices",
              category: "classicMenu",
              href: "/offices",
            },
            {
              name: "Contact Us",
              category: "classicMenu",
              href: "/company/contact-us",
            },
          ],
        },
      ],
    },
  },
  {
    name: "SSW Rules",
    href: "https://www.ssw.com.au/rules",
  },
  {
    name: "SSW TV",
    href: "https://tv.ssw.com.au",
  },
];
