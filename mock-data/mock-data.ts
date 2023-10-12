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
              href: "https://www.ssw.com.au/ssw/Consulting/Website-Development.aspx",
            },
            {
              name: "Application Development",
              description:
                "Crafting innovative, reliable, and user-centric mobile applications",
              icon: "applicationDevelopment",
              href: "https://www.ssw.com.au/ssw/Consulting/Website-Development.aspx",
            },
            {
              name: "Mobile Development",
              description: "Building cutting-edge apps for diverse platforms",
              icon: "mobileDevelopment",
              href: "https://www.ssw.com.au/ssw/Consulting/Mobile-Development.aspx",
            },
            {
              name: "Al Development",
              description:
                "Creating intelligent, data-driven solutions for businesses",
              icon: "alDevelopment",
              href: "https://www.ssw.com.au/ssw/Consulting/AI-Development.aspx",
            },
            {
              name: "Database Development",
              description:
                "Constructing robust, scalable, and efficient data management systems",
              icon: "databaseDevelopment",
              href: "https://www.ssw.com.au/ssw/Consulting/Database-Development.aspx",
            },
            {
              name: "Platform Development",
              description:
                "Delivering versatile, integrated solutions that optimize business operations",
              icon: "platformDevelopment",
              href: "https://www.ssw.com.au/ssw/Consulting/Platform-Development.aspx",
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
              href: "https://www.ssw.com.au/ssw/Consulting/Website-Development.aspx",
            },
            {
              name: "Video Production",
              description:
                "Creating captivating, high-quality visual content for impactful storytelling",
              icon: "videoProduction",
              href: "https://www.ssw.com.au/ssw/Consulting/Video-Production.aspx",
            },
            {
              name: "Cloud and Infrastructure",
              description:
                "Designing scalable, secure, and resilient cloud computing environments",
              icon: "cloudAndInfrastructure",
              href: "https://www.ssw.com.au/ssw/Consulting/Cloud-and-Infrastructure.aspx",
            },
            {
              name: "Other SSW Service",
              description:
                "SSW's other enterprise software development services",
              icon: "otherSSWService",
              href: "https://www.ssw.com.au/ssw/Consulting/Other-Services.aspx",
            },
          ],
          viewAllLink: {
            name: "View all services",
            href: "https://www.ssw.com.au/ssw/Consulting/",
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
              href: "#",
            },
            {
              name: "Bring your App to China",
              description:
                "A quick and easy solution for entry into a large and juicy market",
              category: "featured",
              href: "#",
            },
          ],
        },
        {
          heading: "Free Initial Meeting",
          items: [
            {
              name: "Book Now",
              category: "bookNow",
              href: "#",
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
              href: "https://www.ssw.com.au/ssw/codeauditor/",
            },
            {
              name: "LinkAuditor",
              description: "Automatically locate broken links on your websites",
              icon: "linkAuditor",
              href: "https://www.ssw.com.au/ssw/codeauditor/",
            },
            {
              name: "SmashingBarrier",
              description:
                "A user control to send feature requests or issue reports directly into related team projects",
              icon: "smashingBarrier",
              href: "https://www.ssw.com.au/ssw/codeauditor/",
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
              href: "https://www.ssw.com.au/ssw/codeauditor/",
            },
            {
              name: "SophieHub",
              description:
                "A Smart Environment System which shows user specific information based on the user",
              icon: "sophieHub",
              href: "https://www.ssw.com.au/ssw/codeauditor/",
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
              href: "https://www.sugarlearning.com/",
            },
          ],
          viewAllLink: {
            name: "View all products",
            href: "https://www.ssw.com.au/products/",
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
              href: "#",
            },
            {
              name: "TimePro V2.10",
              description:
                "TimePro offers everything an enterprise needs, such as invoicing, receipting, and time sheeting",
              category: "featured",
              href: "#",
            },
          ],
        },
        {
          heading: "Support",
          items: [
            {
              name: "Knowledge Base",
              category: "classicMenu",
              href: "#",
            },
            {
              name: "Report a bug",
              category: "classicMenu",
              href: "#",
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
              href: "https://www.ssw.com.au/ssw/NETUG/",
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
              href: "https://www.ssw.com.au/ssw/NETUG/China.aspx",
            },
          ],
        },
        "ColumnBreak",
        {
          heading: "1-Day Training",
          items: [
            {
              name: "Angular Superpowers Tour",
              href: "https://www.ssw.com.au/ssw/Events/Training/Angular-Superpowers-Tour.aspx",
            },
            {
              name: "Azure Superpowers Tour",
              href: "https://www.ssw.com.au/ssw/Events/Training/Azure-Superpowers-Tour.aspx",
            },
            {
              name: "Clean Architecture Superpowers Tour",
              href: "https://www.ssw.com.au/ssw/Events/Training/Clean-Architecture-Superpowers-Tour.aspx",
            },
            {
              name: ".NET Superpowers Tour",
              href: "https://www.ssw.com.au/ssw/Events/Training/NET-Superpowers-Tour.aspx",
            },
            {
              name: "Azure Super Skills",
              href: "https://www.ssw.com.au/ssw/Events/Training/Azure-Super-Skills.aspx",
            },
          ],
        },
        {
          heading: "2-Day Training",
          items: [
            {
              name: "Angular Workshop",
              href: "https://www.ssw.com.au/ssw/Events/Training/Angular-Workshop.aspx",
            },
            {
              name: "Clean Architecture Workshop",
              href: "https://www.ssw.com.au/ssw/Events/Training/Clean-Architecture-Workshop.aspx",
            },
          ],
        },
        {
          heading: "Hack Days",
          items: [
            {
              name: "Angular Hack Day",
              href: "https://www.ssw.com.au/ssw/Events/HackDays/Angular-Hack-Day.aspx",
            },
            {
              name: "MAUI Hack Day",
              href: "https://www.ssw.com.au/ssw/Events/HackDays/MAUI-Hack-Day.aspx",
            },
            {
              name: "AI Hack Day",
              href: "https://www.ssw.com.au/ssw/Events/HackDays/AI-Hack-Day.aspx",
            },
          ],
        },
        "ColumnBreak",
        {
          heading: "Training Services",
          items: [
            {
              name: "Video Production & Live Streaming",
              href: "https://www.ssw.com.au/ssw/Consulting/Video-Production.aspx",
            },
            {
              name: "Conference Room for Hire",
              href: "https://www.ssw.com.au/ssw/Consulting/Conference-Room-Hire.aspx",
            },
          ],
        },
        {
          heading: "SSW Internship Programs",
          items: [
            {
              name: "Full Stack Developers",
              href: "https://www.ssw.com.au/ssw/InternProgram/Full-Stack-Developers.aspx",
            },
          ],
          viewAllLink: {
            name: "View all events & training",
            href: "https://www.ssw.com.au/ssw/Consulting/",
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
              href: "#",
            },
            {
              name: "Past Sessions",
              category: "classicMenu",
              href: "#",
            },
            {
              name: "Evaluation Survey",
              category: "classicMenu",
              href: "#",
            },
            {
              name: "Developer Links",
              category: "classicMenu",
              href: "#",
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
              href: "https://www.ssw.com.au/ssw/Company/AboutUs.aspx",
            },
            {
              name: "Our History",
              href: "https://www.ssw.com.au/ssw/Company/OurHistory.aspx",
            },
            {
              name: "Awards",
              href: "https://www.ssw.com.au/ssw/Company/Awards.aspx",
            },
          ],
        },
        {
          heading: "Who We Are",
          items: [
            {
              name: "Our People",
              href: "https://www.ssw.com.au/people",
            },
            {
              name: "Careers",
              href: "https://www.ssw.com.au/employment",
            },
          ],
        },
        "ColumnBreak",
        {
          heading: "Who We Work With",
          items: [
            {
              name: "Our Clients' Stories",
              href: "https://www.ssw.com.au/people",
            },
            {
              name: "Testimonials",
              href: "https://www.ssw.com.au/employment",
            },
            {
              name: "Finance",
              href: "https://www.ssw.com.au/employment",
            },
            {
              name: "Non-Profits",
              href: "https://www.ssw.com.au/employment",
            },
            {
              name: "Educational",
              href: "https://www.ssw.com.au/employment",
            },
          ],
        },
        "ColumnBreak",
        {
          heading: "Our Blogs",
          items: [
            {
              name: "News & Press",
              href: "https://www.ssw.com.au/people",
            },
            {
              name: "SSW Blog",
              href: "https://www.ssw.com.au/employment",
            },
            {
              name: "Adam's Blog",
              href: "https://www.ssw.com.au/employment",
            },
            {
              name: "Newsletters",
              href: "https://www.ssw.com.au/employment",
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
              href: "#",
            },
            {
              name: "Contact Us",
              category: "classicMenu",
              href: "#",
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
