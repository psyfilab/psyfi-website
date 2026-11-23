export type Person = {
    name: string;
    role: string;
    /** one line per degree / affiliation */
    details: string[];
    /** file inside /public (names are case-sensitive on the live server) */
    photo: string;
    linkedin: string;
};

export const ADVISORS: Person[] = [
    {
        name: "Sriraman Jagannathan",
        role: "Independent Director, Bobcard",
        details: [
            "B.Tech., Indian Institute of Technology, Delhi",
            "PGDM MBA, Indian Institute of Management, Ahmedabad",
        ],
        photo: "/Sriram.avif",
        linkedin: "https://www.linkedin.com/in/sriram-jaganathan-16868a44/",
    },
    {
        name: "Dr. Pavan Mamidi",
        role: "Director, Centre for Social and Behaviour Change",
        details: ["PhD., Oxford University", "LL.M., Harvard University"],
        photo: "/Pavan.avif",
        linkedin: "https://www.linkedin.com/in/pavan-mamidi-28081a133/",
    },
    {
        name: "Dr. Sharon Barnhardt",
        role: "Director Empirics, Centre for Social and Behaviour Change",
        details: ["PhD., Harvard University", "M.P.A, Princeton University"],
        photo: "/sharon.avif",
        linkedin: "https://www.linkedin.com/in/sharon-barnhardt-a6277282/",
    },
    {
        name: "Dr. Sneha Shashidhara",
        role: "Senior Research Fellow, Centre for Social and Behaviour Change",
        details: ["PhD., University of Cambridge"],
        photo: "/Sneha.avif",
        linkedin: "https://www.linkedin.com/in/sneha-shashidhara-616195177/",
    },
];

export const TEAM: Person[] = [
    {
        name: "Shreya Hasurkar",
        role: "Founder",
        details: [
            "Deputy Programme Manager, Uttar Pradesh Behavioural Insights Unit",
            "B.A (Hons), Ashoka University",
        ],
        photo: "/Shreya.avif",
        linkedin: "https://www.linkedin.com/in/shreya-h-587aa885/",
    },
    {
        name: "Darshil Shah",
        role: "Behavioural Intelligence & Product Design",
        details: ["M.A, Freie Universität Berlin", "B.A, St. Xavier's College"],
        photo: "/Darshil.avif",
        linkedin: "https://www.linkedin.com/in/darshilshah2798/",
    },
    {
        name: "Ahaan Bagwe",
        role: "Operations",
        details: [
            "M.A, Pennsylvania State University",
            "B.A, B.S., Information Science, Pennsylvania State University",
        ],
        photo: "/Ahaan.avif",
        linkedin: "https://www.linkedin.com/in/ahaan-bagwe-b4664217b/",
    },
    {
        name: "Uday Gundu",
        role: "Product Engineering Fellow",
        details: ["B.Tech., Computer Science and Engineering (Data Science)"],
        photo: "/uday.jpeg",
        linkedin: "https://www.linkedin.com/in/uday-gundu-4b8658268/",
    },
];