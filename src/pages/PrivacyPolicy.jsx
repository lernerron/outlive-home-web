import { Shield, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 rounded-full">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            Privacy Policy
          </h1>
          <div className="bg-blue-50 rounded-lg p-4 inline-block">
            <p className="text-sm text-blue-800">
              <strong>Effective Date:</strong> January 10, 2025 | 
              <strong className="ml-2">Last Updated:</strong> January 10, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        {/* Introduction */}
        <div className="mb-16">
          <p className="text-lg leading-8 text-gray-700">
            This Privacy Policy describes how <strong className="text-blue-900">Blue Mountain Associates</strong> ("<strong>we</strong>," "<strong>us</strong>," or "<strong>our</strong>") collects, uses, shares, and protects your personal information when you visit or use our website, <strong>www.bmliving.com</strong> (the "<strong>Site</strong>"). This Privacy Policy is intended to comply with applicable privacy laws, including the <strong>California Consumer Privacy Act (CCPA)</strong> and the <strong>California Privacy Rights Act (CPRA)</strong>.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="mb-16 bg-gray-50 rounded-xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Table of Contents</h2>
          <nav className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { title: "Information We Collect", anchor: "#section-1" },
              { title: "How We Use Your Information", anchor: "#section-2" },
              { title: "Sharing and Disclosure", anchor: "#section-3" },
              { title: "Your Privacy Rights", anchor: "#section-4" },
              { title: "Cookies and Tracking", anchor: "#section-5" },
              { title: "Security Measures", anchor: "#section-6" },
              { title: "Third-Party Links", anchor: "#section-7" },
              { title: "Surveys & Promotions", anchor: "#section-8" },
              { title: "Data Retention", anchor: "#section-9" },
              { title: "Policy Changes", anchor: "#section-10" },
              { title: "Contact Us", anchor: "#section-11" }
            ].map((item, index) => (
              <a
                key={index}
                href={item.anchor}
                className="flex items-center text-blue-600 hover:text-blue-800 font-medium py-1 transition-colors"
              >
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                {item.title}
              </a>
            ))}
          </nav>
        </div>

        {/* Section 1 */}
        <section id="section-1" className="mb-16">
          <div className="border-l-4 border-blue-600 pl-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
          </div>
          
          <p className="text-gray-700 mb-6 leading-7">We collect the following categories of personal information:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              { title: "Identifiers", items: ["Name", "Email address", "Phone number", "Mailing address", "IP address"] },
              { title: "Internet Activity", items: ["Browsing behavior", "Pages visited", "Time spent on pages", "Site interactions"] },
              { title: "Geolocation Data", items: ["Approximate location", "Based on IP address"] },
              { title: "Customer Records", items: ["Form submissions", "Email inquiries", "Direct contact info"] }
            ].map((category, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h3 className="font-semibold text-amber-800 mb-2">How We Collect Information</h3>
            <ul className="space-y-2 text-amber-700">
              <li className="flex items-start"><span className="font-medium mr-2">•</span><strong>Directly from you</strong> (e.g., through contact forms, email inquiries)</li>
              <li className="flex items-start"><span className="font-medium mr-2">•</span><strong>Automatically</strong> through cookies, pixels, and similar technologies</li>
              <li className="flex items-start"><span className="font-medium mr-2">•</span><strong>From third-party services</strong>, such as Google Analytics, used for website analytics</li>
            </ul>
            <div className="mt-4 p-3 bg-amber-100 rounded border-l-4 border-amber-400">
              <p className="text-sm text-amber-800"><strong>Note:</strong> We do not knowingly collect personal information from children under 16.</p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section id="section-2" className="mb-16">
          <div className="border-l-4 border-blue-600 pl-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Service Delivery", items: ["Respond to inquiries or service requests", "Provide and improve our services and Site functionality"] },
              { title: "Communications", items: ["Send updates and marketing communications", "Promotional offers (you may opt out at any time)"] },
              { title: "Legal & Security", items: ["Comply with legal obligations", "Protect against fraud or misuse"] }
            ].map((purpose, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">{purpose.title}</h3>
                <ul className="space-y-3">
                  {purpose.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start text-gray-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
            <p className="text-blue-800">
              We will not collect additional categories of personal information or use your personal information for materially different, unrelated, or incompatible purposes without providing notice.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section id="section-3" className="mb-16">
          <div className="border-l-4 border-blue-600 pl-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Sharing and Disclosure of Information</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { title: "Service Providers", desc: "Such as hosting providers, customer support vendors, analytics partners (e.g., Google Analytics), and marketing services. These parties are contractually bound to use your data only for the services requested." },
              { title: "Affiliates and Business Partners", desc: "That adhere to this Privacy Policy." },
              { title: "Legal Authorities", desc: "If required to comply with a subpoena, legal process, or to protect our legal rights." },
              { title: "In Business Transfers", desc: "Such as mergers, acquisitions, or asset sales, where user data may be transferred as part of the transaction." },
              { title: "With Your Consent", desc: "For any other disclosed purpose, with your permission." }
            ].map((sharing, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{sharing.title}</h3>
                  <p className="text-gray-700 text-sm leading-6">{sharing.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">
              We do <strong>not sell</strong> your personal information or share it for cross-context behavioral advertising without your consent.
            </p>
          </div>
        </section>

        {/* Section 4 - California Rights */}
        <section id="section-4" className="mb-16">
          <div className="border-l-4 border-blue-600 pl-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Your Privacy Rights (California Residents)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              { right: "Right to Know", desc: "Request details on the personal information we collect, use, and share." },
              { right: "Right to Delete", desc: "Request deletion of personal data, subject to exceptions." },
              { right: "Right to Correct", desc: "Request correction of inaccurate personal information." },
              { right: "Right to Opt-Out", desc: "Of the sale or sharing of your personal data (we do not sell your data)." },
              { right: "Right to Limit Use", desc: "You may request limits on the use of sensitive personal information (we do not collect sensitive data)." },
              { right: "Right Not to Be Discriminated Against", desc: "For exercising your rights." }
            ].map((right, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">{right.right}</h3>
                <p className="text-sm text-gray-700">{right.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border-2 border-blue-200 rounded-xl p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">To exercise any of these rights, please contact us:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <a href="mailto:privacy@bluemountainassociates.com" className="text-blue-600 hover:text-blue-800 font-medium">
                  privacy@bluemountainassociates.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-600" />
                <a href="tel:800-555-1234" className="text-blue-600 hover:text-blue-800 font-medium">
                  (800) 555-1234
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Sections 5-8 - Simplified Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <section id="section-5" className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 mb-4 text-sm leading-6">
              We use cookies and similar technologies to enhance your browsing experience and understand how our Site is used. You may choose to disable cookies through your browser settings, but doing so may affect Site functionality.
            </p>
            <div className="bg-gray-50 rounded p-4">
              <p className="text-sm text-gray-700 mb-2">
                We use <strong>Google Analytics</strong>, which uses cookies to track anonymous website usage. We do <strong>not</strong> use Google Analytics to collect personally identifiable information.
              </p>
              <a 
                href="https://tools.google.com/dlpage/gaoptout" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Opt out of Google Analytics
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </section>

          <section id="section-6" className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Security Measures</h2>
            <p className="text-gray-700 mb-4 text-sm leading-6">
              We take the security of your information seriously and implement reasonable administrative, technical, and physical safeguards to protect your data.
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                <div>
                  <p className="text-sm font-medium text-gray-900">Online:</p>
                  <p className="text-sm text-gray-600">We encrypt data using SSL/TLS where appropriate.</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                <div>
                  <p className="text-sm font-medium text-gray-900">Offline:</p>
                  <p className="text-sm text-gray-600">Access to personal data is restricted to employees with a business need.</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 italic">
              Despite these efforts, no method of transmission over the internet or storage is 100% secure.
            </p>
          </section>

          <section id="section-7" className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. Third-Party Links</h2>
            <p className="text-gray-700 text-sm leading-6">
              Our Site may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to read their privacy policies.
            </p>
          </section>

          <section id="section-8" className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">8. Surveys, Contests & Promotions</h2>
            <p className="text-gray-700 text-sm leading-6">
              From time to time, we may conduct surveys, contests, or promotions. Participation is voluntary. Information collected may include name, contact information, and demographic data. This information will be used solely for the purpose stated (e.g., winner notification, customer feedback).
            </p>
          </section>
        </div>

        {/* Sections 9-10 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <section id="section-9" className="bg-blue-50 rounded-xl p-8">
            <h2 className="text-xl font-bold text-blue-900 mb-4">9. Data Retention</h2>
            <p className="text-blue-800 text-sm leading-6">
              We retain your personal information for as long as necessary to fulfill the purposes described in this Privacy Policy unless a longer retention period is required by law.
            </p>
          </section>

          <section id="section-10" className="bg-blue-50 rounded-xl p-8">
            <h2 className="text-xl font-bold text-blue-900 mb-4">10. Changes to This Privacy Policy</h2>
            <p className="text-blue-800 text-sm leading-6">
              We may update this Privacy Policy periodically. If we make material changes, we will post a notice on our Site or notify you directly, where required. Your continued use of the Site after updates constitutes acceptance of the revised policy.
            </p>
          </section>
        </div>

        {/* Contact Section */}
        <section id="section-11" className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">11. Contact Us</h2>
          <p className="mb-8 text-blue-100">
            If you have any questions about this Privacy Policy or your data rights, please contact us:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <Mail className="h-6 w-6 text-blue-200 mt-1" />
              <div>
                <p className="font-medium mb-1">Email</p>
                <a href="mailto:privacy@bmliving.com" className="text-blue-200 hover:text-white transition-colors">
                  privacy@bmliving.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Phone className="h-6 w-6 text-blue-200 mt-1" />
              <div>
                <p className="font-medium mb-1">Phone</p>
                <a href="tel:800-555-1234" className="text-blue-200 hover:text-white transition-colors">
                  (800) 555-1234
                </a>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <MapPin className="h-6 w-6 text-blue-200 mt-1" />
              <div>
                <p className="font-medium mb-1">Address</p>
                <div className="text-blue-200 text-sm leading-5">
                  Blue Mountain Associates<br/>
                  1234 Privacy Way, Suite 100<br/>
                  Los Angeles, CA 90001
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Top */}
        <div className="mt-16 text-center">
          <a 
            href="#" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Back to Top
            <span className="ml-2">↑</span>
          </a>
        </div>
      </div>
    </div>
  );
}