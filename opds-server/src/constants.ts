/*
 * File: constants.ts
 * Project: VoiceAssistant
 * File Created: Monday, 4th February 2019 9:46:03 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Monday, 4th February 2019 10:09:31 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

export const DB_PROVIDER = 'DbConnectionToken';

export const DB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/webpub';

export const WEBPUB_MODEL_PROVIDER = 'WebpubModelToken';

// Server info
export const PORT_SERVER = process.env.PORT_OPDS_SERVER || 3000;
export const NAME_SERVER = process.env.NAME_OPDS_SERVER || 'OPDS2-server';
export const DOMAIN_SERVER = process.env.DOMAIN_OPDS_SERVER || 'edrlab.ml';
export const PROTOCOL_SERVER = process.env.PROTOCOL_OPDS_SERVER || 'https';
export const ROOT_SERVER = process.env.ROOT_OPDS_SERVER || 'api';

// Query available in GET
export const SEARCH_URI = 'q';
export const LANG_URI = 'language';
export const COLLECTION_URI = 'collection';
export const GENRE_URI = 'genre';
export const GROUP_URI = 'groups';
export const NUMBER_OF_ITEM_URI = 'numberofitem';
export const SORT_URI = 'sort';
export const PAGE_URI = 'page';

export const LINK_HREF = (query = '') => `${PROTOCOL_SERVER}://${DOMAIN_SERVER}/${ROOT_SERVER}${query}`;
export const LINK_TYPE = 'application/opds+json';
export const LINK_SELF_SERVER = (query = '', rel = 'self') =>
`{"rel": "${rel}", "href": "${LINK_HREF(query)}", "type": "${LINK_TYPE}"}`;

export const MORE_POPULAR_GROUP_NAME = 'les plus écoutés';
export const MORE_RECENT_GROUP_NAME = 'les plus récents';

export const ES_PROVIDER = 'ESsearchToken';
export const ES_HOST = process.env.ELASTICSEARCH_URI || 'http://localhost:9200';
export const ES_INDEX = 'book';
export const ES_TYPE = 'book';
export const ES_REF_INDEX = 'ref';
export const ES_REF_TYPE = 'ref';
export const ES_ENABLE = true;
export const ES_MIN_SCORE = 0.5;
export const ES_MEAN_SCORE = 3;
