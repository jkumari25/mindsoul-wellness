import { FaDiscord, FaYoutube, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] text-gray-300 py-16">
      <div className="max-w-[90%] mx-auto px-4">
        {/* Mission Message */}
        <div className="mt-6 text-center md:text-left">
          <p className="text-2xl font-medium">
            Supporting minds. Nurturing hearts. Empowering futures.
          </p>
          <a href="#" className="text-[#7a3cff] hover:text-[#beb0dd] text-md ">
            Learn about our care approach
          </a>
        </div>

        {/* Footer Links */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-6 gap-10">
          {/* Logo & About (Wider Column) */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <a href="/">
                <img
                  src="/logo_white.png"
                  alt="MindSoul Logo"
                  className="h-[85px] w-[100px]"
                />
              </a>
            </div>
            <p className="text-md text-gray-400 leading-relaxed">
              MindSoul is dedicated to helping children facing emotional and
              developmental challenges. We provide therapeutic support,
              compassionate guidance, and a safe space for healing and growth.
            </p>
          </div>

          <FooterLinks
            title="Programs"
            links={[
              "Child Therapy",
              "Behavioral Support",
              "Parent Guidance",
              "Emotional Wellness Sessions",
            ]}
          />

          <FooterLinks
            title="Resources"
            links={[
              "Articles & Guides",
              "Workshops",
              "Stories of Hope",
              "Support Groups",
            ]}
          />

          <FooterLinks
            title="Organization"
            links={[
              "Who We Are",
              "Our Care Team",
              "Our Philosophy",
              "Get Involved",
            ]}
          />

          <FooterLinks
            title="Legal"
            links={["Privacy Policy", "Care & Safety Policy"]}
          />
        </div>

        {/* Bottom Row */}
        <div className="mt-14 flex flex-col md:flex-row items-center justify-between gap-4 text-lg text-gray-500 border-t border-gray-800 pt-6">
          <p>© {new Date().getFullYear()} MindSoul. All Rights Reserved.</p>

          <div className="flex items-center gap-4">
            <span className="mr-2">Connect with us:</span>
            <FaTwitter className="cursor-pointer hover:text-white duration-150" />
            <FaDiscord className="cursor-pointer hover:text-white duration-150" />
            <FaYoutube className="cursor-pointer hover:text-white duration-150" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ title, links }) {
  return (
    <div className="md:col-span-1">
      <h4 className="text-gray-200 font-xl mb-3">{title}</h4>
      <ul className="space-y-2 text-md text-gray-400">
        {links.map((link, i) => (
          <li key={i} className="hover:text-white cursor-pointer duration-150">
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
}
