export interface JobListing {
  job_id: string;
  employer_name: string;
  employer_logo?: string | null;
  job_employment_type: string;
  job_title: string;
  job_description: string;
  job_apply_link: string;
  job_city: string;
  job_country: string;
  job_posted_at_timestamp: number;
  job_min_salary?: number;
  job_max_salary?: number;
}

// Using the job listings from your paste.txt as a starting point
export const mockJobListings: JobListing[] = [
  // Data Engineering roles
  {
    job_id: "1594911358",
    employer_name: "Deep Sync",
    employer_logo: "https://recruiting.paylocity.com/recruiting/jobs/GetLogoFile?moduleId=21024",
    job_employment_type: "Full-time",
    job_title: "Data Engineer (Hybrid)",
    job_description: "Deep Sync is the industry leader in deterministic identity solutions. We're seeking a Data Engineer with 3+ years of experience in SQL Query Design, Data Warehouse Design, and ETL Development. You'll be designing, implementing, and maintaining our data infrastructure, integrating data from diverse sources, and optimizing performance of data pipelines and databases. The ideal candidate has strong experience with relational data warehouse systems and programming skills in Python, Java, or C#. This is a hybrid position requiring in-office presence Tuesday-Thursday in our Kirkland office. Benefits include competitive salary, flexible time off, comprehensive health insurance, and 401(k) with employer matching.",
    job_apply_link: "https://careers.deepsync.com/jobs/data-engineer-hybrid",
    job_city: "Kirkland",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 86400,
    job_min_salary: 80000,
    job_max_salary: 120000
  },
  {
    job_id: "1594874202",
    employer_name: "Visa",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/visa.svg",
    job_employment_type: "Full-time",
    job_title: "Sr. Data Engineer",
    job_description: "Visa, a global leader in digital payments, is seeking a Senior Data Engineer to join our Ecosystem & Operational Risk technology team. You'll play a key role in building critical risk and fraud detection services, collaborating with cross-functional stakeholders to develop and implement new data-driven business solutions. Responsibilities include translating business requirements into technical solutions, implementing data models and pipelines, and ensuring data quality and compliance with regulatory requirements. The ideal candidate has expertise in data engineering technologies including SQL, Python, Spark, and experience with cloud platforms (AWS/Azure/GCP). Join us to make an impact in the rapidly evolving payments industry while working with cutting-edge technology.",
    job_apply_link: "https://careers.visa.com/jobs/R-00054321",
    job_city: "Austin",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 172800,
    job_min_salary: 116500,
    job_max_salary: 164500
  },
  {
    job_id: "2084911359",
    employer_name: "Amazon",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/amazon-icon-1.svg",
    job_employment_type: "Full-time",
    job_title: "Business Intelligence Analyst",
    job_description: "Amazon is seeking a Business Intelligence Analyst to join our Retail Analytics team. In this role, you'll work with large datasets to extract insights that drive strategic business decisions across our retail organization. You'll develop dashboards, reports, and analytical models that help stakeholders understand customer behavior, product performance, and operational efficiency. The ideal candidate has 3+ years of experience with SQL, data visualization tools (Tableau/Power BI), and a strong understanding of retail metrics and KPIs. Experience with AWS analytics services and Python/R is a plus. Join us to solve complex problems at scale and help shape the future of e-commerce.",
    job_apply_link: "https://www.amazon.jobs/en/jobs/2244358",
    job_city: "Seattle",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 129600,
    job_min_salary: 90000,
    job_max_salary: 130000
  },
  {
    job_id: "2084911360",
    employer_name: "Spotify",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/spotify-2.svg",
    job_employment_type: "Full-time",
    job_title: "Data Analyst - User Experience",
    job_description: "Spotify is looking for a Data Analyst to join our User Experience team. You'll analyze user behavior data to help product and design teams make data-informed decisions. Your insights will directly impact how millions of listeners interact with Spotify. Responsibilities include designing and implementing A/B tests, creating exploratory analyses, building and maintaining dashboards, and collaborating with cross-functional teams to identify opportunities for improvement. The ideal candidate has 2+ years of experience with SQL, statistical analysis, and data visualization, plus familiarity with experimental design concepts. Experience with Python or R and a background in music or entertainment is a plus.",
    job_apply_link: "https://www.lifeatspotify.com/jobs/data-analyst-user-experience",
    job_city: "New York",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 86400,
    job_min_salary: 85000,
    job_max_salary: 120000
  },
  {
    job_id: "2084911361",
    employer_name: "Walmart",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/walmart.svg",
    job_employment_type: "Full-time",
    job_title: "Supply Chain Data Analyst",
    job_description: "Walmart is seeking a Supply Chain Data Analyst to join our Global Supply Chain Analytics team. In this role, you'll analyze distribution network data to identify opportunities for cost reduction, efficiency improvements, and enhanced customer experience. You'll develop forecasting models, perform inventory analysis, and create dashboards that provide actionable insights to operations teams. The ideal candidate has 3+ years of experience with SQL, Excel advanced functions, and data visualization tools, plus knowledge of supply chain metrics and processes. Experience with Python/R and large-scale retail operations is a plus. Join us to help transform the world's largest retail supply chain through data-driven decision making.",
    job_apply_link: "https://careers.walmart.com/us/jobs/WD1234568-supply-chain-data-analyst",
    job_city: "Bentonville",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 172800,
    job_min_salary: 75000,
    job_max_salary: 100000
  },
  {
    job_id: "2594864825",
    employer_name: "Adobe",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/adobe-1.svg",
    job_employment_type: "Full-time",
    job_title: "Senior Software Engineer - Frontend",
    job_description: "Adobe is seeking a passionate Senior Frontend Engineer to join our Creative Cloud team. You'll build engaging user experiences using React, TypeScript, and modern web technologies that power creative applications used by millions worldwide. Responsibilities include implementing new features, optimizing performance, ensuring accessibility, and collaborating with design and product teams. The ideal candidate has 5+ years of professional frontend development experience, deep knowledge of React, modern JavaScript practices, and browser performance optimization techniques. Experience with GraphQL, state management libraries, and CI/CD workflows is highly desirable. Join us to shape the future of creative software and help people bring their ideas to life.",
    job_apply_link: "https://careers.adobe.com/us/en/job/R131495/Senior-Software-Engineer-Frontend",
    job_city: "San Jose",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 345600,
    job_min_salary: 140000,
    job_max_salary: 180000
  },
  {
    job_id: "2594864826",
    employer_name: "Shopify",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/shopify-2.svg",
    job_employment_type: "Full-time",
    job_title: "Backend Developer - Ruby on Rails",
    job_description: "Shopify is looking for an experienced Ruby on Rails developer to join our Core Platform team. You'll design and build scalable services that power our e-commerce platform used by millions of merchants worldwide. Responsibilities include developing APIs that enable third-party developers, optimizing database performance, and ensuring system reliability under high transaction loads. The ideal candidate has 4+ years of backend development experience with Ruby on Rails, experience designing REST and GraphQL APIs, and knowledge of database optimization techniques. Experience with distributed systems, microservices architecture, and cloud infrastructure is a plus. Join us to solve complex technical challenges that help entrepreneurs around the world build successful businesses.",
    job_apply_link: "https://www.shopify.com/careers/backend-developer-ruby-on-rails-remote-americas-r-00049356",
    job_city: "Remote",
    job_country: "Canada",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 86400,
    job_min_salary: 100000,
    job_max_salary: 150000
  },
  {
    job_id: "3594864827",
    employer_name: "Airbnb",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/airbnb.svg",
    job_employment_type: "Full-time",
    job_title: "Machine Learning Engineer",
    job_description: "Airbnb is seeking a Machine Learning Engineer to join our Search Ranking team. You'll develop ML models that power our search and recommendation systems, improving the matching quality between guests and hosts. Responsibilities include feature engineering, model development, A/B testing, and deploying production ML systems at scale. The ideal candidate has 3+ years of industry experience building ML systems, proficiency in Python and ML frameworks (TensorFlow, PyTorch), experience with distributed computing, and strong knowledge of ranking algorithms. Your work will directly impact how millions of users discover and book accommodations worldwide, creating magical travel experiences for our community.",
    job_apply_link: "https://careers.airbnb.com/positions/5317589",
    job_city: "San Francisco",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 259200,
    job_min_salary: 150000,
    job_max_salary: 210000
  },
  {
    job_id: "3594864828",
    employer_name: "Instacart",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/instacart-1.svg",
    job_employment_type: "Full-time",
    job_title: "Data Scientist - Supply Chain",
    job_description: "Instacart is looking for a Data Scientist to join our Supply Chain Analytics team. You'll use statistical modeling and machine learning to optimize our fulfillment network, improve delivery time predictions, and enhance overall operational efficiency. Responsibilities include analyzing large datasets, designing experiments, building predictive models, and communicating insights to stakeholders. The ideal candidate has 3+ years of experience in a quantitative role, strong programming skills in SQL and Python/R, experience with experimental design, and a Master's or PhD in a quantitative field. Join us to solve complex supply chain challenges that directly impact how quickly and efficiently groceries and essentials are delivered to millions of customers.",
    job_apply_link: "https://instacart.careers/job/?id=4870921",
    job_city: "Chicago",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 172800,
    job_min_salary: 130000,
    job_max_salary: 170000
  },

  // Product Management roles
  {
    job_id: "4594864829",
    employer_name: "Slack",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg",
    job_employment_type: "Full-time",
    job_title: "Senior Product Manager",
    job_description: "Slack is looking for a Senior Product Manager to join our Enterprise team. You'll drive the strategy and execution for features that serve our largest customers, with a focus on security, compliance, and administration capabilities. Responsibilities include defining product requirements, collaborating with engineering and design teams, conducting user research, and working with go-to-market teams to ensure successful feature launches. The ideal candidate has 5+ years of product management experience, a track record of shipping successful enterprise software products, strong analytical skills, and excellent communication abilities. Join us to shape the future of work communication and help organizations of all sizes collaborate more effectively.",
    job_apply_link: "https://salesforce.wd1.myworkdayjobs.com/slack/job/California---San-Francisco/Senior-Product-Manager--Enterprise_JR181750",
    job_city: "San Francisco",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 86400,
    job_min_salary: 155000,
    job_max_salary: 210000
  },
  {
    job_id: "4594864830",
    employer_name: "Notion",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/notion-logo-1.svg",
    job_employment_type: "Full-time",
    job_title: "Product Manager - Mobile",
    job_description: "Notion is seeking a Product Manager to lead our mobile product experience. You'll define the roadmap and strategy for Notion's iOS and Android apps, ensuring a seamless experience across devices while adapting to the unique constraints and opportunities of mobile platforms. Responsibilities include identifying user needs, prioritizing features, collaborating with design and engineering teams, and analyzing usage metrics to drive continuous improvement. The ideal candidate has 3+ years of product management experience with consumer mobile applications, strong analytical skills, and excellent communication abilities. Join us to help build the future of productivity tools and empower users to capture and organize their ideas from anywhere.",
    job_apply_link: "https://www.notion.so/careers/product-manager-mobile",
    job_city: "Remote",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 345600,
    job_min_salary: 130000,
    job_max_salary: 175000
  },
  {
    job_id: "5594864831",
    employer_name: "Figma",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/figma-5.svg",
    job_employment_type: "Full-time",
    job_title: "Senior Product Designer",
    job_description: "Figma is looking for a Senior Product Designer to join our growing design team. You'll shape the future of collaborative design tools, focusing on features that enable better workflows for designers, developers, and stakeholders. Responsibilities include leading design projects from concept to launch, creating intuitive interfaces and interactions, conducting user research, and contributing to our design system. The ideal candidate has 5+ years of product design experience, a portfolio demonstrating strong product thinking and visual design skills, and experience designing professional software tools. Join us to redefine how people collaborate on design and help make design accessible to everyone.",
    job_apply_link: "https://www.figma.com/careers/job/senior-product-designer/",
    job_city: "San Francisco",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 172800,
    job_min_salary: 150000,
    job_max_salary: 190000
  },
  {
    job_id: "5594864832",
    employer_name: "Canva",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/canva-1.svg",
    job_employment_type: "Full-time",
    job_title: "UX Researcher",
    job_description: "Canva is seeking a UX Researcher to help us better understand our users and inform product decisions. You'll plan and conduct qualitative and quantitative research using methods such as interviews, usability testing, surveys, and data analysis. Responsibilities include designing research studies, recruiting participants, synthesizing findings into actionable insights, and collaborating with product and design teams to implement improvements. The ideal candidate has 3+ years of UX research experience, familiarity with various research methodologies, strong analytical skills, and excellent communication abilities. Join our mission to empower everyone to design anything and publish anywhere.",
    job_apply_link: "https://www.canva.com/careers/jobs/sydney-australia/ux-researcher/",
    job_city: "Sydney",
    job_country: "Australia",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 86400,
    job_min_salary: 95000,
    job_max_salary: 135000
  },
  {
    job_id: "6594864833",
    employer_name: "HubSpot",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/hubspot-2.svg",
    job_employment_type: "Full-time",
    job_title: "Content Marketing Manager",
    job_description: "HubSpot is looking for a Content Marketing Manager to join our growing marketing team. You'll develop and execute content strategies that drive brand awareness, engage our audience, and support our inbound marketing efforts. Responsibilities include creating high-quality content across various formats (blog posts, ebooks, videos), managing an editorial calendar, analyzing content performance, and collaborating with subject matter experts. The ideal candidate has 3+ years of content marketing experience, exceptional writing and editing skills, understanding of SEO best practices, and experience creating content for B2B audiences. Join us to help businesses grow better through remarkable content that educates and inspires.",
    job_apply_link: "https://www.hubspot.com/careers/jobs/marketing/content-marketing-manager-cambridge-massachusetts-united-states-4615684",
    job_city: "Cambridge",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 259200,
    job_min_salary: 85000,
    job_max_salary: 115000
  },
  {
    job_id: "6594864834",
    employer_name: "Mailchimp",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/mailchimp-freddie-icon-1.svg",
    job_employment_type: "Full-time",
    job_title: "Digital Marketing Specialist",
    job_description: "Mailchimp is seeking a Digital Marketing Specialist to help drive our customer acquisition efforts. You'll plan and execute digital marketing campaigns across multiple channels including paid search, social media, and display advertising. Responsibilities include managing campaign budgets, optimizing performance, analyzing results, and collaborating with creative teams to develop compelling ad content. The ideal candidate has 2+ years of digital marketing experience, proficiency with marketing platforms (Google Ads, Facebook Ads, etc.), analytical skills for campaign optimization, and excellent communication abilities. Join us to help small businesses grow through effective digital marketing strategies.",
    job_apply_link: "https://www.intuit.com/careers/job/digital-marketing-specialist-atlanta-georgia-united-states-35621/",
    job_city: "Atlanta",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 432000,
    job_min_salary: 65000,
    job_max_salary: 85000
  },
  // Project Management roles
  {
    job_id: "7084911362",
    employer_name: "Microsoft",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg",
    job_employment_type: "Full-time",
    job_title: "Technical Program Manager",
    job_description: "Microsoft is seeking a Technical Program Manager to join our Cloud & AI division. You'll lead cross-functional teams to deliver complex technical projects that advance our cloud infrastructure and AI capabilities. Responsibilities include defining project scope and requirements, creating and managing project plans, coordinating resources across engineering teams, identifying and mitigating risks, and communicating status to stakeholders. The ideal candidate has 4+ years of technical program management experience, strong understanding of software development methodologies, excellent communication and leadership skills, and technical background in cloud computing or AI. Join us to help shape the future of technology and empower every person and organization on the planet to achieve more.",
    job_apply_link: "https://careers.microsoft.com/us/en/job/1484693/Technical-Program-Manager",
    job_city: "Redmond",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 129600,
    job_min_salary: 120000,
    job_max_salary: 160000
  },
  {
    job_id: "7084911363",
    employer_name: "Atlassian",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/atlassian-1.svg",
    job_employment_type: "Full-time",
    job_title: "Agile Project Manager",
    job_description: "Atlassian is looking for an Agile Project Manager to join our Product Development team. You'll facilitate agile processes and ceremonies, remove obstacles for your team, and ensure efficient delivery of high-quality products. Responsibilities include sprint planning, backlog refinement, running daily standups, tracking and reporting on team progress, and fostering continuous improvement. The ideal candidate has 3+ years of experience as a Scrum Master or Agile Project Manager, Agile certifications (CSM, PSM, etc.), experience with Jira and Confluence, and excellent facilitation and coaching skills. Join us to help teams unleash their potential and build products that millions of users love.",
    job_apply_link: "https://www.atlassian.com/company/careers/detail/d56c31de-1dd4-4a4e-a1d1-be523daf3e6b",
    job_city: "Sydney",
    job_country: "Australia",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 172800,
    job_min_salary: 90000,
    job_max_salary: 125000
  },

  // Healthcare roles
  {
    job_id: "7594864835",
    employer_name: "Mayo Clinic",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/mayo-clinic.svg",
    job_employment_type: "Full-time",
    job_title: "Clinical Research Coordinator",
    job_description: "Mayo Clinic is seeking a Clinical Research Coordinator to join our oncology research team. You'll coordinate and manage clinical trials, ensuring they're conducted according to protocols and regulatory requirements. Responsibilities include patient recruitment and screening, data collection and entry, maintaining study documentation, preparing for audits and inspections, and serving as a liaison between the research team and other departments. The ideal candidate has a bachelor's degree in a scientific or healthcare field, 2+ years of clinical research experience, knowledge of research regulations (GCP, IRB, HIPAA), and excellent organizational and communication skills. Join us to advance medical knowledge and improve patient care through cutting-edge clinical research.",
    job_apply_link: "https://jobs.mayoclinic.org/jobs/clinical-research-coordinator-oncology-149849",
    job_city: "Rochester",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 86400,
    job_min_salary: 60000,
    job_max_salary: 80000
  },
  {
    job_id: "7594864836",
    employer_name: "Cleveland Clinic",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/cleveland-clinic.svg",
    job_employment_type: "Full-time",
    job_title: "Registered Nurse - ICU",
    job_description: "Cleveland Clinic is looking for an experienced Registered Nurse to join our Intensive Care Unit. You'll provide direct patient care to critically ill patients and collaborate with a multidisciplinary team to ensure the best possible outcomes. Responsibilities include patient assessment and monitoring, implementing treatment plans, administering medications, documenting care, and educating patients and families. The ideal candidate has an active RN license, BSN preferred, 2+ years of ICU experience, BLS and ACLS certifications, and excellent critical thinking and communication skills. Join one of the world's leading healthcare organizations and make a meaningful difference in patients' lives during their most vulnerable moments.",
    job_apply_link: "https://jobs.clevelandclinic.org/job/cleveland/registered-nurse-rn-intensive-care-unit/27575/52692341696",
    job_city: "Cleveland",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 172800,
    job_min_salary: 75000,
    job_max_salary: 95000
  },

  // Finance roles
  {
    job_id: "8594864837",
    employer_name: "JPMorgan Chase",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/jpmorgan-chase.svg",
    job_employment_type: "Full-time",
    job_title: "Financial Analyst",
    job_description: "JPMorgan Chase is seeking a Financial Analyst to join our Corporate Finance team. You'll support financial planning and analysis, prepare monthly and quarterly reports, develop financial models, and provide insights to support business decisions. Responsibilities include variance analysis, forecasting, budgeting, performance reporting, and ad-hoc financial analysis. The ideal candidate has a bachelor's degree in Finance, Accounting, or related field, 2-4 years of financial analysis experience, advanced Excel skills, and familiarity with financial systems and databases. Join us to gain exposure to various aspects of a global financial institution while developing your analytical and financial skills.",
    job_apply_link: "https://careers.jpmorgan.com/us/en/jobs/financial-analyst-corporate-finance-new-york-23094719",
    job_city: "New York",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 345600,
    job_min_salary: 85000,
    job_max_salary: 110000
  },

  {
    job_id: "8594864838",
    employer_name: "Goldman Sachs",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/goldman-sachs.svg",
    job_employment_type: "Full-time",
    job_title: "Investment Banking Associate",
    job_description: "Goldman Sachs is seeking an Investment Banking Associate to join our Technology, Media & Telecommunications (TMT) group. You'll support client relationships, perform financial analysis and valuation, prepare client presentations, and assist in executing M&A transactions and capital raises. Responsibilities include financial modeling, company and industry research, due diligence coordination, and document preparation. The ideal candidate has an MBA or equivalent graduate degree, 2+ years of experience in investment banking or related field, strong accounting and finance knowledge, and excellent Microsoft Office skills. Join us to work on high-profile transactions while developing valuable skills in finance, strategy, and client relationship management.",
    job_apply_link: "https://goldmansachs.tal.net/vx/candidate/apply/13245",
    job_city: "San Francisco",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 259200,
    job_min_salary: 150000,
    job_max_salary: 200000
  },

  // Education roles
  {
    job_id: "9594864839",
    employer_name: "Coursera",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/coursera-1.svg",
    job_employment_type: "Full-time",
    job_title: "Curriculum Developer - Data Science",
    job_description: "Coursera is seeking a Curriculum Developer specializing in Data Science to join our Content team. You'll design and develop educational content for our data science courses, ensuring they meet industry standards and provide valuable learning experiences. Responsibilities include creating course outlines, working with instructors and subject matter experts, designing assessments and projects, and ensuring content quality and educational effectiveness. The ideal candidate has a master's degree in Data Science or related field, 3+ years of experience in curriculum development or teaching, knowledge of data science tools and techniques, and excellent communication skills. Join us to help millions of learners worldwide develop in-demand data science skills and advance their careers.",
    job_apply_link: "https://jobs.lever.co/coursera/curriculum-developer-data-science",
    job_city: "Mountain View",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 86400,
    job_min_salary: 90000,
    job_max_salary: 120000
  },
  {
    job_id: "9594864840",
    employer_name: "Khan Academy",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/khan-academy-1.svg",
    job_employment_type: "Full-time",
    job_title: "Math Content Creator",
    job_description: "Khan Academy is looking for a Math Content Creator to join our Content team. You'll develop engaging and effective math content for K-12 students, helping them build strong foundations in mathematics through our free online platform. Responsibilities include creating instructional videos, exercises, articles, and interactive learning activities that explain mathematical concepts clearly and align with educational standards. The ideal candidate has a bachelor's degree in Mathematics or Mathematics Education, experience teaching math or creating educational content, strong communication and presentation skills, and passion for making learning accessible to all students. Join our mission to provide a free, world-class education to anyone, anywhere.",
    job_apply_link: "https://www.khanacademy.org/careers/math-content-creator",
    job_city: "Remote",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 172800,
    job_min_salary: 70000,
    job_max_salary: 100000
  },

  // HR/People roles
  {
    job_id: "10594864841",
    employer_name: "Glassdoor",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/glassdoor-1.svg",
    job_employment_type: "Full-time",
    job_title: "Talent Acquisition Specialist",
    job_description: "Glassdoor is seeking a Talent Acquisition Specialist to join our People team. You'll drive full-cycle recruitment for various departments, helping us build diverse and high-performing teams. Responsibilities include developing sourcing strategies, screening candidates, coordinating interviews, managing the applicant tracking system, and creating a positive candidate experience. The ideal candidate has 3+ years of recruitment experience preferably in the tech industry, experience with ATS and sourcing tools, knowledge of diversity and inclusion best practices, and excellent communication and relationship-building skills. Join us to help connect people with companies and careers they love while building our own exceptional team.",
    job_apply_link: "https://www.glassdoor.com/about/careers/talent-acquisition-specialist",
    job_city: "San Francisco",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 432000,
    job_min_salary: 75000,
    job_max_salary: 95000
  },

  {
    job_id: "10594864842",
    employer_name: "Workday",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/workday-1.svg",
    job_employment_type: "Full-time",
    job_title: "HR Business Partner",
    job_description: "Workday is looking for an HR Business Partner to support our Engineering organization. You'll act as a strategic partner to leadership, providing guidance on organizational design, talent management, and performance management. Responsibilities include developing HR initiatives aligned with business objectives, coaching managers and employees, handling employee relations issues, and collaborating with other HR functions. The ideal candidate has 5+ years of HR experience, preferably as an HRBP in the tech industry, strong knowledge of HR policies and practices, experience with organizational development, and excellent communication skills. Join us to help create an exceptional employee experience while driving business results.",
    job_apply_link: "https://workday.wd5.myworkdayjobs.com/Workday_External_Career_Site/job/USA-CA-Pleasanton/HR-Business-Partner--Engineering_JR-72381",
    job_city: "Pleasanton",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 259200,
    job_min_salary: 110000,
    job_max_salary: 145000
  },
  
  // Entry-level roles
  {
    job_id: "11594864843",
    employer_name: "Accenture",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/accenture-4.svg",
    job_employment_type: "Full-time",
    job_title: "Junior Software Developer",
    job_description: "Accenture is seeking a Junior Software Developer to join our growing Technology team. In this entry-level role, you'll work alongside experienced developers to build and maintain web applications, learn modern development practices, and contribute to client projects. Responsibilities include writing clean, efficient code, participating in code reviews, testing and debugging applications, and collaborating with team members on solution design. The ideal candidate has a strong foundation in programming concepts, eagerness to learn, and a collaborative mindset. Requirements include a bachelor's degree in Computer Science or related field, basic programming skills in languages such as Java, Python, or JavaScript, understanding of web technologies, and strong problem-solving abilities.",
    job_apply_link: "https://www.accenture.com/us-en/careers/jobdetails?id=R00099383_en",
    job_city: "Chicago",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 86400,
    job_min_salary: 65000,
    job_max_salary: 85000
  },
  {
    job_id: "11594864844",
    employer_name: "Deloitte",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/deloitte-1.svg",
    job_employment_type: "Full-time",
    job_title: "Business Analyst - Entry Level",
    job_description: "Deloitte is looking for an Entry-Level Business Analyst to join our Consulting practice. You'll support project teams in gathering and analyzing business requirements, documenting processes, and creating presentations and reports. Responsibilities include collecting and analyzing data, identifying business needs and potential solutions, supporting process improvement initiatives, and assisting with client deliverables. The ideal candidate has strong analytical abilities, attention to detail, and excellent communication skills. Requirements include a bachelor's degree in Business, Finance, Information Systems, or related field, basic understanding of business processes, proficiency with Microsoft Office suite, and strong written and verbal communication skills.",
    job_apply_link: "https://apply.deloitte.com/careers/JobDetail/Business-Analyst-Entry-Level-2025/124766",
    job_city: "New York",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 172800,
    job_min_salary: 60000,
    job_max_salary: 75000
  },
  
  // Internships
  {
    job_id: "12594864845",
    employer_name: "Microsoft",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg",
    job_employment_type: "Internship",
    job_title: "Software Engineering Intern",
    job_description: "Microsoft is seeking Software Engineering Interns to join our teams for a 12-week summer internship. You'll work on real projects that ship to customers, collaborate with experienced engineers, and receive mentorship from industry leaders. Responsibilities include designing and implementing features or improvements, writing high-quality code, participating in code reviews, fixing bugs, and presenting your work to the team. The ideal candidate is pursuing a degree in Computer Science or related field, has strong programming skills, and is passionate about technology. Requirements include current enrollment in a bachelor's or master's program in Computer Science, completion of coursework in data structures and algorithms, programming experience in languages such as C++, Java, or Python, and strong problem-solving abilities.",
    job_apply_link: "https://careers.microsoft.com/students/us/en/job/1547972/Software-Engineering-Intern",
    job_city: "Redmond",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 432000,
    job_min_salary: 8000,
    job_max_salary: 10000
  },
  {
    job_id: "12594864846",
    employer_name: "Google",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/google-g-2015.svg",
    job_employment_type: "Internship",
    job_title: "UX Design Intern",
    job_description: "Google is looking for UX Design Interns to join our UX team for a summer internship. You'll work on real design projects, collaborate with designers, researchers, and engineers, and contribute to Google's user experience. Responsibilities include conducting user research, creating wireframes and prototypes, developing visual design solutions, participating in design reviews, and iterating based on feedback. The ideal candidate is pursuing a degree in Design, HCI, or related field, has a portfolio demonstrating strong design skills, and is passionate about creating user-centered experiences. Requirements include current enrollment in a bachelor's or master's program in Design or related field, a portfolio demonstrating UX design skills, familiarity with design tools like Figma or Sketch, and strong visual and interaction design abilities.",
    job_apply_link: "https://careers.google.com/jobs/results/115532349115066566-ux-design-intern-summer-2025/",
    job_city: "San Francisco",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 259200,
    job_min_salary: 9000,
    job_max_salary: 12000
  },
  
  // Part-time roles
  {
    job_id: "13594864847",
    employer_name: "Starbucks",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/starbucks.svg",
    job_employment_type: "Part-time",
    job_title: "Barista",
    job_description: "Starbucks is seeking passionate and energetic Baristas to join our team. You'll create the Starbucks Experience for customers by providing exceptional service, preparing beverages and food, and maintaining a welcoming environment. Responsibilities include taking customer orders, preparing and serving food and beverages, operating cash registers, maintaining cleanliness, and building relationships with customers. The ideal candidate has a customer-focused attitude, ability to work in a fast-paced environment, and strong communication skills. Requirements include availability to work flexible hours including mornings, evenings, weekends, and holidays, ability to learn and apply beverage recipes, and ability to stand for extended periods and lift up to 50 pounds.",
    job_apply_link: "https://www.starbucks.com/careers/retail-careers/barista/",
    job_city: "Chicago",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 86400,
    job_min_salary: 15,
    job_max_salary: 20
  },
  {
    job_id: "13594864848",
    employer_name: "Target",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/target-7.svg",
    job_employment_type: "Part-time",
    job_title: "Retail Sales Associate",
    job_description: "Target is looking for friendly and energetic Sales Associates to join our team. You'll provide excellent guest service while supporting store operations in a fast-paced environment. Responsibilities include greeting and assisting customers, operating cash registers, processing transactions, restocking merchandise, setting up promotional displays, and maintaining store cleanliness. The ideal candidate has a customer-first mindset, strong communication skills, and the ability to multitask effectively. Requirements include availability to work flexible hours including evenings, weekends, and holidays, ability to lift up to 40 pounds, strong attention to detail, and previous retail or customer service experience preferred but not required.",
    job_apply_link: "https://jobs.target.com/job/atlanta/retail-sales-associate/1118/52956820160",
    job_city: "Atlanta",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 172800,
    job_min_salary: 15,
    job_max_salary: 18
  },
  
  // Contract roles
  {
    job_id: "14594864849",
    employer_name: "Meta",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/meta-1.svg",
    job_employment_type: "Contract",
    job_title: "Content Moderator - 6 Month Contract",
    job_description: "Meta is seeking Content Moderators on a 6-month contract basis to help maintain a safe and supportive environment across our platforms. You'll review reported content against our Community Standards and make accurate decisions about policy violations. Responsibilities include evaluating text, images, and videos for policy violations, applying policies consistently, providing feedback on content moderation processes, and maintaining confidentiality. The ideal candidate has strong attention to detail, good judgment, and resilience when reviewing potentially sensitive content. Requirements include a high school diploma or equivalent, fluency in English (additional languages a plus), strong critical thinking skills, and the ability to maintain focus while reviewing content for extended periods.",
    job_apply_link: "https://www.metacareers.com/jobs/content-moderator-6-month-contract-austin-texas-remote/",
    job_city: "Austin",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 345600,
    job_min_salary: 25,
    job_max_salary: 30
  },

  {
    job_id: "14594864850",
    employer_name: "Apple",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/apple-13.svg",
    job_employment_type: "Contract",
    job_title: "Technical Writer - 12 Month Contract",
    job_description: "Apple is seeking a Technical Writer on a 12-month contract to help create and maintain documentation for our developer tools and APIs. You'll work with engineering teams to understand complex technical concepts and create clear, concise documentation. Responsibilities include writing developer guides, API references, and tutorials, reviewing and editing existing content, creating diagrams and visual aids, and ensuring documentation meets Apple's quality standards. The ideal candidate has experience writing technical documentation, strong writing and editing skills, and the ability to explain complex concepts clearly. Requirements include 3+ years of technical writing experience, preferably for developer audiences, understanding of software development concepts, experience with documentation tools, and excellent communication skills.",
    job_apply_link: "https://jobs.apple.com/en-us/details/technical-writer-12-month-contract-cupertino/200445876",
    job_city: "Cupertino",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 259200,
    job_min_salary: 60,
    job_max_salary: 75
  },
  
  // Remote roles
  {
    job_id: "15594864851",
    employer_name: "GitLab",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/gitlab.svg",
    job_employment_type: "Full-time",
    job_title: "Frontend Engineer - Remote",
    job_description: "GitLab is seeking a Frontend Engineer to join our fully remote team. You'll develop and maintain GitLab's web interface while contributing to our open-source codebase. Responsibilities include implementing new features, improving performance and accessibility, collaborating with designers and backend engineers, participating in code reviews, and troubleshooting issues. The ideal candidate has experience with modern frontend frameworks, a passion for user experience, and the ability to work effectively in a remote environment. Requirements include 3+ years of frontend development experience, proficiency with Vue.js or similar frameworks, experience with modern JavaScript and CSS, and strong written communication skills. GitLab is a 100% remote company, and this position can be based anywhere with a reliable internet connection.",
    job_apply_link: "https://about.gitlab.com/jobs/apply/?gh_jid=6824359002",
    job_city: "Remote",
    job_country: "Worldwide",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 86400,
    job_min_salary: 100000,
    job_max_salary: 150000
  },
  {
    job_id: "15594864852",
    employer_name: "Zapier",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/zapier-1.svg",
    job_employment_type: "Full-time",
    job_title: "Customer Support Specialist - Remote",
    job_description: "Zapier is looking for a Customer Support Specialist to join our fully remote team. You'll provide exceptional support to our customers while being the voice that represents our product and values. Responsibilities include answering customer inquiries via email and chat, troubleshooting technical issues, creating and updating support documentation, collecting customer feedback, and collaborating with product teams to improve the customer experience. The ideal candidate has experience in customer support, strong problem-solving skills, and excellent communication abilities. Requirements include 2+ years of customer support experience preferably in SaaS, strong written communication skills, technical aptitude, and the ability to work effectively in a remote environment with overlap with US business hours.",
    job_apply_link: "https://zapier.com/jobs/customer-support-specialist-remote/",
    job_city: "Remote",
    job_country: "Worldwide",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 172800,
    job_min_salary: 60000,
    job_max_salary: 80000
  },
  
  // Non-profit / Social Impact roles
  {
    job_id: "16594864853",
    employer_name: "UNICEF",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/unicef-4.svg",
    job_employment_type: "Full-time",
    job_title: "Program Manager - Child Protection",
    job_description: "UNICEF is seeking a Program Manager to lead our Child Protection initiatives in vulnerable communities in Kenya. You'll design and implement programs that safeguard children's rights and wellbeing in line with our global strategy. Responsibilities include developing project plans, building partnerships with local organizations and government agencies, monitoring program effectiveness, managing budgets, supervising staff, and ensuring compliance with donor requirements. The ideal candidate has experience in international development, strong program management skills, and a passion for child welfare. Requirements include a master's degree in International Development, Social Work, or related field, 5+ years of relevant experience, knowledge of child protection frameworks, and strong communication and leadership skills.",
    job_apply_link: "https://jobs.unicef.org/en-us/job/program-manager-child-protection-nairobi-kenya/64284",
    job_city: "Nairobi",
    job_country: "Kenya",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 345600,
    job_min_salary: 65000,
    job_max_salary: 85000
  },

  {
    job_id: "14594864850",
    employer_name: "Apple",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/apple-13.svg",
    job_employment_type: "Contract",
    job_title: "Technical Writer - 12 Month Contract",
    job_description: "Apple is seeking a Technical Writer on a 12-month contract to help create and maintain documentation for our developer tools and APIs. You'll work with engineering teams to understand complex technical concepts and create clear, concise documentation. Responsibilities include writing developer guides, API references, and tutorials, reviewing and editing existing content, creating diagrams and visual aids, and ensuring documentation meets Apple's quality standards. The ideal candidate has experience writing technical documentation, strong writing and editing skills, and the ability to explain complex concepts clearly. Requirements include 3+ years of technical writing experience, preferably for developer audiences, understanding of software development concepts, experience with documentation tools, and excellent communication skills.",
    job_apply_link: "https://jobs.apple.com/en-us/details/technical-writer-12-month-contract-cupertino/200445876",
    job_city: "Cupertino",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 259200,
    job_min_salary: 60,
    job_max_salary: 75
  },
  
  // Remote roles
  {
    job_id: "15594864851",
    employer_name: "GitLab",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/gitlab.svg",
    job_employment_type: "Full-time",
    job_title: "Frontend Engineer - Remote",
    job_description: "GitLab is seeking a Frontend Engineer to join our fully remote team. You'll develop and maintain GitLab's web interface while contributing to our open-source codebase. Responsibilities include implementing new features, improving performance and accessibility, collaborating with designers and backend engineers, participating in code reviews, and troubleshooting issues. The ideal candidate has experience with modern frontend frameworks, a passion for user experience, and the ability to work effectively in a remote environment. Requirements include 3+ years of frontend development experience, proficiency with Vue.js or similar frameworks, experience with modern JavaScript and CSS, and strong written communication skills. GitLab is a 100% remote company, and this position can be based anywhere with a reliable internet connection.",
    job_apply_link: "https://about.gitlab.com/jobs/apply/?gh_jid=6824359002",
    job_city: "Remote",
    job_country: "Worldwide",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 86400,
    job_min_salary: 100000,
    job_max_salary: 150000
  },
  {
    job_id: "15594864852",
    employer_name: "Zapier",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/zapier-1.svg",
    job_employment_type: "Full-time",
    job_title: "Customer Support Specialist - Remote",
    job_description: "Zapier is looking for a Customer Support Specialist to join our fully remote team. You'll provide exceptional support to our customers while being the voice that represents our product and values. Responsibilities include answering customer inquiries via email and chat, troubleshooting technical issues, creating and updating support documentation, collecting customer feedback, and collaborating with product teams to improve the customer experience. The ideal candidate has experience in customer support, strong problem-solving skills, and excellent communication abilities. Requirements include 2+ years of customer support experience preferably in SaaS, strong written communication skills, technical aptitude, and the ability to work effectively in a remote environment with overlap with US business hours.",
    job_apply_link: "https://zapier.com/jobs/customer-support-specialist-remote/",
    job_city: "Remote",
    job_country: "Worldwide",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 172800,
    job_min_salary: 60000,
    job_max_salary: 80000
  },
  
  // Non-profit / Social Impact roles
  {
    job_id: "16594864853",
    employer_name: "UNICEF",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/unicef-4.svg",
    job_employment_type: "Full-time",
    job_title: "Program Manager - Child Protection",
    job_description: "UNICEF is seeking a Program Manager to lead our Child Protection initiatives in vulnerable communities in Kenya. You'll design and implement programs that safeguard children's rights and wellbeing in line with our global strategy. Responsibilities include developing project plans, building partnerships with local organizations and government agencies, monitoring program effectiveness, managing budgets, supervising staff, and ensuring compliance with donor requirements. The ideal candidate has experience in international development, strong program management skills, and a passion for child welfare. Requirements include a master's degree in International Development, Social Work, or related field, 5+ years of relevant experience, knowledge of child protection frameworks, and strong communication and leadership skills.",
    job_apply_link: "https://jobs.unicef.org/en-us/job/program-manager-child-protection-nairobi-kenya/64284",
    job_city: "Nairobi",
    job_country: "Kenya",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 345600,
    job_min_salary: 65000,
    job_max_salary: 85000
  },
  {
    job_id: "18594864858",
    employer_name: "Spotify",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/spotify-2.svg",
    job_employment_type: "Full-time",
    job_title: "Music Editor",
    job_description: "Spotify is looking for a Music Editor to join our Content team. You'll curate playlists, discover and feature new artists and songs, and help shape how millions of users experience music on our platform. Responsibilities include creating and maintaining playlists, analyzing music trends and listener data, identifying emerging artists and tracks, collaborating with labels and artists, and contributing to editorial campaigns. The ideal candidate has deep music knowledge across genres, experience in music curation or journalism, strong analytical skills, and excellent written communication. Requirements include 3+ years of experience in music curation, journalism, or related field, understanding of music trends and audience preferences, experience with data analysis tools, and the ability to create compelling written content.",
    job_apply_link: "https://www.lifeatspotify.com/jobs/music-editor-los-angeles",
    job_city: "Los Angeles",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 259200,
    job_min_salary: 75000,
    job_max_salary: 95000
  },
  
  // Executive roles
  {
    job_id: "19594864859",
    employer_name: "Netflix",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/netflix-3.svg",
    job_employment_type: "Full-time",
    job_title: "VP of Content Acquisition",
    job_description: "Netflix is seeking a VP of Content Acquisition to lead our global content strategy and acquisition efforts. You'll shape the future of Netflix's content library and drive key business relationships with content creators worldwide. Responsibilities include developing and executing content acquisition strategies across multiple territories, negotiating high-profile content deals, building relationships with major studios and production companies, and leading a team of content acquisition professionals. The ideal candidate has extensive experience in content acquisition and licensing, strong industry relationships, and excellent leadership skills. Requirements include 15+ years of experience in content acquisition or related field, proven track record of negotiating significant content deals, strong understanding of global content markets, exceptional leadership abilities, and excellent financial acumen.",
    job_apply_link: "https://jobs.netflix.com/jobs/269856625",
    job_city: "Los Angeles",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 86400,
    job_min_salary: 300000,
    job_max_salary: 450000
  },
  {
    job_id: "19594864860",
    employer_name: "Salesforce",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/salesforce-2.svg",
    job_employment_type: "Full-time",
    job_title: "Chief Financial Officer (CFO)",
    job_description: "Salesforce is seeking a Chief Financial Officer (CFO) to lead our global finance organization. You'll oversee all financial operations while providing strategic leadership as a key member of our executive team. Responsibilities include managing accounting, financial planning and analysis, investor relations, tax, treasury, and internal audit functions, driving financial strategy and planning, ensuring compliance with regulations, and communicating financial performance to investors and stakeholders. The ideal candidate has extensive financial leadership experience in the technology sector and a track record of driving business growth. Requirements include 15+ years of progressive finance experience with at least 5 years in a CFO or senior finance leadership role, preferably in a public technology company, strong understanding of SaaS business models and metrics, M&A experience, and excellent communication skills.",
    job_apply_link: "https://careers.salesforce.com/job-detail?jobid=job-79021",
    job_city: "San Francisco",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 172800,
    job_min_salary: 400000,
    job_max_salary: 600000
  },
  // Adding NEW Data Analyst roles
  {
    job_id: "20594864861",
    employer_name: "Netflix",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/netflix-3.svg",
    job_employment_type: "Full-time",
    job_title: "Content Analytics Data Analyst",
    job_description: "Netflix is seeking a Content Analytics Data Analyst to help inform our content decision-making through data insights. You'll analyze viewing patterns, content performance metrics, and audience behavior to optimize our content portfolio and acquisition strategy. Responsibilities include developing dashboards and reports, conducting ad-hoc analyses, partnering with content teams to answer key business questions, and presenting insights to stakeholders. The ideal candidate has strong analytical skills, experience with SQL and data visualization, and the ability to translate complex data into actionable recommendations. Requirements include 3+ years of experience in data analysis, proficiency with SQL and Python, experience with data visualization tools (Tableau/Power BI), and excellent communication skills.",
    job_apply_link: "https://jobs.netflix.com/jobs/235718154",
    job_city: "Los Angeles",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 129600,
    job_min_salary: 110000,
    job_max_salary: 150000
  },
  {
    job_id: "20594864862",
    employer_name: "Salesforce",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/salesforce-2.svg",
    job_employment_type: "Full-time",
    job_title: "Marketing Analytics Manager",
    job_description: "Salesforce is looking for a Marketing Analytics Manager to join our Marketing Analytics team. You'll use data to optimize marketing campaigns, measure performance, and drive strategic decision-making. Responsibilities include building attribution models, analyzing campaign performance, developing forecasting models, designing and analyzing A/B tests, and collaborating with marketing teams to implement data-driven strategies. The ideal candidate has experience in marketing analytics, strong technical skills, and the ability to communicate complex insights to stakeholders. Requirements include 5+ years of experience in analytics or related field, proficiency with SQL, Python or R, experience with marketing analytics tools, knowledge of statistical methods, and excellent presentation skills.",
    job_apply_link: "https://careers.salesforce.com/job-details?jobid=a1k4p00000GnJ0nAAF",
    job_city: "San Francisco",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 172800,
    job_min_salary: 130000,
    job_max_salary: 170000
  },
  {
    job_id: "20594864863",
    employer_name: "JP Morgan Chase",
    employer_logo: "https://cdn.worldvectorlogo.com/logos/jpmorgan-chase.svg",
    job_employment_type: "Full-time",
    job_title: "Financial Data Analyst",
    job_description: "JP Morgan Chase is seeking a Financial Data Analyst to join our Consumer Banking Analytics team. You'll analyze financial data to identify trends, opportunities, and risks to support strategic decision-making. Responsibilities include building and maintaining financial models, preparing regular performance reports, conducting variance analysis, identifying process improvements, and collaborating with business partners to implement insights. The ideal candidate has strong analytical skills, financial knowledge, and attention to detail. Requirements include a bachelor's degree in Finance, Economics, Statistics, or related field, 2-4 years of financial analysis experience, proficiency with SQL and Excel, experience with data visualization tools, and strong communication skills.",
    job_apply_link: "https://careers.jpmorgan.com/us/en/jobs/financial-data-analyst-consumer-banking-3245678",
    job_city: "Chicago",
    job_country: "United States",
    job_posted_at_timestamp: Math.floor(new Date().getTime() / 1000) - 86400,
    job_min_salary: 85000,
    job_max_salary: 110000
  }
];
// Function to filter jobs based on search criteria
export function filterJobs(params: {
  query?: string;
  location?: string;
  experience?: string;
  jobType?: string[];
  datePosted?: string;
  minSalary?: number;
  page?: number;
}): JobListing[] {
  let filteredJobs = [...mockJobListings];
  
  // Filter by query (job title or description)
  if (params.query) {
    const queryLower = params.query.toLowerCase();
    filteredJobs = filteredJobs.filter(
      job => 
        job.job_title.toLowerCase().includes(queryLower) || 
        job.job_description.toLowerCase().includes(queryLower) ||
        job.employer_name.toLowerCase().includes(queryLower)
    );
  }
  
  // Filter by location
  if (params.location) {
    const locationLower = params.location.toLowerCase();
    filteredJobs = filteredJobs.filter(
      job => 
        job.job_city.toLowerCase().includes(locationLower) || 
        job.job_country.toLowerCase().includes(locationLower) ||
        // Check for remote
        (locationLower.includes('remote') && job.job_city.toLowerCase() === 'remote')
    );
  }
  
  // Filter by experience level 
  if (params.experience) {
    const expLower = params.experience.toLowerCase();
    filteredJobs = filteredJobs.filter(job => {
      const title = job.job_title.toLowerCase();
      const description = job.job_description.toLowerCase();
      
      if (expLower.includes('entry') || expLower.includes('junior')) {
        return title.includes('junior') ||
               title.includes('entry') ||
               description.includes('entry') || 
               description.includes('junior') || 
               description.includes('0-2 years') ||
               description.includes('1-3 years') ||
               description.includes('entry-level');
      }
      
      if (expLower.includes('mid')) {
        return title.includes('mid') ||
               description.includes('mid') || 
               description.includes('3-5 years') ||
               description.includes('2-4 years');
      }
      
      if (expLower.includes('senior')) {
        return title.toLowerCase().includes('senior') ||
               title.toLowerCase().includes('sr.') ||
               description.includes('senior') || 
               description.includes('5+ years') ||
               description.includes('7+ years');
      }
      
      return true;
    });
  }
  
  // Filter by job type
  if (params.jobType && params.jobType.length > 0) {
    filteredJobs = filteredJobs.filter(job => {
      return params.jobType!.some(type => {
        const typeLower = type.toLowerCase();
        
        if (typeLower === 'full_time' || typeLower === 'fulltime') {
          return job.job_employment_type.toLowerCase().includes('full');
        }
        
        if (typeLower === 'part_time' || typeLower === 'parttime') {
          return job.job_employment_type.toLowerCase().includes('part');
        }
        
        if (typeLower === 'contract') {
          return job.job_employment_type.toLowerCase().includes('contract');
        }
        
        if (typeLower === 'internship') {
          return job.job_employment_type.toLowerCase().includes('intern');
        }
        
        if (typeLower === 'remote') {
          return job.job_city.toLowerCase() === 'remote';
        }
        
        return false;
      });
    });
  }
  
  // Filter by date posted
  if (params.datePosted) {
    const now = Math.floor(Date.now() / 1000);
    const days = parseInt(params.datePosted);
    
    if (!isNaN(days)) {
      const cutoffTime = now - (days * 86400); // 86400 seconds in a day
      filteredJobs = filteredJobs.filter(job => job.job_posted_at_timestamp >= cutoffTime);
    }
  }
  
  // Filter by minimum salary
  if (params.minSalary) {
    filteredJobs = filteredJobs.filter(job => 
      (job.job_min_salary !== undefined && job.job_min_salary >= params.minSalary!) ||
      (job.job_max_salary !== undefined && job.job_max_salary >= params.minSalary!)
    );
  }
  
  // Sort by date posted (most recent first)
  filteredJobs.sort((a, b) => b.job_posted_at_timestamp - a.job_posted_at_timestamp);
  
  // Implement pagination if needed
  if (params.page && params.page > 1) {
    const pageSize = 10;
    const startIndex = (params.page - 1) * pageSize;
    filteredJobs = filteredJobs.slice(startIndex, startIndex + pageSize);
  }
  
  return filteredJobs;
}