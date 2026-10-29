// All site copy lives here. Edit this file to update the website —
// components only handle layout.

export const profile = {
  name: 'Kenneth San',
  school: 'Johns Hopkins University',
  degree: 'Applied Mathematics & Statistics · Computer Science',
  status: 'Undergraduate',
  // Three short lines shown in the hero: research, engineering, frontier.
  triad: [
    { label: 'Research', text: 'Studying how intelligent systems learn, represent, and generalize.' },
    { label: 'Engineering', text: 'Building those ideas into systems people can actually use.' },
    { label: 'Frontier', text: 'Following the hardware and companies shaping where AI goes next.' },
  ],
  intro: [
    'I am an undergraduate at Johns Hopkins studying Applied Mathematics & Statistics and Computer Science. I approach AI from several directions at once: the science of how learning systems work, the engineering of turning models into reliable software, and the technologies and teams that determine what gets built.',
    'My research so far has focused on computer vision. I co-led work on saliency-guided region proposals for object detection, which drew on ideas from biological vision to make detectors more efficient. I am also exploring computational neuroscience, specialized AI hardware, and early-stage startups.',
  ],
}

export type InterestId = 'research' | 'engineering' | 'startups' | 'hardware' | 'neuro'

export interface Interest {
  id: InterestId
  title: string
  description: string
  topics: string[]
  // Other interests this area feeds into; drawn as edges in the map.
  connects: InterestId[]
}

export const interests: Interest[] = [
  {
    id: 'research',
    title: 'AI Research',
    description:
      'How intelligent systems learn, reason, represent information, and generalize, and the scientific questions underneath.',
    topics: ['Foundation models', 'New architectures', 'Representation learning'],
    connects: ['engineering', 'neuro', 'hardware'],
  },
  {
    id: 'engineering',
    title: 'AI Engineering & Applications',
    description:
      'Translating research into useful products: building practical, end-to-end systems powered by AI.',
    topics: ['LLM applications', 'Intelligent agents', 'End-to-end AI systems'],
    connects: ['research', 'startups', 'hardware'],
  },
  {
    id: 'startups',
    title: 'Startups & Entrepreneurship',
    description:
      'Early-stage companies, ambitious technical teams, and products that solve meaningful problems at the intersection of technology and business.',
    topics: ['Early-stage startups', 'Technical teams', 'Product building'],
    connects: ['engineering', 'hardware'],
  },
  {
    id: 'hardware',
    title: 'AI Hardware',
    description:
      'Specialized hardware for AI workloads, and how the design of chips and models shape each other.',
    topics: ['AI accelerators', 'Neuromorphic computing', 'Hardware–software co-design'],
    connects: ['research', 'engineering', 'neuro', 'startups'],
  },
  {
    id: 'neuro',
    title: 'Computational Neuroscience',
    description:
      'Connections between biological and artificial intelligence: how brains represent information, and what that suggests for machines.',
    topics: ['Neural representations', 'Multimodal neural data', 'Brain foundation models'],
    connects: ['research', 'hardware'],
  },
]

export interface Publication {
  title: string
  venue: string
  venueFull: string
  year: number
  // Use '*' to mark equal contribution. Add co-author names here as they
  // appear on the paper; "et al." is shown until then.
  authors: string[]
  authorsEtAl: boolean
  note: string
  abstract: string
  doi: string
  // Set to a URL string to show the link; leave null to hide it.
  pdf: string | null
  code: string | null
}

export const publications: Publication[] = [
  {
    title: 'Salient Region Proposals for Object Detection',
    venue: 'ICONS 2026',
    venueFull: 'International Conference on Neuromorphic Systems',
    year: 2026,
    authors: ['Kenneth San*'],
    authorsEtAl: true,
    note: '* Co-first author',
    abstract:
      'We study how visual saliency can be incorporated into region proposal networks to make object detection more efficient. Rather than scoring a dense set of candidate regions, the detector uses saliency to guide sparsification of its region proposals, concentrating computation where an object is likely to be.',
    doi: '10.1145/3822454.3822480',
    pdf: null, // e.g. 'https://…/salient-region-proposals.pdf'
    code: null, // e.g. 'https://github.com/kenzo-bento/salient-rpn'
  },
]

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Machine Learning & AI',
    items: [
      'PyTorch',
      'Deep Learning',
      'Convolutional Neural Networks',
      'Vision Transformers',
      'Large Language Models',
      'Attention Mechanisms',
      'Representation Learning',
    ],
  },
  { group: 'Programming', items: ['Python', 'C++', 'R', 'SQL'] },
  {
    group: 'Mathematics',
    items: ['Linear Algebra', 'Multivariable Calculus', 'Differential Equations', 'Vector Calculus'],
  },
]

// Leave a value as '' to hide that contact link.
export const contact = {
  email: 'ksan2@jh.edu',
  github: 'https://github.com/kenzo-bento',
  linkedin: '', // e.g. 'https://www.linkedin.com/in/your-handle'
}
