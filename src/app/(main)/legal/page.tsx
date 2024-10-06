import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { siteConfig } from "@/config/site.config";
import Image from "next/image";
const sections = [
  { id: "section1", title: "TERMS AND CONDITIONS" },
  { id: "section2", title: "APPLICATION AND ACCEPTANCE OF THE TERMS OF USE" },
  { id: "section3", title: "PRIVACY NOTICE" },
  {
    id: "section4",
    title: "ACCURACY OF YOUR INFORMATION & COMMUNICATION METHODS",
  },
  {
    id: "section5",
    title: "AGE ELIGIBILITY AND LEGAL CAPACITY",
  },
  {
    id: "section6",
    title: "USERNAME, PASSWORD AND OTHER CREDENTIALS",
  },
  {
    id: "section7",
    title: "INTELLECTUAL AND OTHER PROPRIETARY RIGHTS",
  },
  {
    id: "section8",
    title: "USER SUBMISSIONS",
  },
  {
    id: "section9",
    title: "ENFORCEMENT",
  },
  {
    id: "section10",
    title: "DUE DILIGENCE AND AUDIT RIGHTS",
  },
  {
    id: "section11",
    title: "YOUR CONDUCT AND RESPONSIBLE USE OF OUR SERVICES",
  },
  {
    id: "section12",
    title: "AVAILABILITY OF AND MODIFICATION TO OUR SERVICES AND CONTENT",
  },
  {
    id: "section13",
    title: "PURCHASES/PAYMENTS",
  },
  {
    id: "section14",
    title: "RELEASE CLAIMS/LIABILITIES",
  },
  {
    id: "section15",
    title: "INDEMNITY",
  },
  {
    id: "section16",
    title: "DISCLAIMERS",
  },
  {
    id: "section17",
    title: "LIMITATION OF LIABILITY",
  },
  {
    id: "section18",
    title: "THIRD PARTY SERVICES, HYPER-LINKS AND ADS",
  },
  {
    id: "section19",
    title: "THIRD PARTY AFFILIATE MARKETING",
  },
  {
    id: "section21",
    title: "TERMINATION",
  },
  {
    id: "section22",
    title: "ENTIRE AGREEMENT AND SEVERABILITY",
  },
  {
    id: "section23",
    title: "CHANGES TO THIS AGREEMENT",
  },
  {
    id: "section24",
    title: "DISPUTE RESOLUTION (ARBITRATION CLAUSE AND CLASS ACTION WAIVER)",
  },
  {
    id: "section25",
    title: "NO WAIVER",
  },
  {
    id: "section26",
    title: "COPYRIGHT/TRADEMARK INFORMATION",
  },
  {
    id: "section27",
    title: "CONTACT US.",
  },
];

const page = () => {
  return (
    <div className="leading-10">
      <Breadcrumb className="my-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-primary" href="/legal">
              Terms & Conditions
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="bg-white rounded-xl p-3 ">
        <div className="min-h-60 bg-[url('https://res.cloudinary.com/dougwnqok/image/upload/v1727799631/4d56ce8c38262e55c19c507e6ac71960_kt6zfd.png')] bg-cover bg-no-repeat bg-center"></div>
        <div className="flex items-center">
          <Image src={siteConfig.logo} alt="logo" />
          <p className="ml-3 text-2xl">Legal Centre</p>
        </div>
      </div>
      <div className="grid grid-cols-8 gap-4 bg-white md:px-20 px-5  py-10 text-offBlack rounded-xl mt-3">
        {/* Side Navigation */}
        <aside className="hidden md:block self-start sticky col-span-2 top-56">
          <ul className="space-y-4">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="block  p-2 rounded text-[20px]"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="col-span-8 md:col-span-6">
          <section id="section1" className="h-auto">
            <h2 className="text-3xl mt-10 font-bold mb-4">
              TERMS AND CONDITIONS
            </h2>
            <p>
              IMPORTANT!: 9TH MARKET PLACE IS THE TRADING NAME OF 9TH TECH
              LIMITED, WHICH IS THE OPERATOR OF ALL THAT SPECIALIZED E-COMMERCE
              PLATFORM CONSISTING OF A WEBSITE AND MOBILE APPLICATION (9TH
              MARKET PLACE) TOGETHER WITH SUPPORTING IT LOGISTICS AND PAYMENT
              INFRASTRUCTURE FOR THE PRODUCTS AND SERVICES (PRODUCTS) SHOWCASED
              THEREIN IN NIGERIA. THESE TERMS OF USE GOVERN YOUR USE OF THIS
              WEB-SITE, WHICH IS PROVIDED BY 9TH MARKET PLACE, BY ACCESSING OR
              USING THIS SITE, YOU ACCEPT AND AGREE TO BE LEGALLY BOUND BY AND
              COMPLY WITH THESE TERMS OF USE. SPCIFICALY, FURTHER TAKE NOTICE
              THAT WITH LIMITED EXCEPTIONS, ALL AND ANY DISPUTE THAT MAY ARISE
              BETWEEN YOU AND US REGARDING THE USE OF THIS SITE/THIS AGREEMENT
              ARE SUBJECT TO BINDING ARBITRATION ON AN INDIVIDUAL BASIS RATHER
              THAN ANY COURT ACTIONS, INCLUDING CLASS ACTION LAWSUITS. IF YOU DO
              NOT AGREE TO THE INSTANT TERMS OF THIS AGREEMENT, DO NOT ACCESS OR
              USE AND OR CONTINUE TO ACCESS AND USE THIS WEBSITE, OR YOU MAY
              TERMINATE THE USE OF THIS WEBSITE IMMEDIATELY.
            </p>
          </section>
          <section id="section2" className="h-auto">
            <h2 className="text-3xl mt-10 font-bold mb-4 mt-10">
              APPLICATION AND ACCEPTANCE OF THE TERMS OF USE
            </h2>
            <p>
              These Terms of Use, any additional guidelines, terms, procedures
              or rules that may apply to a specific feature of our Services that
              are owned or operated by 9TH MARKET PLACE or its affiliates
              (&quot;we&quot;, &quot;us&quot;, &quot;our&quot; or &quot;9TH
              MARKET PLACE&quot;), are a contract in electronic form between you
              (&quot;you,&quot; &quot;your,&quot; and &quot;yourself&quot;) and
              9TH MARKET PLACE (the &quot;Agreement&quot;). This Agreement sets
              forth the legally binding terms governing your access to and use
              of our Services. This Agreement applies to 9TH MARKET PLACE and
              its affiliates only and does not cover other companies, including
              third parties that may advertise or sponsor content, products or
              services on our website or any third-party platforms (such as
              social media platforms or app stores) or other channels that you
              may use to access our website or any Content. Our website and
              Content are for general information, discussion and commercial
              purposes only. The term &quot;Content&quot; includes, without
              limitation, information, data, text, photographs, videos, audio
              clips, written posts, articles, comments, software, scripts,
              graphics and interactive features generated, provided, or
              otherwise made available through or in connection with our
              Services. We make no representations or guarantees about any
              aspect of our Services and Content and do not endorse any opinions
              expressed by any users. OUR SERVICES AND ALL CONTENT ARE PUBLISHED
              &quot;AS IS&quot; AND YOUR USE OR RELIANCE ON OUR SERVICES OR ANY
              CONTENT IS AT YOUR OWN RISK. WE HAVE NO LIABILITY TO YOU FOR THE
              CONSEQUENCES OF USING OR RELYING ON OUR SERVICES OR ANY CONTENT.
              TAKE FURTHER NOTE THAT &apos;MCDONALD&apos; SHALL NOT IN ANYWAY BE
              LIABLE FOR ANY LOSSES, CLAIMS AND OR LIABILITIES INCURRED FROM
              YOUR USE OF THIS SITE, YOUR PATRONAGE OF ANY THIRD PARTY SERVICES,
              GOODS, PRODUCTS AND OR MERCHANDISE DISPLAYED ON THIS SITE. ALL
              TRANSACTIONS UNDERTAKEN ON THIS SITE IS UNDERSTOOD TO BE AT THE
              SOLE DISCRETION AND RISK OF THE USER AND OR THE CONTRACTING
              PARTIES.
            </p>
          </section>
          <section id="section3" className="h-auto">
            <h2 className="text-3xl mt-10 font-bold mb-4 mt-10">
              {" "}
              PRIVACY NOTICE
            </h2>
            <p>
              In connection with your access to or use of our website, we may
              obtain information from or about you. We will use your information
              in accordance with this Agreement and within the express
              provisions of the Governing extant Laws in Nigeria.
            </p>
          </section>
          <section id="section4" className="h-auto">
            <h2 className="text-3xl mt-10 font-bold mb-4 mt-10">
              {" "}
              ACCURACY OF YOUR INFORMATION & COMMUNICATION METHODS
            </h2>
            <p>
              The information you submit to us through our Services, including
              as part of your account creation, registration or membership, must
              be truthful, accurate and current. You are responsible for
              maintaining the accuracy of such information. If we believe that
              your information is not truthful, accurate or current, we have the
              right to terminate, suspend or refuse you access to our Services.
              We may send you information relating to your use of our Services
              (e.g., statutory registration status, payment authorizations,
              invoices, changes in password or payment method, confirmation
              messages, notices) in electronic form only, for example via emails
              to the email address provided during registration, if applicable.
              You agree that any notices, agreements, disclosures, or other
              communications that we send to you electronically will satisfy any
              legal communication requirements, including that such
              communications be in writing.
            </p>
          </section>
          <section id="section5" className="h-auto">
            <h2 className="text-3xl mt-10 font-bold mb-4 mt-10">
              AGE ELIGIBILITY AND LEGAL CAPACITY
            </h2>
            <p>
              Our Services are not intended for access or use by children,
              especially those under the age of 18. If you are under the age of
              18, you may not access or use our website or provide information
              to us. By accessing or using our website, you represent that you
              have full legal capacity to enter into this Agreement and to
              fulfill your obligations set out in this Agreement. If you are not
              of an age old enough to enter into contracts in your state and or
              country (i.e., a minor), you need to review this Agreement with
              your parent or guardian before using our website; if your parent
              or guardian do not agree with the Agreement as applied to you,
              then you are not authorized to access or use our website.
            </p>
          </section>
          <section id="section6" className="h-auto">
            <h2 className="text-3xl mt-10 font-bold mb-4 mt-10">
              USERNAME, PASSWORD AND OTHER CREDENTIALS
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              username, password, financial details and other credentials (your
              &quot;Credentials&quot;) that you may be asked to create to access
              our Services or certain features or portions thereof. We are not
              responsible for any misuse of your Credentials by any third party,
              whether authorized by you or not. You agree to immediately notify
              9TH MARKET PLACE of any actual or suspected unauthorized use of
              your Credentials or any other breach of security. We are not
              responsible or liable for any loss or damage resulting from
              unauthorized use of your Credentials or for your failure to follow
              the requirements set out in this Agreement.
            </p>
          </section>
          <section id="section7" className="h-auto">
            <h2 className="text-3xl mt-10 font-bold mb-4 mt-10">
              INTELLECTUAL AND OTHER PROPRIETARY RIGHTS
            </h2>
            <p>
              Your access and use of our website and Content is for personal and
              commercial purposes only. The rights granted to you in this
              Agreement are subject to the following restrictions:
              <ul className="ml-6 list-disc">
                <li>
                  Our Services include Content that is derived in whole or in
                  part from content or materials supplied and owned by 9TH
                  MARKET PLACE, 9TH MARKET PLACE&apos;s licensors or third
                  parties. As between 9TH MARKET PLACE and you, 9TH MARKET PLACE
                  owns all right, title and interest in and to the copyrights,
                  trademarks, service marks, trade names, patents and all other
                  intellectual and proprietary rights throughout the world
                  associated with our Services and Content.
                </li>
                <li>
                  You acknowledge 9TH MARKET PLACE&apos;s valid intellectual and
                  proprietary property rights in our Services and Content and
                  that your use of our Services is limited to accessing, viewing
                  and downloading of our Services and Content, as authorized by
                  9TH MARKET PLACE. Nothing in this Agreement shall be deemed to
                  convey to you any right, title or interest into such
                  intellectual and proprietary property rights or to our website
                  or Content, or to any portion thereof, except for the limited
                  rights expressly granted herein.
                </li>
                <li>
                  You may not either directly or through the use of any
                  computer, tablet, phone or other device (each a &quot;
                  Device&quot; ) or other means (including the use of a browser,
                  software, program or code), remove, alter, interfere with or
                  circumvent;
                </li>
              </ul>
              any copyright, trademark, or other proprietary notices marked on
              our website or Content, or any digital rights management
              mechanism, device, or other content protection or access control
              measure associated with our Services or Content. You may not
              modify, make derivative works of, disassemble, reverse compile or
              reverse engineer any part of our website (including any code used
              in any software) or Content.
              <ul className="ml-6 list-disc">
                <li>
                  You may not either directly or through the use of a Device or
                  other means copy, download, stream, reproduce, duplicate,
                  archive, distribute, upload, publish, modify, translate,
                  broadcast, perform, display, sell, transmit or retransmit our
                  website or Content unless expressly permitted by 9TH MARKET
                  PLACE in writing. You may not incorporate our website or
                  Content into, or stream or retransmit our website or Content
                  via, any hardware or software application or make our website
                  or any Content available via frames or in-line links, and you
                  may not otherwise surround or obfuscate our website or Content
                  with any third-party content, materials or branding. You may
                  also not use any software robots, spider, crawlers, or other
                  data gathering or extraction tools, whether automated or
                  manual, to access, acquire, copy, monitor, scrape or aggregate
                  our Services, Content or any portion thereof. You may not
                  knowingly or intentionally take any action that may impose an
                  unreasonable burden or load on our Services or its servers and
                  infrastructures.
                </li>
                <li>
                  You may not build a business, in whole or in part, resell,
                  redistribute, re-circulate or make any other commercial use
                  of, or create derivative works or materials utilizing any
                  portion of our website (including any code used in any
                  software) or Content, whether or not for profit.
                </li>
                <li>
                  To the extent we make our website or Content available to you
                  via a widget, embedded player or other technology that allows
                  you to embed or stream Content on or to another online
                  service, you may not modify, enhance, remove, interfere with,
                  or otherwise alter in any way any portion of such technology,
                  any digital rights management mechanism, device, or other
                  content protection or access control measure associated with
                  Content.
                </li>
                <li>
                  You are prohibited from disabling, modifying, interfering with
                  or otherwise circumventing any technology to view our website
                  or Content without:
                </li>
              </ul>
              displaying visibly both Content and all surrounding elements and
              having full access to all functionality permitting viewing of
              Content, including, without limitation, all video quality and
              display functionality, and interactive or click-through
              functionality. Any future release, update, or other addition to
              functionality of our website or Content shall be subject to this
              Agreement. All copyright and other proprietary notices on any
              Newspaper Services content or materials must be retained on all
              copies thereof. Modification or use of our website (including any
              content or materials published thereon) for any purpose not
              permitted by this Agreement is prohibited and may be a violation
              of the copyrights and/or trademarks protected by law and this
              Agreement.If you provide 9TH MARKET PLACE any feedback or
              suggestions for improving or regarding your use of our Services
              (&quot; Feedback&quot; ), you hereby assign to 9TH MARKET PLACE
              all rights in the Feedback and agree that 9TH MARKET PLACE shall
              have the right to use such Feedback and related information in any
              manner it deems appropriate. 9TH MARKET PLACE will treat any
              Feedback you provide to 9TH MARKET PLACE as non-confidential and
              non-proprietary. You agree that you will not submit to 9TH MARKET
              PLACE any information or ideas that you consider to be
              confidential or proprietary.
            </p>
          </section>
          <section id="section8" className="h-auto">
            <h2 className="text-3xl font-bold mb-4 mt-10">USER SUBMISSIONS</h2>
            <ul>
              <li>
                Unsolicited Submissions You agree that we may use
                information/User Content you provide us through emails, Q&A,
                blogs, forums, polls, or through any other user generated
                submission, and may use your name and any stories you provide us
                in articles or other features published on our Services or in
                our publications, advertising or sponsored content. If you
                provide us with personal anecdotes, they may be attributed to
                you. 9TH MARKET PLACE can edit, rewrite, use, and reuse the User
                Content, including your name, likeness, photograph, and
                biographical information you provide, with or without
                attribution, including publication in our website or our
                publications, advertising or sponsored content.{" "}
              </li>
              <li>
                Invited Submissions From time to time, our Services may
                expressly request submissions of concepts, stories, or other
                potential content from you (&quot; Invited Submissions&quot; ).
                Please carefully read any specific rules or other terms and
                conditions that appear in connection with such Invited
                Submissions as such terms and conditions will govern the
                submissions and may affect your legal rights. If no such
                additional terms govern those submissions, then this Agreement
                will apply in full to any Invited Submissions you make,IN ANY
                EVENT, ANY MATERIAL YOU SEND TO US WILL NOT BE TREATED AS
                CONFIDENTIAL.Regardless of any industry custom or practice, we
                will not pay you for the use of any content that you submit to
                or through our Services.
              </li>
            </ul>
          </section>
          <section id="section9" className="h-auto">
            <h2 className="text-3xl font-bold mb-4 mt-10">ENFORCEMENT</h2>
            <p>
              If we become aware of a user&apos;s violation of this Agreement,
              including the rights of any third party, we may take certain
              remedial steps, including refusing access to our Services to any
              person or entity and change eligibility requirements at any time.
              If we become aware that any of our users has repeatedly infringed
              the proprietary rights of any third party, we may take steps to
              terminate that user&apos;s access to our website. We reserve the
              right but have no obligation to review any User Content,
              investigate, and/or take appropriate action against you in our
              sole discretion. Such acts may include removing or modifying your
              User Content, terminating your access to our website (including
              any user account, registration or membership), legal action and/or
              reporting you to law enforcement authorities. If 9TH MARKET PLACE
              elects to modify User Content, 9TH MARKET PLACE nonetheless
              assumes no responsibility for the User Content. 9TH MARKET PLACE
              may seek to gather information from the user who is suspected of
              violating this Agreement and from any other user. 9TH MARKET PLACE
              may suspend any users whose conduct or postings are under
              investigation and may remove such material from its servers as it
              deems appropriate and without notice. If 9TH MARKET PLACE
              believes, in its sole discretion, that a violation of this
              Agreement has occurred, it may edit or modify any submission,
              posting or emails, remove the material and or product permanently,
              cancel postings, warn users, suspend users and passwords,
              terminate accounts, or take other corrective action it deems
              appropriate. 9TH MARKET PLACE may cooperate with law enforcement
              authorities or court order requesting or directing 9TH MARKET
              PLACE to disclose the identity of anyone posting any emails, or
              publishing or otherwise making available any materials that are
              believed to violate this Agreement.BY ACCEPTING THIS AGREEMENT,
              YOU WAIVE AND HOLD HARMLESS 9TH MARKET PLACE (AND ITS AFFILIATES
              AND ITS AND THEIR OFFICERS, DIRECTORS, EMPLOYEES, CONTRACTORS, AND
              AGENTS) FROM ANY CLAIMS RESULTING FROM ANY ACTION TAKEN BY 9TH
              MARKET PLACE (AND ITS AFFILIATES AND ITS AND THEIR OFFICERS,
              DIRECTORS, EMPLOYEES, CONTRACTORS, AND AGENTS) DURING OR AS A
              RESULT OF ITS INVESTIGATIONS AND/OR FROM ANY ACTIONS TAKEN AS A
              CONSEQUNCE OF INVESTIGATIONS BY EITHER 9TH MARKET PLACE OR LAW
              ENFORCEMENT AUTHORITIES WITHIN AND OR OUTSIDE NIGERIA.
            </p>
          </section>
          <section id="section10" className="h-auto">
            <h2 className="text-3xl font-bold mb-4">
              DUE DILIGENCE AND AUDIT RIGHTS
            </h2>
            <p>
              9TH MARKET PLACE operates an anti-fraud, anti-terrorism financing
              and anti-money laundering compliance program and reserves the
              right to perform due diligence checks on all users of the 9th
              market place. By using this Site, You agree to provide to us all
              such information documentation and access to your business
              premises as we may require:
            </p>
            <ul className="list-disc ml-8">
              <li>
                in order to verify your compliance, adherence to and performance
                of your obligations under these terms and conditions;
              </li>
              <li>
                in order to verify your compliance, adherence to and performance
                of any statutory obligations under extant laws;
              </li>
              <li>
                for the purpose of disclosures pursuant to a valid order by a
                court or other governmental body; or
              </li>
              <li>as otherwise required by law or applicable regulation.</li>
            </ul>
          </section>
          <section id="section11" className="h-auto">
            <h2 className="text-3xl font-bold mb-4 mt-10">
              YOUR CONDUCT AND RESPONSIBLE USE OF OUR SERVICES
            </h2>
            <p>
              All users of this Site are required to act responsibly when using
              our Services. The following rules are a condition of your access
              to or use of our Services and Content:
              <ul className="ml-6 list-disc">
                <li>
                  No Criminal or Unlawful Conduct. You may only use our Services
                  and Content (including any information contained therein) for
                  lawful purposes, in accordance with this Agreement, applicable
                  laws and regulations, and obligations or restrictions imposed
                  by any third party. You may not encourage conduct that would
                  constitute a criminal offense or give rise to civil liability.
                  Furthermore this Site may not be used for any act involving
                  and or connected with money laundering or the utilization of
                  proceeds of crime in ant part of the World.
                </li>
                <li>
                  Your Materials must be Lawful and Appropriate. You may not
                  store, upload, post, transmit or otherwise distribute or
                  facilitate the distribution of any unlawful, harmful,
                  threatening, abusive, harassing, libelous, defamatory,
                  obscene, pornographic, profane, indecent, invasive of another
                  person&apos;s privacy or otherwise inappropriate User Content
                  or other material or information of any kind, including,
                  without limitation, any images or other material of a sexual
                  nature, harmful to minors in any way, or that harasses,
                  degrades, intimidates or is hateful toward an individual or
                  group of individuals on the basis of religion, gender, sexual
                  orientation, race, ethnicity, age, or disability. You
                  recognize that storing, distributing or transmitting unlawful
                  User Content, material or information could expose you to
                  criminal and/or civil liability.
                </li>
                <li>
                  Content Posted by You must be Yours. You may not store,
                  upload, post, transmit or otherwise distribute or facilitate
                  the distribution of User Content, material or information that
                  is fraudulent or infringes the rights of any third party,
                  including without limitation, patent, trademark, copyright,
                  right of publicity or other proprietary rights. You agree that
                  if a third party claims that User Content, material or
                  information you have posted on or contributed to our Services
                  is unlawful, you will bear the burden of establishing that it
                  is lawful. You understand and agree that all User Content,
                  material or information publicly posted or privately
                  transmitted on or through our website are the sole
                  responsibility of the sender, not 9TH MARKET PLACE, and that
                  you are responsible for all User Content, material or
                  information you access, upload, publicly post or otherwise
                  transmit to or through our website. If we become aware that
                  any of our users has infringed the proprietary rights of any
                  third party, we may take steps to terminate that user&apos;s
                  access to our website.
                </li>

                <li>
                  No Collection of Personal Information from Others. You may
                  not, through manual or automated means, collect, harvest,
                  gather, assemble or store personal information about other
                  users of our Services (including their email addresses or
                  other contact information) without their explicit consent. You
                  may not use any such information to transmit or facilitate
                  transmission of unauthorized or unsolicited advertising, junk
                  or bulk email, chain letters, or any other form of
                  unauthorized solicitation. You agree not to send, create, or
                  reply to so called mail bombs (i.e., emailing copies of a
                  single message to many users, or sending large or multiple
                  files or messages to a single user with malicious intent) or
                  engage in spamming (i.e., unsolicited emailing for business or
                  other purposes) or undertake any other activity which may
                  adversely affect the operation or enjoyment of our Services by
                  any other user or third party, including placing malware on
                  our Services.
                </li>
                <li>
                  No Bullying, Impersonation or Interference. You may not use
                  our Services to threaten, abuse, harass, and or invade the
                  privacy of any other user or third party. You may not
                  impersonate any person or entity or falsely state or otherwise
                  misrepresent your professional or other affiliation with 9TH
                  MARKET PLACE or with any other person or entity. You may not
                  restrict, inhibit or interfere with any other user or third
                  party from using or enjoying our Services.
                </li>
                <li>
                  No System Abuse. You may not upload, post or otherwise
                  distribute or facilitate the distribution of a software virus
                  or any other computer code that is designed or intended to
                  disrupt, damage, or limit the functioning of our website, any
                  other online services, or to obtain unauthorized access to our
                  website or Content or any data or other information of any
                  third party. You may not interfere with, disrupt, or create an
                  undue burden on servers or networks connected to our Services.
                </li>
                <li>
                  No Violations of Security Systems. You are prohibited from
                  using our Services to compromise the security or tamper with,
                  or gain unauthorized access to, our website, Content, online
                  accounts or any other computer systems, resources or networks.
                  The use or distribution of tools designed for compromising
                  security (e.g., password guessing programs, cracking tools,
                  malware, or network probing tools) is strictly prohibited. If
                  you become involved in any violation of systems security, 9TH
                  MARKET PLACE reserves the right to release your details to
                  relevant third parties, law enforcement and/or governmental
                  authorities in order to assist them in resolving security
                  incidents. We may require, at any time, proof that you are
                  following these rules.{" "}
                </li>
              </ul>
              We reserve the right to take, or refrain from taking, any and all
              steps available to us, including suspending or terminating your
              access to our Services or seeking other legal or equitable
              remedies, once we become aware of any violation of this Agreement.
            </p>
          </section>
          <section id="section12" className="h-auto">
            <h2 className="text-3xl font-bold mb-4 mt-10">
              AVAILABILITY OF AND MODIFICATION TO OUR SERVICES AND CONTENT
            </h2>
            <p>
              We do not guarantee that our Services or any Content will be made
              available through our Services. We may change, modify, edit,
              suspend, discontinue or otherwise manipulate our Services, Content
              or any part, feature or service of our Services at any time with
              or without notice to you. You agree that 9TH MARKET PLACE will not
              be liable to you or to any third party for any modification,
              suspension, or discontinuance of our Services, Content or any part
              thereof.
            </p>
          </section>
          <section id="section13" className="h-auto">
            <h2 className="text-3xl font-bold mb-4 mt-10">
              PURCHASES/PAYMENTS
            </h2>
            <ul className="list-disc ml-6">
              <li>
                We may make certain products, features and services available
                for purchase or download (&quot;Purchases&quot;) on or through
                our Services. You must be 18 years or older to make a Purchase
                (including of any Subscription Product, Goods, Services and or
                Merchandise). You agree to pay any applicable fees for any
                Purchases you make, including, without limitation, any
                applicable sales, uses or similar taxes or charges. Certain
                products, fee-based services or features that you purchase,
                access or download via our Services may be subject to additional
                terms and conditions presented to you at the time of purchase,
                access or download.
              </li>
              <li>
                You must make payments due under these general terms and
                conditions in accordance with the Payments Information and
                Guidelines on the 9TH Market Place.
              </li>
            </ul>
          </section>
          <section id="section14" className="h-auto">
            <h2 className="text-3xl font-bold mb-4 mt-10">
              RELEASE CLAIMS/LIABILITIES
            </h2>
            <p>
              if a dispute arises between you and with one or more users of our
              Services (including merchants), you release 9TH MARKET PLACE (and
              its affiliates and its and their officers, directors, employees,
              contractors and agents) from any and all claims, demands,
              liabilities, costs, or expenses and damages (actual and
              consequential of every kind and nature, known and unknown, arising
              out of or in any way connected with such disputes). In entering
              into this release, you expressly waive any protections (whether
              statutory or otherwise) to the extent permitted by applicable law
              that would otherwise limit the coverage of this release to include
              only those claims which you may know or suspect to exist in your
              favor at the time of agreeing to this release
            </p>
          </section>

          <section id="section15" className="h-auto">
            <h2 className="text-3xl font-bold mb-4 mt-10">INDEMNITY</h2>
            <p>
              You agree, without any legal limitations, to indemnify and hold
              9TH MARKET PLACE (and its affiliates and its and their officers,
              directors, employees, contractors, and agents) harmless, including
              for costs and reasonable attorneys&apos; fees, from any claim or
              demand made by any third party due to or arising out of (a) your
              use of our Services or Content, (b) your User Content, (c) your
              violation of this Agreement; (d) your dealings/transactions with
              any user of this site or (e) your violation of applicable laws or
              regulations.TAKE NOTICE THAT 9TH MARKET PLACE reserves the right,
              at your expense, to assume the exclusive defense and control of
              any matter for which you are required to indemnify us and you
              agree to cooperate with our defense of these claims. You agree not
              to settle any matter without the prior written consent of 9TH
              MARKET PLACE. 9TH MARKET PLACE will use reasonable efforts to
              notify you of any such claim, action or proceeding upon becoming
              aware of it. You hereby indemnify 9TH MARKET PLACE and undertake
              to keep us indemnified against any VAT liability or other tax
              liability that we may incur in relation to any sale supply or
              purchase made through 9TH Market Place where that liability arises
              out of your failure to pay withhold declare or register to pay any
              VAT or other tax properly due in any jurisdiction.
            </p>
          </section>

          <section id="section16" className="h-auto">
            <h2 className="text-3xl font-bold mb-4">DISCLAIMERS</h2>

            <p>
              {" "}
              OUR SERVICES ARE PROVIDED &quot;AS-IS&quot; AND &quot;AS
              AVAILABLE&quot; AND WE (AND OUR SERVICE PROVIDERS) EXPRESSLY
              DISCLAIM ANY WARRANTIES AND CONDITIONS OF ANY KIND, WHETHER
              EXPRESS OR IMPLIED, INCLUDING THE WARRANTIES OR CONDITIONS OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, QUIET
              ENJOYMENT, ACCURACY, OR NON-INFRINGEMENT.
            </p>
            <p>
              {" "}
              WE (AND OUR SERVICE PROVIDERS) MAKE NO WARRANTY THAT OUR SERVICES
              AND OR GOODS, PRODUCTS AND MERCHANDISE PURCHASED THROUGH THIS
              SITE:
            </p>

            <ul className="list-disc ml-6">
              <li>WILL MEET YOUR REQUIREMENTS;</li>
              <li>WILL MEET YOUR NEEDS;</li>
              <li>WILL MEET YOUR SPECIFICATIONS;</li>
              <li>
                WILL BE AVAILABLE ON AN UNINTERRUPTED, TIMELY, SECURE, OR
                ERROR-FREE BASIS; OR
              </li>
              <li>
                WILL BE ACCURATE, RELIABLE, FREE OF VIRUSES OR OTHER HARMFUL
                CODE, COMPLETE, LEGAL, OR SAFE.
              </li>
            </ul>
            <p>
              DUE TO THE INHERENT NATURE OF THE INTERNET, WE CANNOT GUARANTEE
              THAT INFORMATION, DURING TRANSMISSION THROUGH THE INTERNET OR
              WHILE STORED ON OUR SYSTEMS OR OTHERWISE IN OUR CARE, WILL BE
              ABSOLUTELY SAFE FROM INTRUSION BY OTHERS. 9TH MARKET PLACE ASSUMES
              NO LIABILITY FOR ANY ERROR, OMISSION, INTERRUPTION, DELETION,
              DEFECT, DELAY IN OPERATION OR TRANSMISSION, HARDWARE OR NETWORK
              FAILURE, THEFT OR DESTRUCTION OR UNAUTHORIZED ACCESS TO, OR
              ALTERATION OF, ANY USER CONTENT.
            </p>
            <p>
              YOU UNDERSTAND THAT IF YOU DOWNLOAD ANY MATERIAL, YOU DO SO AT
              YOUR SOLE RISK. 9TH MARKET PLACE DOES NOT WARRANT OR MAKE ANY
              REPRESENTATIONS REGARDING THE USE OR THE RESULTS OF THE USE OF THE
              MATERIAL, INFORMATION, SOFTWARE, FACILITIES, SERVICES OR OTHER
              CONTENT ON OUR WEBSITE OR ANY ONLINE SERVICES LINKED TO OUR
              WEBSITE IN TERMS OF THEIR CORRECTNESS, ACCURACY, RELIABILITY, OR
              OTHERWISE.
            </p>
            <p>
              UNDER NO CIRCUMSTANCES SHALL 9TH MARKET PLACE BE RESPONSIBLE FOR
              ANY LOSS OR DAMAGE, INCLUDING PERSONAL INJURY OR DEATH, RESULTING
              FROM USE OF OUR SERVICES, ANY CONTENT POSTED ON OR THROUGH OUR
              SERVICES, OR CONDUCT OF ANY USERS OF OUR SERVICES, WHETHER ONLINE
              OR OFFLINE. YOU USE OUR SERVICES AT YOUR OWN RISK.
            </p>
            <p>
              SOME AREAS OF OUR SERVICES OFFER ADVICE FROM A VARIETY OF
              PROVIDERS AND OR USERS, WHO MAY BE AFFILIATED WITH 9TH MARKET
              PLACE OR MEMBERS OF THE USER COMMUNITY; SUCH ADVICE SHALL NOT BE
              TREATED AS A WARRANTY OF ITS EFFICACY FROM 9TH MARKET PLACE TO THE
              EXTENT THAT 9TH MARKET PLACE SHALL NOT BE LIABLE FOR ANY DAMAGES,
              CLAIMS, INJURY AND OR LIABILITIES ARISING FROM AND OR ATTRIBUTABLE
              TO SUCH ADVICE.
            </p>
            <p>
              9TH MARKET PLACE CANNOT GUARANTEE AND DOES NOT PROMISE ANY
              SPECIFIC RESULTS FROM USE OF OUR SERVICES.
            </p>
          </section>

          <section id="section17" className="h-auto">
            <h2 className="text-3xl font-bold mb-4 mt-10">
              LIMITATION OF LIABILITY
            </h2>
            <p>
              IN NO EVENT SHALL WE (AND OUR AFFILIATES, OUR OFFICERS, DIRECTORS,
              EMPLOYEES, CONTRACTORS AND AGENTS) OR OUR SERVICE PROVIDERS BE
              LIABLE TO YOU OR ANY THIRD PARTY UNDER CONTRACT, IN TORT, STRICT
              LIABILITY, NEGLIGENCE OR ANY OTHER LEGAL OR EQUITABLE THEORY, FOR
              ANY LOSS INJURY, CLAIM OR DAMAGES (INCLUDING, WITHOUT LIMITATION,
              DIRECT, INDIRECT, PUNITIVE, ACTUAL, CONSEQUENTIAL, INCIDENTAL,
              SPECIAL, EXEMPLARY, OR OTHERWISE) LOST PROFIT, LOST FUNDS, DATA
              LOSS, COST OF PROCUREMENT OF SUBSTITUTE GOODS ARISING FROM OR
              RELATING TO THIS AGREEMENT OR YOUR USE OF, OR INABILITY TO USE,
              OUR SERVICES INCLUDING FOR ANY BUGS, VIRUSES, TROJAN HORSES, OR
              THE LIKE (REGARDLESS OF THE SOURCE OF ORIGINATION), EVEN IF WE
              HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            <p>
              {" "}
              NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR
              LIABILITY TO YOU FOR ANY DAMAGES ARISING FROM OR RELATED TO THIS
              AGREEMENT (FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF
              THE ACTION), WILL AT ALL TIMES BE LIMITED TO THE GREATER OF;
            </p>

            <ul className="list-disc ml-6">
              <li>FIFTY THOUSAND NAIARA (N50,000) OR</li>
              <li>
                AMOUNTS YOU&apos;VE PAID 9TH MARKET PLACE IN THE PRIOR 12 MONTHS
                (IF ANY).
              </li>
            </ul>

            <p>
              THE EXISTENCE OF MORE THAN ONE CLAIM WILL NOT ENLARGE THIS LIMIT.
              YOU AGREE THAT OUR SERVICE PROVIDERS WILL HAVE NO LIABILITY OF ANY
              KIND ARISING FROM OR RELATING TO THIS AGREEMENT.
            </p>
            <p>
              SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OR EXCLUSION OF
              LIABILITY FOR INCIDENTAL OF CONSEQUENTIAL DAMAGES, SO IN THOSE
              STATES OUR LIABILITY IS LIMITED TO THE EXTENT PERMITTED BY LAW.
            </p>
          </section>

          <section id="section18" className="h-auto">
            <h2 className="text-3xl font-bold mb-4 mt-10">
              THIRD PARTY SERVICES, HYPER-LINKS AND ADS
            </h2>
            <p>
              Our Services might contain links to third-party websites, apps or
              other services (e.g., social media platforms), and advertisements
              for third parties (collectively, &quot;Third-Party Services &
              Ads&quot;). Such Third-Party Services and Ads are not under the
              control of 9TH MARKET PLACE and 9TH MARKET PLACE is not
              responsible for any Third-Party Services and Ads.
            </p>
            <p>
              9TH MARKET PLACE provides these Third-Party Services and Ads only
              as a convenience and does not review, approve, monitor, endorse,
              warrant, or make any representations with respect to Third-Party
              Services and Ads. When you use Third-Party Services and Ads, you
              do so at your own risk. When you link to Third-Party Services and
              Ads, the applicable third party&apos;s terms and policies apply,
              including the third party&apos;s privacy policies.
            </p>
          </section>

          <section id="section19" className="h-auto">
            <h2 className="text-3xl mt-10 font-bold mb-4">
              THIRD PARTY AFFILIATE MARKETING
            </h2>

            <p>
              We participate in affiliate marketing and may allow third-party
              affiliate links to be encoded on some of our Services. This means
              that we may earn a commission when you click on or make purchases
              via third-party affiliate links.
            </p>
          </section>

          <section id="section20" className="h-auto">
            <h2 className="text-3xl mt-10 font-bold mb-4">LOCAL REGULATIONS</h2>

            <p>
              9TH MARKET PLACE makes no representation that our Services or
              Content are appropriate or available for use outside Nigeria and
              its territories. If you choose to access our Services or Content
              from other locations, you do so on your own initiative and at your
              own risk. You are responsible for complying with local laws, if
              and to the extent local laws are applicable. You specifically
              agree to comply with all applicable laws concerning the
              transmission of technical data exported from Nigeria or the
              country you reside in.
            </p>
          </section>

          <section id="section21" className="h-auto">
            <h2 className="text-3xl mt-10 font-bold mb-4">TERMINATION</h2>

            <p>
              9TH MARKET PLACE may, in its sole discretion, terminate your
              password, account (or any part thereof) or use of our Services, or
              remove and discard any User Content or information stored, sent,
              or received via our Services without prior notice and for any
              reason or no reason, including, but not limited to:
            </p>
            <ul className="list-disc ml-6">
              <li>
                permitting another person or entity to use your identification
                to access our Services,
              </li>
              <li>any unauthorized access or use of our Services,</li>
              <li>any violation of this Agreement, or</li>
              <li>
                tampering with or alteration of any of the software, data files,
                and/or Content contained in or accessed through, our website.
                You may terminate your account for any reason or no reason.
                Termination, suspension, or cancellation of this Agreement or
                your access rights to our website shall not affect any right or
                relief to which 9TH MARKET PLACE may be entitled, at law or in
                equity. Upon such termination, suspension, or cancellation, all
                rights granted to you will automatically terminate and
                immediately revert to 9TH MARKET PLACE and its licensors and all
                rights granted by you to 9TH MARKET PLACE shall survive in
                perpetuity.
              </li>
            </ul>
            <p>
              Notwithstanding any termination, suspension, or cancellation of
              this Agreement or your access rights to our Services, all the
              provisions of this Agreement will survive.
            </p>
          </section>
          <section id="section22" className="h-auto">
            <h2 className="text-3xl mt-10 font-bold mb-4">
              ENTIRE AGREEMENT AND SEVERABILITY
            </h2>

            <p>
              This Agreement constitutes the entire agreement between you and us
              regarding the use of our Services. Our failure to exercise or
              enforce any right or provision of this Agreement shall not operate
              as a waiver of such right or provision. The section titles in this
              Agreement are for convenience only and have no legal or
              contractual effect. The word including means including without
              limitation. If any provision of this Agreement is, for any reason,
              held to be invalid or unenforceable, the other provisions of this
              Agreement will be unimpaired and the invalid or unenforceable
              provision will be deemed modified so that it is valid and
              enforceable to the maximum extent permitted by law.
            </p>
          </section>

          <section id="section23" className="h-auto">
            <h2 className="text-3xl mt-10 font-bold mb-4">
              CHANGES TO THIS AGREEMENT
            </h2>

            <p>
              We may revise, prospectively, this Agreement by posting an updated
              version on our website. You consent and agree to receive notices
              of updates to this Agreement through our posting of an updated
              Agreement on the website. You should visit this page or section
              regularly to review the current version of the Agreement. Your
              continued use of our Services will be deemed as irrevocable
              acceptance of any revisions.
            </p>
          </section>

          <section id="section24" className="h-auto">
            <h2 className="text-3xl mt-10 font-bold mb-4">
              DISPUTE RESOLUTION (ARBITRATION CLAUSE AND CLASS ACTION WAIVER)
            </h2>

            <p>
              PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS.
              Except for either party&apos;s claims of infringement or
              misappropriation of the other party&apos;s patent, copyright,
              trademark, or trade secret, any and all disputes between you and
              9TH MARKET PLACE arising under or related in any way to this
              Agreement, must be resolved through binding arbitration as
              described in this Agreement. This agreement to arbitrate is
              intended to be interpreted broadly. It includes, but is not
              limited to, all claims and disputes relating to your use of any of
              our Services. YOU AGREE THAT BY ENTERING INTO THIS AGREEMENT, YOU
              AND 9TH MARKET PLACE ARE EACH WAIVING THE RIGHT TO TRIAL BY A
              COURT OR TO PARTICIPATE IN A CLASS ACTION. YOU AND 9TH MARKET
              PLACE AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN
              YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS
              MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. ANY
              ARBITRATION WILL TAKE PLACE ON AN INDIVIDUAL BASIS; CLASS
              ARBITRATIONS AND CLASS ACTIONS ARE NOT PERMITTED.
            </p>
          </section>

          <section id="section25" className="h-auto">
            <h2 className="text-3xl mt-10 font-bold mb-4">NO WAIVER</h2>

            <p>
              No failure or delay by 9TH MARKET PLACE in exercising any right,
              power or privilege under this Agreement will operate as a waiver
              thereof, nor will any single or partial exercise of any right,
              power or privilege preclude any other or further exercise thereof
              or the exercise of any other right, power, or privilege under this
              Agreement.
            </p>
          </section>

          <section id="section26" className="h-auto">
            <h2 className="text-3xl mt-10 font-bold mb-4">
              COPYRIGHT/TRADEMARK INFORMATION
            </h2>
            <p>
              Copyright © 2024, 9TH MARKET PLACE. All rights reserved. All
              trademarks, logos and service marks (&quot;Marks&quot;) displayed
              on our website, are our property or the property of other third
              parties. You are not permitted to use these Marks without our
              prior written consent or the consent of such third party which may
              own the Marks.
            </p>
          </section>

          <section id="section27" className="h-auto">
            <h2 className="text-3xl mt-10 font-bold mb-4">CONTACT US</h2>

            <p>
              If you have any questions about this Agreement, you may contact us
              by email at <strong>support@9THMARKETPLACE.com</strong> |{" "}
              <strong>info@9THMARKETPLACE.com</strong>
            </p>

            <p>© 2024 9TH MARKET PLACE. All rights reserved.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default page;
