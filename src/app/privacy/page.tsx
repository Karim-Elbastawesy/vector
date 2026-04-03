import Link from 'next/link'
import { Shield } from 'lucide-react'

const articles = [
    {
        number: 1,
        title: 'Information We Collect',
        items: [
            { label: 'Personal Data', text: 'Name, email address, phone number, and shipping address.' },
            { label: 'Payment Data', text: 'Credit card information processed securely through our payment providers.' },
            { label: 'Technical Data', text: 'IP address, browser type, device information, and access times.' },
            { label: 'Usage Data', text: 'Pages viewed, products browsed, and actions taken within our platform.' },
        ],
    },
    {
        number: 2,
        title: 'How We Use Your Information',
        items: [
            { text: 'To process and fulfill your orders.' },
            { text: 'To send order confirmations and shipping updates.' },
            { text: 'To provide customer support and respond to inquiries.' },
            { text: 'To improve our products, services, and user experience.' },
            { text: 'To send promotional communications (with your consent).' },
        ],
    },
    {
        number: 3,
        title: 'Data Protection',
        items: [
            { text: 'We implement industry-standard encryption (SSL/TLS) for all data transfers.' },
            { text: 'Payment information is processed by PCI-compliant payment providers.' },
            { text: 'We conduct regular security audits and vulnerability assessments.' },
            { text: 'Access to personal data is restricted to authorized personnel only.' },
        ],
    },
    {
        number: 4,
        title: 'Information Sharing',
        items: [
            { text: 'We do not sell, trade, or rent your personal information to third parties.' },
            { text: 'We may share data with trusted service providers who assist in our operations.' },
            { text: 'We may disclose information when required by law or to protect our rights.' },
        ],
    },
    {
        number: 5,
        title: 'Your Rights',
        items: [
            { label: 'Access', text: 'Request a copy of your personal data.' },
            { label: 'Rectification', text: 'Request correction of inaccurate data.' },
            { label: 'Erasure', text: 'Request deletion of your personal data.' },
            { label: 'Portability', text: 'Request your data in a portable format.' },
            { label: 'Opt-out', text: 'Unsubscribe from marketing communications at any time.' },
        ],
    },
    {
        number: 6,
        title: 'Cookies',
        items: [
            { text: 'We use cookies to enhance your browsing experience and remember preferences.' },
            { text: 'You can control cookie settings through your browser preferences.' },
            { text: 'Disabling cookies may affect the functionality of certain features.' },
        ],
    },
]

export default function PrivacyPage() {
    return (
        <div className="min-h-screen">
            <div className="bg-zinc-900 py-16">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-400/20 rounded-2xl mb-4">
                        <Shield className="w-7 h-7 text-amber-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Privacy Policy</h1>
                    <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
                        This Privacy Policy describes how Vector collects, uses, and protects your personal information. We are committed to ensuring your privacy is protected.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-14">
                <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-5 mb-10">
                    <p className="text-amber-800 font-semibold text-sm">Your Privacy Matters</p>
                    <p className="text-amber-700 text-sm mt-1 leading-relaxed">
                        This Privacy Policy describes how Vector collects, uses, and protects your personal information when you use our services. We are committed to ensuring that your privacy is protected.
                    </p>
                </div>

                <div className="flex flex-col gap-6">
                    {articles.map(article => (
                        <div key={article.number} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-100">
                                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Article {article.number}</span>
                                <h2 className="text-base font-bold text-gray-900">{article.title}</h2>
                            </div>
                            <ul className="px-6 py-4 flex flex-col gap-3">
                                {article.items.map((item, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-gray-600">
                                        <span className="text-amber-400 font-bold shrink-0">{article.number}.{i + 1}</span>
                                        <p>
                                            {item.text}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-100">
                            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Article 7</span>
                            <h2 className="text-base font-bold text-gray-900">Data Retention</h2>
                        </div>
                        <p className="px-6 py-4 text-sm text-gray-600 leading-relaxed">
                            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Account data is deleted within 30 days of account closure upon request.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-100">
                            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Article 8</span>
                            <h2 className="text-base font-bold text-gray-900">Contact Us</h2>
                        </div>
                        <p className="px-6 py-4 text-sm text-gray-600 leading-relaxed">
                            For questions about this Privacy Policy or to exercise your rights, contact our Data Protection Officer at{' '}
                            <a href="mailto:privacy@vector.com" className="text-amber-500 hover:text-amber-600 font-medium">privacy@vector.com</a>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-10">
                    <Link href="/" className="flex-1 text-center px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-amber-400 text-gray-700 font-semibold text-sm transition-colors">
                        ← Back to Home
                    </Link>
                    <Link href="/terms" className="flex-1 text-center px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold text-sm transition-colors">
                        View Terms of Service →
                    </Link>
                </div>
            </div>
        </div>
    )
}