import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import Image from '@theme/IdealImage';
import FavoriteIcon from '@site/src/components/svgIcons/FavoriteIcon';
import {
    type Showcase,
} from '@site/src/data/showcase';
import { sortBy } from '@site/src/utils/jsUtils';
import Heading from '@theme/Heading';
import Tooltip from '@mui/joy/Tooltip';
import styles from './styles.module.css';

// const TagComp = React.forwardRef<HTMLLIElement, Tag>(
//     ({ label, color, description }, ref) => (
//         <li ref={ref} className={styles.tag} title={description}>
//             <span className={styles.textLabel}>{label.toLowerCase()}</span>
//             <span className={styles.colorLabel} style={{ backgroundColor: color }} />
//         </li>
//     ),
// );

// function ShowcaseCardTag({ tags }: { tags: TagType[] }) {
//     const tagObjects = tags.map((tag) => ({ tag, ...Tags[tag] }));

//     // Keep same order for all tags
//     const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
//         TagList.indexOf(tagObject.tag),
//     );

//     return (
//         <>
//             {tagObjectsSorted.map((tagObject, index) => {
//                 const id = `showcase_card_tag_${tagObject.tag}`;

//                 return (
//                     <Tooltip
//                         key={index}
//                         title={tagObject.description}
//                         anchorEl="#__docusaurus"
//                         id={id}
//                         color="neutral"
//                         variant="solid"
//                     >
//                         <TagComp key={index} {...tagObject} />
//                     </Tooltip>
//                 );
//             })}
//         </>
//     );
// }

function getCardImage(showcase: Showcase): string {
    return (
        showcase.preview ??
        `https://slorber-api-screenshot.netlify.app/${encodeURIComponent(
            showcase.website,
        )}/showcase`
    );
}

function ShowcaseCard({ showcase }: { showcase: Showcase }) {
    const image = getCardImage(showcase);
    return (
        <li key={showcase.title} className="card shadow--md">
            <div className={clsx('card__image', styles.showcaseCardImage)}>
                <Image img={image} alt={showcase.title} />
            </div>
            <div className="card__body">
                <div className={clsx(styles.showcaseCardHeader)}>
                    <Heading as="h4" className={styles.showcaseCardTitle}>
                        <Link href={showcase.website} className={styles.showcaseCardLink}>
                            {showcase.title}
                        </Link>
                    </Heading>
                    {/* {showcase.tags.includes('favorite') && (
                        <FavoriteIcon svgClass={styles.svgIconFavorite} size="small" />
                    )} */}
                    {showcase.source && (
                        <Link
                            href={showcase.source}
                            className={clsx(
                                'button button--secondary button--sm',
                                styles.showcaseCardSrcBtn,
                            )}>
                            <Translate id="showcase.card.sourceLink">source</Translate>
                        </Link>
                    )}
                </div>
                <p className={styles.showcaseCardBody}>{showcase.description}</p>
            </div>
            {/* <ul className={clsx('card__footer', styles.cardFooter)}>
                <ShowcaseCardTag tags={showcase.tags} />
            </ul> */}
        </li>
    );
}

export default React.memo(ShowcaseCard);