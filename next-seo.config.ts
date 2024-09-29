// next-seo.config.ts
const SEO = {
    title: "Unilab Student Chapter",
    description: "Unilab Optic Chapter, associado à entidade norte-americana The Optical Society (OSA). Promovemos a geração, aplicação, e disseminação de conhecimento na área de óptica e fotônica.",
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: 'https://www.unilabstudentchapter.org/',
      site_name: 'Unilab Student Chapter',
      images: [
        {
          url: 'https://www.unilabstudentchapter.org/favicon.ico',
          width: 1200,
          height: 630,
          alt: 'Unilab Student Chapter',
        },
      ],
    },
    twitter: {
      handle: '@unilabchapter',
      site: '@unilabchapter',
      cardType: 'summary_large_image',
    },
  };
  
  export default SEO;
  