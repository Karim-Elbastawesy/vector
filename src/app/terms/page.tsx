import Link from 'next/link'
import { ScrollText } from 'lucide-react'

const articles = [
    {
        number: 1,
        title: 'Acceptance of Terms',
        items: [
            { text: 'By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms.' },
            { text: 'If you do not agree to these Terms, you must not access or use the Service.' },
            { text: 'We reserve the right to modify these Terms at any time, and such modifications shall be effective immediately upon posting.' },
        ],
    },
    {
        number: 2,
        title: 'User Eligibility',
        items: [
            { text: 'The Service is intended for users who are at least eighteen (18) years of age.' },
            { text: 'By using the Service, you represent and warrant that you are of legal age to form a binding contract.' },
            { text: 'If you are accessing the Service on behalf of a legal entity, you represent that you have the authority to bind such entity.' },
        ],
    },
    {
        number: 3,
        title: 'Account Registration',
        items: [
            { text: 'You may be required to create an account to access certain features of the Service.' },
            { text: 'You agree to provide accurate, current, and complete information during registration.' },
            { text: 'You are solely responsible for maintaining the confidentiality of your account credentials.' },
            { text: 'You agree to notify us immediately of any unauthorized use of your account.' },
        ],
    },
    {
        number: 4,
        title: 'Orders and Payments',
        items: [
            { text: 'All orders placed through the Service are subject to acceptance and availability.' },
            { text: 'Prices are subject to change without notice prior to order confirmation.' },
            { text: 'Payment must be made in full at the time of purchase through approved payment methods.' },
            { text: 'We reserve the right to refuse or cancel any order at our sole discretion.' },
        ],
    },
    {
        number: 5,
        title: 'Shipping and Delivery',
        items: [
            { text: 'Shipping times are estimates only and are not guaranteed.' },
            { text: 'Risk of loss and title for items purchased pass to you upon delivery to the carrier.' },
            { text: 'We are not responsible for delays caused by carriers, customs, or other factors beyond our control.' },
        ],
    },
    {
        number: 6,
        title: 'Returns and Refunds',
        items: [
            { text: 'Our return policy allows returns within 14 days of delivery for most items.' },
            { text: 'Products must be unused and in original packaging.' },
            { text: 'Refunds will be processed within 5-7 business days after receiving the returned item.' },
        ],
    },
]

export default function TermsPage() {
    return (
        <div className="min-h-screen">
            <div className="bg-zinc-900 py-16">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-400/20 rounded-2xl mb-4">
                        <ScrollText className="w-7 h-7 text-amber-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Terms of Service</h1>
                    <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
                        By accessing and using Vector, you accept and agree to be bound by the terms and provisions of this agreement.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-14">
                <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-5 mb-10">
                    <p className="text-amber-800 font-semibold text-sm">Important Notice</p>
                    <p className="text-amber-700 text-sm mt-1 leading-relaxed">
                        By accessing and using Vector, you accept and agree to be bound by the terms and provisions of this agreement. Please read these terms carefully before using our services.
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
                                        <p>{item.text}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-100">
                            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Article 7</span>
                            <h2 className="text-base font-bold text-gray-900">Limitation of Liability</h2>
                        </div>
                        <p className="px-6 py-4 text-sm text-gray-600 leading-relaxed">
                            To the maximum extent permitted by applicable law, Vector shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-100">
                            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Article 8</span>
                            <h2 className="text-base font-bold text-gray-900">Contact Us</h2>
                        </div>
                        <p className="px-6 py-4 text-sm text-gray-600 leading-relaxed">
                            If you have any questions about these Terms, please contact us at{' '}
                            <a href="mailto:support@vector.com" className="text-amber-500 hover:text-amber-600 font-medium">support@vector.com</a>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-10">
                    <Link href="/" className="flex-1 text-center px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-amber-400 text-gray-700 font-semibold text-sm transition-colors">
                        ← Back to Home
                    </Link>
                    <Link href="/privacy" className="flex-1 text-center px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold text-sm transition-colors">
                        View Privacy Policy →
                    </Link>
                </div>
            </div>
        </div>
    )
}