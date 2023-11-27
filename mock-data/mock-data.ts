import { NavMenuGroup } from "../types/megamenu";

export const menuBarItems: NavMenuGroup[] = [
  {
    name: "Services",
    menuColumns: [
      {
        menuColumnGroups: [
          {
            name: "Development Teams",
            menuItems: [
              {
                name: "Web Development",
                url: "/consulting?tag=Web-Development",
                description:
                  "Professional web development service that creates stylish, functional, user-friendly websites",
                iconImg: "/images/megamenu-icons/WebsiteDevelopment.svg",
              },
              {
                name: "Mobile Development",
                url: "/consulting?tag=Mobile-Development",
                description: "Building cutting-edge apps for diverse platforms",
                iconImg: "/images/megamenu-icons/MobileDevelopment.svg",
              },
              {
                name: "AI Development",
                url: "/consulting?tag=AI-Development",
                description:
                  "Creating intelligent, data-driven solutions for businesses",
                iconImg: "/images/megamenu-icons/AIDevelopment.svg",
              },
              {
                name: "Database Development",
                url: "/consulting?tag=Database-Development",
                description:
                  "Constructing robust, scalable, and efficient data management systems",
                iconImg: "/images/megamenu-icons/DatabaseDevelopment.svg",
              },
              {
                name: "Platform Development",
                url: "/consulting?tag=Platform-Development",
                description:
                  "Delivering versatile, integrated solutions that optimize business operations",
                iconImg: "/images/megamenu-icons/PlatformDevelopment.svg",
              },
            ],
          },
          {
            name: "Consulting Teams",
            menuItems: [
              {
                name: "UI/UX Design",
                url: "/consulting?tag=Design",
                description:
                  "Crafting visually stunning, intuitive user intertaces for seamless experiences",
                iconImg: "/images/megamenu-icons/UIUXDesign.svg",
              },
              {
                name: "Video Production",
                url: "/consulting?tag=Video",
                description:
                  "Creating captivating, high-quality visual content for impactful storytelling",
                iconImg: "/images/megamenu-icons/VideoProduction.svg",
              },
              {
                name: "Cloud and Infrastructure",
                url: "/consulting?tag=Cloud-and+Infrastructure",
                description:
                  "Designing scalable, secure, and resilient cloud computing environments",
                iconImg: "/images/megamenu-icons/CloudAndInfrastructure.svg",
              },
              {
                name: "Other SSW Service",
                url: "/consulting?tag=Other-SSW+Services",
                description:
                  "SSW's other enterprise software development services",
                iconImg: "/images/megamenu-icons/OtherSSWService.svg",
              },
            ],
          },
        ],
      },
    ],
    sidebarItems: [
      {
        name: "Featured",
        items: [
          {
            name: "ChatGPT & GPT-4",
            description: "Unlock the power of language Al for your business",
            widgetType: "featured",
            url: "/consulting/gpt",
          },
          {
            name: "Bring your App to China",
            description:
              "A quick and easy solution for entry into a large and juicy market",
            widgetType: "featured",
            url: "/consulting/chinafy-app",
            icon: "chinaFlag",
          },
        ],
      },
      {
        name: "Free Initial Meeting",
        items: [
          {
            name: "Book Now",
            widgetType: "bookNow",
            url: "/company/contact-us",
          },
        ],
      },
    ],
    viewAll: {
      name: "View all services",
      url: "/consulting",
    },
  },
  {
    name: "Products",
    menuColumns: [
      {
        menuColumnGroups: [
          {
            name: "Web",
            menuItems: [
              {
                name: "SugarLearning",
                url: "https://www.sugarlearning.com/",
                description:
                  "The next generation on-boarding & induction tool for smart companies",
                iconImg: "/images/megamenu-icons/SugarLearning.svg",
              },
              {
                name: "TimePro",
                url: "https://sswtimepro.com/",
                description:
                  "TimePro offers everything an enterprise needs, such as invoicing, receipting, and time sheeting",
                iconImg: "/images/megamenu-icons/TimePro.svg",
              },
              {
                name: "CodeAuditor",
                url: "https://codeauditor.com",
                description:
                  "Scan any website for broken links and HTML Issues",
                iconImg: "/images/megamenu-icons/CodeAuditor.svg",
              },
            ],
          },
        ],
      },
      {
        menuColumnGroups: [
          {
            name: "AI",
            menuItems: [
              {
                name: "SophieBot",
                url: "https://sswsophie.com/sophiebot",
                description:
                  "AI-driven solution that delivers a competitive edge through its ability to find data",
                iconImg: "/images/megamenu-icons/SophieBot.svg",
              },
              {
                name: "SophieHub",
                url: "https://sswsophie.com",
                description:
                  "A Smart Environment System which shows user specific information based on the user",
                iconImg: "/images/megamenu-icons/SophieHub.svg",
              },
            ],
          },
          {
            name: "Apps",
            menuItems: [
              {
                name: "SSW Rewards",
                url: "/products/rewards",
                description:
                  "Scan SSW QR codes, earn SSW Points, claim rewards, and win prizes",
                iconImg: "/images/megamenu-icons/SSWRewards.svg",
              },
            ],
          },
        ],
      },
    ],
    sidebarItems: [
      {
        name: "What's New",
        items: [
          {
            name: "SugarLearning V1.50",
            description:
              "The next generation on-boarding & induction tool for smart companies.",
            widgetType: "featured",
            url: "https://www.sugarlearning.com/",
          },
          {
            name: "TimePro V2.10",
            description:
              "TimePro offers everything an enterprise needs, such as invoicing, receipting, and time sheeting",
            widgetType: "featured",
            url: "https://sswtimepro.com/",
          },
        ],
      },
      {
        name: "Support",
        items: [
          {
            name: "Knowledge Base",
            widgetType: "standardLink",
            url: "https://pdi-ssw.zendesk.com/hc",
          },
          {
            name: "Report a bug",
            widgetType: "standardLink",
            url: "https://www.ssw.com.au/ssw/Standards/Support/BugReportOrEnhancement.aspx",
          },
        ],
      },
    ],
    viewAll: {
      name: "View all products",
      url: "/products",
    },
  },
  {
    name: "Events & Training",
    menuColumns: [
      {
        menuColumnGroups: [
          {
            name: "User Groups",
            menuItems: [
              {
                name: "Sydney .NET UG",
                url: "/netug/sydney",
              },
              {
                name: "Canberra .NET UG",
                url: "/netug/canberra",
              },
              {
                name: "Melbourne .NET UG",
                url: "/netug/melbourne",
              },
              {
                name: "Brisbane Full Stack UG",
                url: "/netug/brisbane",
              },
              {
                name: "China Fire User Group",
                url: "https://fireusergroup.com/",
              },
            ],
          },
        ],
      },
      {
        menuColumnGroups: [
          {
            name: "1-Day Training",
            menuItems: [
              {
                name: "Angular Superpowers Tour",
                url: "/events/angular-superpowers-tour",
              },
              {
                name: "Azure Superpowers Tour",
                url: "/events/azure-superpowers-tour",
              },
              {
                name: "Clean Architecture Superpowers Tour",
                url: "/events/clean-architecture-superpowers-tour",
              },
              {
                name: ".NET Superpowers Tour",
                url: "/events/net-superpowers-tour",
              },
              {
                name: "Azure Super Skills",
                url: "/events/azure-superskills",
              },
            ],
          },
          {
            name: "2-Day Training",
            menuItems: [
              {
                name: "Angular Workshop",
                url: "/events/angular-workshop",
              },
              {
                name: "Clean Architecture Workshop",
                url: "/events/clean-architecture-workshop",
              },
            ],
          },
          {
            name: "Hack Days",
            menuItems: [
              {
                name: "Angular Hack Day",
                url: "https://angularhackday.com/",
              },
              {
                name: "MAUI Hack Day",
                url: "https://mauihackday.com/",
              },
              {
                name: "AI Hack Day",
                url: "https://aihackday.com/",
              },
            ],
          },
        ],
      },
      {
        menuColumnGroups: [
          {
            name: "Training Services",
            menuItems: [
              {
                name: "Video Production & Live Streaming",
                url: "/consulting/video-production",
              },
              {
                name: "Conference Room for Hire",
                url: "http://sswchapel.com.au/",
              },
            ],
          },
          {
            name: "SSW Internship Programs",
            menuItems: [
              {
                name: "Full Stack Developers",
                url: "/training/internship-fullstack",
              },
            ],
          },
        ],
      },
    ],
    sidebarItems: [
      {
        name: "Resources",
        items: [
          {
            name: "Newsletters",
            widgetType: "standardLink",
            url: "/newsletters",
          },
          {
            name: "Past Sessions",
            widgetType: "standardLink",
            url: "https://www.ssw.com.au/ssw/NETUG/PastSessions.aspx",
          },
          {
            name: "Evaluation Survey",
            widgetType: "standardLink",
            url: "https://www.ssw.com.au/ssw/NETUG/Evaluation-Survey/",
          },
          {
            name: "Developer Links",
            widgetType: "standardLink",
            url: "https://www.ssw.com.au/ssw/NETUG/Developerlinks.aspx",
          },
        ],
      },
    ],
    viewAll: {
      name: "View all events & training",
      url: "/events",
    },
  },
  {
    name: "About Us",
    menuColumns: [
      {
        menuColumnGroups: [
          {
            name: "Why Us",
            menuItems: [
              {
                name: "About SSW",
                url: "/company/about-us",
              },
              {
                name: "Our History",
                url: "/company/history",
              },
              {
                name: "Awards",
                url: "https://www.ssw.com.au/ssw/Company/Awards",
              },
            ],
          },
          {
            name: "Who We Are",
            menuItems: [
              {
                name: "Our People",
                url: "https://www.ssw.com.au/people/",
              },
              {
                name: "Employment",
                url: "/employment",
              },
            ],
          },
        ],
      },
      {
        menuColumnGroups: [
          {
            name: "Who We Work With",
            menuItems: [
              {
                name: "Our Clients' Stories",
                url: "/company/clients",
              },
              {
                name: "Testimonials",
                url: "https://www.ssw.com.au/company/testimonials",
              },
              {
                name: "Partners",
                url: "/company/partners",
              },
              {
                name: "Finance",
                url: "/industry/finance",
              },
              {
                name: "Non-Profits",
                url: "/industry/non-profit",
              },
              {
                name: "Educational",
                url: "/industry/educational",
              },
            ],
          },
        ],
      },
      {
        menuColumnGroups: [
          {
            name: "Our Blogs",
            menuItems: [
              {
                name: "News & Press",
                url: "/company/news/",
              },
              {
                name: "SSW Blog",
                url: "https://blog.ssw.com.au/",
              },
              {
                name: "Adam's Blog",
                url: "https://adamcogan.com/",
              },
              {
                name: "Newsletters",
                url: "/newsletters",
              },
            ],
          },
        ],
      },
    ],
    sidebarItems: [
      {
        name: "Where to find us",
        items: [
          {
            name: "Our Offices",
            widgetType: "standardLink",
            url: "/offices",
          },
          {
            name: "Contact Us",
            widgetType: "standardLink",
            url: "/company/contact-us",
          },
        ],
      },
    ],
    viewAll: {
      name: "View all products",
      url: "/products",
    },
  },
  {
    name: "SSW Rules",
    url: "https://www.ssw.com.au/rules",
  },
  {
    name: "SSW TV",
    url: "https://tv.ssw.com.au/",
  },
];
