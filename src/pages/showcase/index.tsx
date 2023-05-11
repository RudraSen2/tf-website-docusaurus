import React, { useState, useMemo, useEffect } from 'react';
import clsx from 'clsx';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import Translate, { translate } from '@docusaurus/Translate';
import { useHistory, useLocation } from '@docusaurus/router';
import { usePluralForm } from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import FavoriteIcon from '@site/src/components/svgIcons/FavoriteIcon';
import {
    type Showcase,
} from '@site/src/data/showcase';
import Heading from '@theme/Heading';
import ShowcaseCard from './_components/ShowcaseCard';

import styles from './styles.module.css';

const TITLE = translate({ message: 'Showcase' });
const DESCRIPTION = translate({
    message: 'List/Showcase of the works done by Tech Fiddle.',
});
const SUBMIT_URL = 'https://github.com/facebook/docusaurus/discussions/7826';

type UserState = {
    scrollTopPosition: number;
    focusedElementId: string | undefined;
};

function restoreUserState(userState: UserState | null) {
    const { scrollTopPosition, focusedElementId } = userState ?? {
        scrollTopPosition: 0,
        focusedElementId: undefined,
    };
    // @ts-expect-error: if focusedElementId is undefined it returns null
    document.getElementById(focusedElementId)?.focus();
    window.scrollTo({ top: scrollTopPosition });
}

export function prepareUserState(): UserState | undefined {
    if (ExecutionEnvironment.canUseDOM) {
        return {
            scrollTopPosition: window.scrollY,
            focusedElementId: document.activeElement?.id,
        };
    }

    return undefined;
}

const SearchNameQueryKey = 'name';

function readSearchName(search: string) {
    return new URLSearchParams(search).get(SearchNameQueryKey);
}

function SearchBar() {
    const history = useHistory();
    const location = useLocation();
    const [value, setValue] = useState<string | null>(null);
    useEffect(() => {
        setValue(readSearchName(location.search));
    }, [location]);
    return (
        <div className={styles.searchContainer}>
            <input
                id="searchbar"
                placeholder={translate({
                    message: 'Search...',
                    id: 'showcase.searchBar.placeholder',
                })}
                value={value ?? undefined}
                onInput={(e) => {
                    setValue(e.currentTarget.value);
                    const newSearch = new URLSearchParams(location.search);
                    newSearch.delete(SearchNameQueryKey);
                    if (e.currentTarget.value) {
                        newSearch.set(SearchNameQueryKey, e.currentTarget.value);
                    }
                    history.push({
                        ...location,
                        search: newSearch.toString(),
                        state: prepareUserState(),
                    });
                    setTimeout(() => {
                        document.getElementById('searchbar')?.focus();
                    }, 0);
                }}
            />
        </div>
    );
}

function useSiteCountPlural() {
    const { selectMessage } = usePluralForm();
    return (sitesCount: number) =>
        selectMessage(
            sitesCount,
            translate(
                {
                    id: 'showcase.filters.resultCount',
                    description:
                        'Pluralized label for the number of sites found on the showcase. Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
                    message: '1 site|{sitesCount} sites',
                },
                { sitesCount },
            ),
        );
}

function ShowcaseHeader() {
    return (
        <section className="margin-top--lg margin-bottom--lg text--center">
            <Heading as="h1">{TITLE}</Heading>
            <p>{DESCRIPTION}</p>
        </section>
    );
}

function ShowcaseCards() {

    if (Showcase.length === 0) {
        return (
            <section className="margin-top--lg margin-bottom--xl">
                <div className="container padding-vert--md text--center">
                    <Heading as="h2">
                        <Translate id="showcase.usersList.noResult">No result</Translate>
                    </Heading>
                    <SearchBar />
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="margin-top--lg margin-bottom--xl">
                <div className={styles.showcaseFavorite}>
                    <div className="container">
                        <div
                            className={clsx(
                                'margin-bottom--md',
                                styles.showcaseFavoriteHeader,
                                styles.showcaseHeader,
                            )}>
                            <Heading as="h2">
                                <Translate id="showcase.worksList.title">
                                🌟 All Works
                                </Translate>
                            </Heading>
                            <FavoriteIcon svgClass={styles.svgIconFavorite} />
                            <SearchBar />
                        </div>
                        <ul
                            className={clsx(
                                'container',
                                'clean-list',
                                styles.showcaseList,
                            )}>
                            {Showcase.map((user) => (
                                <ShowcaseCard key={user.title} user={user} />
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function Showcase(): JSX.Element {
    return (
        <Layout title={TITLE} description={DESCRIPTION}>
            <main className="margin-vert--lg">
                <ShowcaseHeader />
                {/* <ShowcaseFilters /> */}
                <ShowcaseCards />
            </main>
        </Layout>
    );
}