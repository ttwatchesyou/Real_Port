import Portfolio from '@/components/Portfolio';
import { profile } from '@/data/portfolio';
import { absoluteUrl, githubUrl, repositoryUrl, siteDescription, siteName } from '@/lib/siteMetadata';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${absoluteUrl('/')}#person`,
      name: profile.name,
      alternateName: profile.thaiName,
      url: absoluteUrl('/'),
      sameAs: [githubUrl],
      jobTitle: profile.role,
      knowsAbout: ['Mechatronics', 'Robotics', 'Automation', 'PLC', 'Embedded systems', 'Control systems'],
    },
    {
      '@type': 'WebSite',
      '@id': `${absoluteUrl('/')}#website`,
      name: siteName,
      url: absoluteUrl('/'),
      description: siteDescription,
      author: { '@id': `${absoluteUrl('/')}#person` },
      sameAs: [repositoryUrl],
      inLanguage: ['th', 'en', 'zh-CN'],
    },
  ],
};

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}/>
    <Portfolio />
  </>;
}
