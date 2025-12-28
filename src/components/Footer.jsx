import { FaDiscord, FaYoutube, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

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
        <div className="mt-14 grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Logo & About (Wider Column) */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <a href="/">
                <img
                  src="/logo-1.png"
                  alt="MindSoul Logo"
                  className="h-[130px] w-[200px]"
                />
              </a>
            </div>
            <p className="text-md text-gray-400 leading-relaxed">
              MindSoul is dedicated to helping children facing emotional and
              developmental challenges. We provide therapeutic support,
              compassionate guidance, and a safe space for healing and growth.
            </p>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-gray-200 font-xl mb-3">Programs</h4>

            <ul className="space-y-2 text-md text-gray-400">
              <p>Child Therapy</p>
              <p>Behavioral Support</p>
              <p>Parent Guidance</p>
              <p>Emotional Wellness Sessions</p>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-gray-200 font-xl mb-3">Resources</h4>

            <ul className="space-y-2 text-md text-gray-400">
              <p>
                <a href="/">Home</a>
              </p>
              <p>
                <a href="/about">About</a>
              </p>
              <p>
                <a href="/counsellors">Counsellors</a>
              </p>
              <p>
                <a href="/corporate-wellness">Corporate Wellness</a>
              </p>
              <p>
                <a href="/contact">Contact Us</a>
              </p>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-gray-200 font-xl mb-3">Legal</h4>

            <ul className="space-y-2 text-md text-gray-400">
              <p>
                <a href="/privacy-policy">Privacy Policy</a>
              </p>
            </ul>
          </div>
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
          <li key={i} className="duration-150">
            {typeof link === "string" ? (
              <span className="hover:text-white cursor-pointer">{link}</span>
            ) : (
              <Link to={link.href} className="hover:text-white cursor-pointer">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
