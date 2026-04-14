export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly, including: email address (when you create an account), text content you submit for processing, and usage data including which tools you use and how many credits you consume. We do not sell your personal data to third parties.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <p>We use your information to: provide AI writing assistance services, manage your account and credits, improve our services, and communicate with you about your account. Your submitted text content is processed in real-time and is not stored persistently on our servers after processing is complete.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Data Retention</h2>
            <p>Account information is retained as long as your account is active. Usage logs are retained for up to 12 months for service improvement purposes. You may request deletion of your account and associated data at any time by contacting us.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Cookies</h2>
            <p>We use essential cookies for authentication and session management. We do not use advertising or tracking cookies. You can control cookie preferences through your browser settings.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. GDPR (EU Users)</h2>
            <p>If you are located in the European Economic Area, you have the right to: access your personal data, correct inaccurate data, delete your data ("right to be forgotten"), restrict processing, data portability, and object to processing. To exercise these rights, contact us at privacy@aiwriting.tools.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. CCPA (California Users)</h2>
            <p>California residents have the right to know what personal information is collected, request deletion of personal information, and opt-out of the sale of personal information. We do not sell personal information. To exercise your rights, contact us at privacy@aiwriting.tools.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Contact</h2>
            <p>For privacy-related inquiries, contact us at: privacy@aiwriting.tools</p>
          </section>
          <p className="text-sm text-gray-400 pt-4">Last updated: April 14, 2026</p>
        </div>
      </div>
    </div>
  )
}
