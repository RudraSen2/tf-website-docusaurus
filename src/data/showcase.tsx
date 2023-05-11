/* eslint-disable global-require */

import { translate } from '@docusaurus/Translate';
import { sortBy } from '@site/src/utils/jsUtils';

// // prettier-ignore

const Showcases: Showcase[] = [
    {
        title: 'Comp Labs',
        description: 'Tech-based Blog, Enterprise-Grade Solutions and more...',
        preview: require(''),
        website: 'https://complabs.in/',
        source: 'https://github.com/Comp-Labs/comp-labs-website',
    },
    {
        title: 'Comp Labs',
        description: 'Tech-based Blog, Enterprise-Grade Solutions and more...',
        preview: require(''),
        website: 'https://complabs.in/',
        source: 'https://github.com/Comp-Labs/comp-labs-website',
    },
    {
        title: 'Comp Labs',
        description: 'Tech-based Blog, Enterprise-Grade Solutions and more...',
        preview: require(''),
        website: 'https://complabs.in/',
        source: 'https://github.com/Comp-Labs/comp-labs-website',
    },
    {
        title: 'Comp Labs',
        description: 'Tech-based Blog, Enterprise-Grade Solutions and more...',
        preview: require(''),
        website: 'https://complabs.in/',
        source: 'https://github.com/Comp-Labs/comp-labs-website',
    },
];


export type Showcase = {
    title: string;
    description: string;
    preview: string | null; // null = use our serverless screenshot service
    website: string;
    source: string | null;
};