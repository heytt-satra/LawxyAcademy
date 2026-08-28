import './styles/globals.css';

export const metadata = {
  title: 'Lawxy Certified AI-Native Lawyer | Professional Certification',
  description: 'Earn your Lawxy Certified AI-Native Lawyer credential. Free learning, rigorous assessment. Demonstrate real competence in AI-assisted legal practice.',
  openGraph: {
    title: 'Lawxy Certified AI-Native Lawyer | Professional Certification',
    description: 'Earn your Lawxy Certified AI-Native Lawyer credential. Free learning, rigorous assessment.',
    url: 'https://learn.lawxyai.com',
    siteName: 'Lawxy Certification',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
